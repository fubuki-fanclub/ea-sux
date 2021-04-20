Array.from(document.querySelectorAll('.slide')).
    forEach(x => x.addEventListener('click', toggle))

initSwitch('flop');
initSwitch('dark');
initSwitch('lsd');

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
        console.log(`set ${e.target.id} to ${val}`)
        if (val) {
            e.target.classList.add('a');
        } else {
            e.target.classList.remove('a');
        }
    });

}


//! THIS CODE IS KINDA CRAP
//! REWRITE TIME?