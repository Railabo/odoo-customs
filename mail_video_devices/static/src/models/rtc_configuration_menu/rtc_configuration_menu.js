/** @odoo-module **/
import {registerInstancePatchModel} from '@mail/model/model_core';

registerInstancePatchModel('mail.rtc_configuration_menu', 'mail_video_devices/static/src/models/rtc_configuration_menu/rtc_configuration_menu.js', {
        /**
         * @param {String} value
         */
        onChangeSelectVideoInput(value) {
            this.userSetting.setVideoInputDevice(value);
        }
});