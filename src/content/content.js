import "../utils/startedLog";
import commonModules from "./modules/common/commonModules";
import generateStateAndMessagePumpFrom from "../utils/generateStateAndMessagePumpFrom";
import commonInitialState from "./modules/common/commonInitialState";
import config from "../config";
import urlMatchingPageConfigurations from "./urlMatchingPageConfigurations";

const urlMatchedPageConfiguration = urlMatchingPageConfigurations.find(urlMatchingPageConfiguration => {
    const { urlMatcher } = urlMatchingPageConfiguration;
    return !!(window.location.href.match(urlMatcher));
}) || null;

const hasUrlMatchedPageConfiguration = !!(urlMatchedPageConfiguration);

const _noop = async () => {};
const _switch = async (pathName, branchesObj, argsObj) => await ((branchesObj[pathName] || branchesObj.default || _noop)(argsObj));

async function main() {

    const modules = [
        ...(commonModules || []),
        ...(
            hasUrlMatchedPageConfiguration
                ? urlMatchedPageConfiguration.modules
                : []
        )
    ];

    const initialState = ({
        ...(commonInitialState || ({})),
        ...(
            hasUrlMatchedPageConfiguration
                ? urlMatchedPageConfiguration.initialState
                : ({})
        )
    });

    const pageStateAndMessagePump = generateStateAndMessagePumpFrom({modulesArray: modules, initialState});

    const messageTypesWatched = modules?.map(module => module.messageType) || [];

    const listenerModuleBranches = ({
        ...pageStateAndMessagePump,
        ...({default: _noop})
    });

    const listener = async (request, sender, sendResponse) => {
        return await _switch(request.type, listenerModuleBranches, request);
    };

    window[config.CONTENT_SCRIPT_LISTENER_LOOPBACK_NAME] = listener;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

        const requestType = request?.type;

        if(messageTypesWatched.includes(requestType)) {

            listener(request, sender, sendResponse).then((result) => {
                sendResponse(result);
            });

            return true;

        }

    });

    if(hasUrlMatchedPageConfiguration) {
        const pageSpecificMain = urlMatchedPageConfiguration.main;
        await pageSpecificMain();
    }
}

main().then(() => {
    console.log("Main content script function run to completion.")
});