import sendMessageToBackground from "./sendMessageToBackground";
import messageTypes from "../../messageTypes";

export default async function sendMessageToTab(...args) {

    let tabId, message;

    if(process.env.NODE_ENV === "production") {
        message = args[1] || args[0]?.message;
        tabId = args[0]?.tabId || args[0];
    }
    else if(process.env.NODE_ENV === "debug") {

        const areArgsProvidedAsOneObject = (
            args.length === 1
            && typeof args[0] === "object"
            && typeof args[0].tabId === "number"
            && typeof args[0].message !== "undefined"
        );

        const areArgsProvidedAsTwoDistinctValues = (
            args.length === 2
            && typeof args[0] === "number"
            && typeof args[1] !== "undefined"
        );

        const areArgsProvidedProperly = (areArgsProvidedAsOneObject || areArgsProvidedAsTwoDistinctValues);

        if(!areArgsProvidedProperly) {
            throw new Error(`Invalid arguments passed to sendMessageToTab: ${args}`);
        }

        if(areArgsProvidedAsOneObject) {
            tabId = args[0].tabId;
            message = args[0].message;
        }
        else if(areArgsProvidedAsTwoDistinctValues) {
            tabId = args[0];
            message = args[1];
        }

    }

    return sendMessageToBackground({
        type: messageTypes.SEND_MESSAGE_TO_TAB,
        tabId,
        message
    });

}