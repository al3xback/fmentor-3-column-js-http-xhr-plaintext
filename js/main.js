import { sendHttpRequest } from './util.js';

const cardsEl = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');

const URL =
	'https://gist.githubusercontent.com/al3xback/c9f5e86a2664af7f17a38792e5e5672e/raw/5fbd1d23464766fa061c8a0fc8c76c758f9e2427/3-column-data.txt';

const renderCardContent = (data) => {
	const resData = data.split('\n');
	const size = resData.indexOf('');
	const filteredData = resData.filter((item) => Boolean(item));

	const cardData = [];
	for (let i = 0; i < filteredData.length; i += size) {
		cardData.push(filteredData.slice(i, i + size));
	}

	for (const card of cardData) {
		const [title, desc] = card;
		const clone = document.importNode(cardTemplate.content, true);

		const cardEl = clone.querySelector('.card');
		cardEl.classList.add('card--' + title.toLowerCase());

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + title.toLowerCase() + '.svg';

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = title;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = desc;

		cardsEl.appendChild(cardEl);
	}
};

sendHttpRequest('GET', URL, renderCardContent);
