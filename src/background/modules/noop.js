import messageTypes from "../messageTypes";

export default ({

    messageType: messageTypes.NOOP,

    messageListener: ({store}) => argsObj => {
        store.dispatch({
            type: messageTypes.NOOP,
        });
        return store.getState();
    },

    reducer: ({state, action}) => ({
        ...state
    })

});