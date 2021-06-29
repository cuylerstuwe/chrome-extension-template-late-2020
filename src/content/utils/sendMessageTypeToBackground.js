import messageTypes from "../../messageTypes";
import jsConvert from "js-convert-case";
import sendMessageToBackground from "./sendMessageToBackground";

const exportObj = Object.fromEntries(
    Object.keys(messageTypes).map(messageType => (
        [
            jsConvert.toCamelCase(messageType),
            async (messageWithoutType) => sendMessageToBackground({type: messageType, ...messageWithoutType})
        ]
    ))
);

export default exportObj;