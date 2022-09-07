let overridePlus = false;

chrome.storage.sync.get(['plus'], a => {
    overridePlus = a.plus;
    console.log({ a });
})

function settingsChanged() {
    chrome.storage.sync.get(['plus'], (a) => {
        overridePlus = Boolean(a['plus']);
    })
}


chrome.webRequest.onHeadersReceived.addListener(info => {
    console.log({ url: chrome.runtime.getURL("student_app.js") });
    return overridePlus ? {
        redirectUrl: chrome.runtime.getURL("student_app.js")
    } : {};
}, {
    urls: [
        "*://www.easistent.com/js/build/student_app.*.js"
    ]
}, ["blocking", "responseHeaders"]);

chrome.extension.onMessage.addListener((request, sender) => {
    request.message === "activate_icon" && chrome.pageAction.show(sender.tab.id);
});

console.log({ url: chrome.runtime.getURL("student_app.js") });
chrome.storage.onChanged.addListener(settingsChanged)