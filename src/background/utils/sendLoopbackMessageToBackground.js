import config from "../../config";

async function sendLoopbackMessageToBackground(message) {
    const returnValue = await window[config.GLOBAL_BACKGROUND_LISTENER_LOOPBACK_NAME](message);
    return returnValue;
}

export default sendLoopbackMessageToBackground;