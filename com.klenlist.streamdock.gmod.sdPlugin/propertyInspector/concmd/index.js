/// <reference path="../utils/common.js" />
/// <reference path="../utils/action.js" />

// $local Is the localization international
// $back Is the timing of the return determined by itself
// $dom Get the document element - do not write dynamic elements here
const $local = true, $back = false, $dom = {
    main: $('.sdpi-wrapper'),
    concommand: $('#concmd-input')
};

const $propEvent = {
    didReceiveGlobalSettings({ settings }) { },
    didReceiveSettings(data) {
        if (data.settings.cmd) {
            $dom.concommand.value = data.settings.cmd;
        }
    },
    sendToPropertyInspector(data) { }
};

$dom.concommand.on('input', (e) => {
    $settings.cmd = e.target.value;
    $websocket.sendToPlugin({ 'cmd': $settings.cmd });
});