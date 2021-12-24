function initSwitch(id) {
    chrome.storage.sync.get([id], v => {
        if (typeof(v[id]) != 'boolean') {
            let a = {}
            a[id] = false;
            chrome.storage.sync.set(a);
            v[id] = false;
        }
        if (v[id])
            document.getElementById(id).classList.add('a');
    });
}

/**
 * @param {MouseEvent} e 
 */
function toggle(e) {
    let a = {};
    const val = !e.target.classList.contains('a')

    a[e.target.id] = val;
    chrome.storage.sync.set(a, () => {
        if (val) {
            e.target.classList.add('a');
        } else {
            e.target.classList.remove('a');
        }
    });

}

document.querySelector('a[href="#g"]').addEventListener('click', _ => {
    chrome.tabs.create({ url: "https://github.com/fubuki-fanclub/ea-sux" })
});
document.querySelector('a[href="#b"]').addEventListener('click', _ => {
    chrome.tabs.create({ url: "https://github.com/fubuki-fanclub/ea-sux/issues" })
});

Array.from(document.querySelectorAll('.slide')).
forEach(x => x.addEventListener('click', toggle))

initSwitch('plus');
initSwitch('extend');
initSwitch('flop');
initSwitch('dark');
initSwitch('lsd');