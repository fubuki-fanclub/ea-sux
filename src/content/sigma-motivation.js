import sigma from './quotes.json'

const { quotes, authors } = sigma;
function randomEl(arr) {
    return arr[Math.floor((arr.length) * Math.random())] ?? arr[0];
}

function generateMotivationHtml(text, author) {
    return `<h2> ${text}</h2>
    <span class="motivation-author">- ${author}</span>`;
}

export function goSigma() {
    const quoteTarget = document.querySelector('.sigma .col-md-8.col-md-pull-4.header-info');

    if (quoteTarget) {
        quoteTarget.innerHTML = generateMotivationHtml(randomEl(quotes), randomEl(authors));
    }
}
