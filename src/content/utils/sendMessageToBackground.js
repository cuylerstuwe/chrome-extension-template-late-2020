export default async function sendMessageToBackground(message) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(message, resolve);
    });
}
