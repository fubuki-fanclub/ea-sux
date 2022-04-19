import { quotes, authors } from './quotes.json'

function randomEl(arr) {
    return arr[Math.floor((arr.length) * Math.random())] ?? arr[0];
}

function generateMotivationHtml(text, author) {
    return `
    ${text}
    <span class="motivation-author">${author}</span>`;
}

export function goSigma() {
    const quote = document.querySelector('div.header-info > p.pocetna-header-text');
    quote.innerHTML = generateMotivationHtml(randomEl(quotes), randomEl(authors));
}
