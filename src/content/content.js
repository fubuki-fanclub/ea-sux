/*
! BIG P100 INJECT SCRIPT
*/
import { goSigma } from "./sigma-motivation"

console.log('%ceAsistent+ loaded', 'color: #0077d8;font-size:32px;')


/**
 * sets classes on the root element
 * @param {object} data map of classes to apply
 */
function updateRoot(data) {
    document.querySelector('html').className = Object.keys(data).filter(x => data[x]).join(' ');
}

/**
 * gets called every time the settings are updated
 */
function settingsChanged(changes, area) {
    chrome.storage.sync.get(['flop', 'lsd', 'dark', 'plus', 'extend'], (data) => {
        updateRoot(data);
    })
}

chrome.storage.onChanged.addListener(settingsChanged)
settingsChanged();

(() => {
    const currentLocation = new URL(document.location.href)
    if (currentLocation.pathname === '/')
        goSigma();
})()
