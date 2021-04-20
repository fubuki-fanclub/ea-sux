"use strict";

chrome.webRequest.onHeadersReceived.addListener(function (info) {
  return {
    redirectUrl: "https://waifu-storage.s3.eu-central-1.amazonaws.com/student_app.js"
  };
}, {
  urls: ["*://www.easistent.com/js/build/student_app.*.js"]
}, ["blocking", "responseHeaders"]);