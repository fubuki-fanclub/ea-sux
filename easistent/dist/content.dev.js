"use strict";

/*
! BIG P100 INJECT SCRIPT
*/

/**
 * sets classes on the root element
 * @param {object} data map of classes to apply
 */
function updateRoot(data) {
  document.querySelector('html').className = Object.keys(data).filter(function (x) {
    return data[x];
  }).join(' ');
}
/**
 * gets called every time the settings are updated
 */


function settingsChanged(changes, area) {
  chrome.storage.sync.get(['flop', 'lsd', 'dark'], function (data) {
    updateRoot(data);
  });
}

chrome.storage.onChanged.addListener(settingsChanged);
settingsChanged();