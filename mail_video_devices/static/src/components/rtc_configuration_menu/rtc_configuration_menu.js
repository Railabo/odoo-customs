/** @odoo-module **/
import { browser } from "@web/core/browser/browser";
import {RtcConfigurationMenu} from '@mail/components/rtc_configuration_menu/rtc_configuration_menu';
import {patch} from 'web.utils';

const component = {RtcConfigurationMenu};

patch(component.RtcConfigurationMenu.prototype, 'mail_video_devices/static/src/components/rtc_configuration_menu/rtc_configuration_menu.js', {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------
     /**
     * @override
     */
    async willStart() {
        this.state.userDevices = await browser.navigator.mediaDevices.enumerateDevices();
        // console.log("This is test for loading willStart: " + this.state.userDevices);
        // navigator.mediaDevices.enumerateDevices()
        //     .then(function (devices) {
        //         devices.forEach(function (device) {
        //             console.log(device.kind + ": " + device.label +
        //                 " id = " + device.deviceId);
        //         });
        //     })

    },
    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    /**
     * @private
     * @param {Event} ev
     */
    _onChangeSelectVideoInput(ev) {
        this.messaging.userSetting.rtcConfigurationMenu.onChangeSelectVideoInput(ev.target.value);
    }

});

Object.assign(RtcConfigurationMenu, {
    template: 'mail_video_devices.RtcConfigurationMenu',
});