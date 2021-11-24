/** @odoo-module **/
import {registerInstancePatchModel, registerFieldPatchModel} from '@mail/model/model_core';
import { attr } from '@mail/model/model_field';


registerInstancePatchModel('mail.user_setting', 'mail_video_devices/static/src/models/user_setting/user_setting_video.js', {

    /**
     * @returns {Object} MediaTrackConstraints
     */
    getVideoConstraints() {
        const constraints = {
            aspectRatio: 16 / 9,
            frameRate: {max: 30,},
        };
        if (this.videoInputDeviceId) {
            constraints.deviceId = this.videoInputDeviceId;
        }
        return constraints;
    },

    /**
     * @param {String} videoInputDeviceId
     */
    async setVideoInputDevice(videoInputDeviceId) {
        // console.log('videoInputDeviceId inside user_settings.js: ' + this.env.services.local_storage.getItem('mail_user_setting_video_input_device_id'));
        this.update({
            videoInputDeviceId,
        });
        // console.log("Device ID:  --- > " + videoInputDeviceId);
        const constr = {video: {deviceId: videoInputDeviceId}}
        this.env.services.local_storage.setItem('mail_user_setting_video_input_device_id', videoInputDeviceId);
        await this.messaging.rtc.toggleUserVideo();
        await this.messaging.rtc.toggleUserVideo();
    },

    /**
     * @override
     * @private
     */
    _loadLocalSettings() {
        const voiceActivationThresholdString = this.env.services.local_storage.getItem(
            "mail_user_setting_voice_threshold"
        );
        const audioInputDeviceId = this.env.services.local_storage.getItem(
            "mail_user_setting_audio_input_device_id"
        );
        const videoInputDeviceId = this.env.services.local_storage.getItem(
            "mail_user_setting_video_input_device_id"
        );
        const voiceActivationThreshold = parseFloat(voiceActivationThresholdString);
        if (voiceActivationThreshold > 0) {
            this.update({
                voiceActivationThreshold,
                audioInputDeviceId,
                videoInputDeviceId,
            });
        }
    }

});
registerFieldPatchModel('mail.user_setting', 'mail_video_devices/static/src/models/user_setting/user_setting_video.js', {
    videoInputDeviceId: attr({ default: '' }),
});
