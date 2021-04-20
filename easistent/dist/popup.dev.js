"use strict";

Array.from(document.querySelectorAll('.slide')).forEach(function (x) {
  return x.addEventListener('click', toggle);
});
initSwitch('flop');
initSwitch('dark');
initSwitch('lsd');

function initSwitch(id) {
  chrome.storage.sync.get([id], function (v) {
    if (typeof v[id] != 'boolean') {
      var a = {};
      a[id] = false;
      chrome.storage.sync.set(a);
      v[id] = false;
    }

    if (v[id]) document.getElementById(id).classList.add('a');
  });
}
/**
 * @param {MouseEvent} e 
 */


function toggle(e) {
  var a = {};
  var val = !e.target.classList.contains('a');
  a[e.target.id] = val;
  chrome.storage.sync.set(a, function () {
    console.log("set ".concat(e.target.id, " to ").concat(val));

    if (val) {
      e.target.classList.add('a');
    } else {
      e.target.classList.remove('a');
    }
  });
} //! THIS CODE IS KINDA CRAP
//! REWRITE TIME?