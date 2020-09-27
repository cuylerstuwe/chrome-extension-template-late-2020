const fs = require("fs");

const packageJsonText = fs.readFileSync("../package.json");
const packageJson = JSON.parse(packageJsonText);

const manifest = {

    manifest_version: 2,
    name: packageJson.longName || "package.json is missing a name",
    description: packageJson.description || "package.json is missing a description",
    version: packageJson.version,

    icons: {
        "16": "icons/icon16.png",
        "32": "icons/icon32.png",
        "48": "icons/icon48.png",
        "64": "icons/icon64.png"
    },

    browser_action: {
        default_icon: {
            "16": "icons/icon16.png",
            "32": "icons/icon32.png",
            "48": "icons/icon48.png",
            "64": "icons/icon64.png"
        },
        default_title: packageJson.longName,
        default_popup: "popup.html"
    },

    background: {
        page: "background.html"
    },

    content_scripts: [
        {
            matches: ["<all_urls>"], // TODO: Make this more specific, rather than the template default of matching everything.
            js: ["content.js"]
        }
    ],

    permissions: [
        // "activeTab",
        // "alarms",
        // "background",
        // "bookmarks",
        // "browsingData",
        // "certificateProvider",
        // "clipboardRead",
        // "clipboardWrite",
        // "contentSettings",
        // "contextMenus",
        // "cookies",
        // "debugger",
        // "declarativeContent",
        // "declarativeNetRequest",
        // "declarativeNetRequestFeedback",
        // "declarativeWebRequest",
        // "desktopCapture",
        // "displaySource",
        // "dns",
        // "documentScan",
        // "downloads",
        // "enterprise.deviceAttributes",
        // "enterprise.hardwarePlatform",
        // "enterprise.networkingAttributes",
        // "enterprise.platformKeys",
        // "experimental",
        // "fileBrowserHandler",
        // "fileSystemProvider",
        // "fontSettings",
        // "gcm",
        // "geolocation",
        // "history",
        // "identity",
        // "idle",
        // "idltest",
        // "login",
        // "loginScreenStorage",
        // "loginState",
        // "management",
        // "nativeMessaging",
        // "networking.config",
        // "notifications",
        // "pageCapture",
        // "platformKeys",
        // "power",
        // "printerProvider",
        // "printing",
        // "printingMetrics",
        // "privacy",
        // "processes",
        // "proxy",
        // "sessions",
        // "signedInDevices",
        // "storage",
        // "system.cpu",
        // "system.display",
        // "system.memory",
        // "system.storage",
        // "tabCapture",
        // "tabs",
        // "topSites",
        // "tts",
        // "ttsEngine",
        // "unlimitedStorage",
        // "vpnProvider",
        // "wallpaper",
        // "webNavigation",
        // "webRequest",
        // "webRequestBlocking"
    ]

};

fs.writeFileSync("../dist/manifest.json", JSON.stringify(manifest));