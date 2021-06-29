import "../utils/startedLog";
import globalBackgroundState from "./globalBackgroundState";
import config from "../config";
import onBackgroundReady from "./onBackgroundReady";

const _noop = async () => {};
const _switch = async (pathName, branchesObj, argsObj) => await ((branchesObj[pathName] || branchesObj.default || _noop)(argsObj));

const listenerModuleBranches = ({
    ...globalBackgroundState,
    ...({default: _noop})
});

const listener = async (request, sender, sendResponse) => {
    return await _switch(request.type, listenerModuleBranches, request);
};

window[config.GLOBAL_BACKGROUND_LISTENER_LOOPBACK_NAME] = listener;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    listener(request, sender, sendResponse).then((result) => {
        sendResponse(result);
    });
    return true;
});

console.log("Runtime environment:", { BUILD_ENV: process.env.BUILD_ENV, NODE_ENV: process.env.NODE_ENV });

onBackgroundReady();