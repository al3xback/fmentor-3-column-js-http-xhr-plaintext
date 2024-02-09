import { sendHttpRequest } from './util.js';

const cardsEl = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');
const loadingEl = document.querySelector('.loading');

const URL =
	'https://gist.githubusercontent.com/al3xback/c9f5e86a2664af7f17a38792e5e5672e/raw/5fbd1d23464766fa061c8a0fc8c76c758f9e2427/3-column-data.txt';

const renderCardsContent = (data) => {
	const resData = data.split('\n');
	const size = resData.indexOf('');
	const filteredData = resData.filter((item) => Boolean(item));

	const carsData = [];
	for (let i = 0; i < filteredData.length; i += size) {
		carsData.push(filteredData.slice(i, i + size));
	}

	loadingEl.parentElement.removeChild(loadingEl);

	for (const car of carsData) {
		const [name, description] = car;

		const cardTemplateNode = document.importNode(
			cardTemplate.content,
			true
		);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + name.toLowerCase());

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + name.toLowerCase() + '.svg';

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = description;

		cardsEl.appendChild(cardTemplateNode);
	}
};

sendHttpRequest('GET', URL, renderCardsContent);
