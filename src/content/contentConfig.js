import noop from "./modules/common/noop";
import sendMessageTypeToBackground from "./utils/sendMessageTypeToBackground";

const commonModules = [
    noop
];

const commonInitialState = ({
    NODE_ENV: process.env.NODE_ENV
});

const urlMatchedPageConfigs = ([
    {
        urlMatcher: /.*/,
        modules: [

        ],
        initialState: ({

        }),
        main: async () => {
            await sendMessageTypeToBackground.sendAlert({message: "hello"});
        }
    }
]);

export { commonModules, commonInitialState, urlMatchedPageConfigs };