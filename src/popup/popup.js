function initalizeSwitches(propNames) {
    chrome.storage.sync.get(null, props => {
        propNames.forEach(name => {
            if (typeof props[name] !== "boolean")
                chrome.storage.sync.set({ [name]: false });
            else if (props[name])
                document.getElementById(name).classList.add('active');
        })

    });
}

/**
 * @param {MouseEvent} e 
 */
function toggle(e) {
    const newState = !e.target.classList.contains('active')

    chrome.storage.sync.set({ [e.target.id]: newState }, () => {
        if (newState) {
            e.target.classList.add('active');
        } else {
            e.target.classList.remove('active');
        }
    });

}

window.onload = () => {
    // link handlers
    document.querySelector('a[href="#g"]').addEventListener('click', _ => {
        chrome.tabs.create({ url: "https://github.com/fubuki-fanclub/ea-sux" })
    });
    document.querySelector('a[href="#b"]').addEventListener('click', _ => {
        chrome.tabs.create({ url: "https://github.com/fubuki-fanclub/ea-sux/issues" })
    });
    // show the version 
    document.querySelector('#ver').innerHTML = __PLUGIN_VERSION__;

    // init the switches
    [...document.querySelectorAll('.slide')].forEach(x => x.addEventListener('click', toggle))
    initalizeSwitches(['plus', 'extend', 'flop', 'dark', 'lsd', 'simplehome', 'sigma']);
};