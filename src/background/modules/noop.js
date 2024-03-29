import messageTypes from "../../messageTypes";
const messageType = messageTypes.NOOP;

export default ({

    messageListener: ({store}) => async argsObj => {

        store.dispatch({
            type: messageType,
        });

        return store.getState();

    },

    reducer: ({state, action}) => ({
        ...state
    }),

    messageType

});
