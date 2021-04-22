let overridePlus = false;

function settingsChanged() {
    chrome.storage.sync.get(['plus'], (a) => {
        overridePlus = Boolean(a['plus']);
    })
}
chrome.storage.onChanged.addListener(settingsChanged)


chrome.webRequest.onHeadersReceived.addListener(info => {
    return overridePlus ? {
        redirectUrl: "https://raw.githubusercontent.com/fubuki-fanclub/ea-sux/master/student_app.js"
    } : {};
}, {
    urls: [
        "*://www.easistent.com/js/build/student_app.*.js"
    ]
}, ["blocking", "responseHeaders"])