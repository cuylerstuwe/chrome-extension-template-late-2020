/**
 * After being defined in ../background/modules/*.js, each background module must be imported here to be used by the system.
 */

import noop from "./modules/noop";
import sendMessageToTab from "./modules/sendMessageToTab";

export default [
    noop,
    sendMessageToTab
];