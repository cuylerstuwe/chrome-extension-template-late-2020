import messageTypes from "../../messageTypes";
const messageType = messageTypes.SEND_MESSAGE_TO_TAB;

export default ({

    messageListener: ({store}) => async argsObj => {

        const { tabId, message } = argsObj;

        store.dispatch({
            type: messageType,
        });

        return new Promise(resolve => {
            chrome.tabs.sendMessage(tabId, message, resolve);
        });

    },

    reducer: ({state, action}) => ({
        ...state
    }),

    messageType

});
