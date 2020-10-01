import config from "../config";

async function sendLoopbackMessageToContentScript(message) {
    const returnValue = await window[config.CONTENT_SCRIPT_LISTENER_LOOPBACK_NAME](message);
    return returnValue;
}

export default sendLoopbackMessageToContentScript;
