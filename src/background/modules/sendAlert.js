import messageTypes from "../../messageTypes";
const messageType = messageTypes.SEND_ALERT;

export default ({

    messageListener: ({store}) => async argsObj => {

        alert(argsObj.message);

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
