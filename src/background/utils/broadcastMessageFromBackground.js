export default async function broadcastMessageFromBackground(message) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(message, resolve);
    });
}
