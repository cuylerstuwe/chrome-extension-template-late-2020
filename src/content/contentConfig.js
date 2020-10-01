import noop from "./modules/common/noop";

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

        }
    }
]);

export { commonModules, commonInitialState, urlMatchedPageConfigs };