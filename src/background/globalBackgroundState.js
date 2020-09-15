/**
 * Config import.
 */
import config from "../config";

/**
 * Redux core/debugger imports.
 */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import devToolsEnhancer from "remote-redux-devtools";
import initialState from "./initialState";

/**
 * Module imports.
 */
import noop from "./modules/noop";

const modules = [
    noop
];

const reducerBranches = (
    modules.reduce((acc, val) => ({
        ...acc,
        ...({
            [val.messageType]: val.reducer
        })
    }), ({}))
);

const fallbackReducerFn = ({ state }) => ({...state});

const reducer = (state = initialState, action) => {
    const fn = reducerBranches[action.type] || fallbackReducerFn;
    return fn({action, state});
};

const store = createStore(
    reducer,
    ...(config.SHOULD_PRINT_DEBUG_LOGS
            ? [
                config.WHICH_REDUX_DEBUGGER_TO_USE === config.REDUX_DEBUGGER_OPTIONS.REDUX_REMOTE_DEVTOOLS
                    ? devToolsEnhancer(
                    config.SHOULD_REDUX_REMOTE_DEVTOOLS_USE_LOCALHOST
                        ? {realtime: true, port: config.LOCALHOST_REMOTE_REDUX_DEVTOOLS_PORT}
                        : undefined
                    )
                    : applyMiddleware(logger)
            ]
            : []
    )
);

const messageListenerModuleExport = (
    modules.reduce((acc, val) => ({
        ...acc,
        ...({
            [val.messageType]: val.messageListener({store})
        })
    }), ({}))
);

export default messageListenerModuleExport;
