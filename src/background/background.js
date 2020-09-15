import "../utils/startedLog";
import globalBackgroundState from "./globalBackgroundState";
import messageTypes from "./messageTypes";

const _noop = async () => {};
const _switch = async (pathName, branchesObj, argsObj) => await ((branchesObj[pathName] || branchesObj.default || _noop)(argsObj));

const listenerModuleBranches = ({
    ...globalBackgroundState,
    ...({default: _noop})
});

const listener = async (request, sender, sendResponse) => {
    return await _switch(request.type, listenerModuleBranches, request);
};

window.globalListener = listener;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    listener(request, sender, sendResponse).then((result) => {
        sendResponse(result);
    });
    return true;
});

listener({
    type: messageTypes.NOOP
});