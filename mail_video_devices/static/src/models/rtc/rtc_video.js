/** @odoo-module **/
import {browser} from "@web/core/browser/browser";

import {clear} from '@mail/model/model_field_command';
import {registerInstancePatchModel} from '@mail/model/model_core';

registerInstancePatchModel('mail.rtc', 'mail_video_devices/static/src/models/rtc/rtc_video.js', {

    /**
     * @override
     * @private
     * @param {String} type 'user-video' or 'display'
     * @param {boolean} activateVideo true if we want to activate the video
     */
    async _updateLocalVideoTrack(type, activateVideo) {
        if (this.videoTrack) {
            this.videoTrack.stop();
        }
        this.update({
            sendDisplay: false,
            sendUserVideo: false,
            videoTrack: clear(),
        });
        let videoStream;
        if (!activateVideo) {
            if (type === 'display') {
                this.messaging.soundEffects.screenSharing.play();
            }
            return;
        }
        try {
            if (type === 'user-video') {
                videoStream = await browser.navigator.mediaDevices.getUserMedia({video: this.messaging.userSetting.getVideoConstraints()});
                // console.log("This _updateLocalVideoTrack has been fired!")
            }
            if (type === 'display') {
                videoStream = await browser.navigator.mediaDevices.getDisplayMedia({video: this.videoConfig});
                this.messaging.soundEffects.screenSharing.play();
            }
        } catch (e) {
            this.env.services.notification.notify({
                message: _.str.sprintf(
                    this.env._t(`"%s" requires "%s" access`),
                    window.location.host,
                    type === 'user-video' ? 'camera' : 'display',
                ),
                type: 'warning',
            });
            return;
        }
        const videoTrack = videoStream ? videoStream.getVideoTracks()[0] : undefined;
        if (videoTrack) {
            videoTrack.addEventListener('ended', async () => {
                await this.async(() =>
                    this._toggleVideoBroadcast({force: false, type})
                );
            });
        }
        this.update({
            videoTrack,
            sendUserVideo: type === 'user-video' && !!videoTrack,
            sendDisplay: type === 'display' && !!videoTrack,
        });
    }
});