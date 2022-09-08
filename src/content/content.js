/*
! BIG P100 INJECT SCRIPT
*/
const WEBAPP_ONLY_FEATURES = ['plus', 'extend']

import { goSigma } from "./sigma-motivation"

chrome.runtime.sendMessage({ "message": "activate_icon" });
console.log('%ceAsistent+ loaded', 'color: #0077d8;font-size:32px;')

/**
 * sets classes on the root element
 * @param {object} data map of classes to apply
 */
function updateRoot(data) {
    const isWebapp = document.location.pathname.startsWith("/webapp");
    document.querySelector('html').className = Object.keys(data)
        .filter(x => isWebapp || (!WEBAPP_ONLY_FEATURES.includes(x))) // don't enable webapp features when not in webapp
        .filter(x => data[x])
        .join(' ');
}

/**
 * gets called every time the settings are updated
 */
function settingsChanged(changes, area) {
    chrome.storage.sync.get(null, (data) => {
        updateRoot(data);
    })
}

chrome.storage.onChanged.addListener(settingsChanged)
settingsChanged();

window.addEventListener('load', () => {
    const currentLocation = new URL(document.location.href)
    window.sigma = goSigma;
    if (currentLocation.pathname == '/') {
        setTimeout(() => {
            goSigma();
        }, 10);
    }
})