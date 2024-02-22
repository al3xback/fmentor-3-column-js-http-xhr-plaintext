import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/c9f5e86a2664af7f17a38792e5e5672e/raw/c5a7c9e58204b39e098448d0fea07fe7b0c903d8/3-column-data.txt';

const cardsWrapperEl = document.querySelector('.cards-wrapper');
const cardsTemplate = document.getElementById('cards-template');
const cardTemplate = document.getElementById('card-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardsWrapperEl.prepend(errorEl);
};

const renderCardsContent = (data) => {
	const resData = data.split('\n');
	const size = resData.indexOf('');
	const filteredData = resData.filter((item) => Boolean(item));

	const carsData = [];
	for (let i = 0; i < filteredData.length; i += size) {
		carsData.push(filteredData.slice(i, i + size));
	}

	const cardsTemplateNode = document.importNode(cardsTemplate.content, true);
	const cardsEl = cardsTemplateNode.querySelector('.cards');

	for (const car of carsData) {
		const [name, description] = car;

		const cardTemplateNode = document.importNode(
			cardTemplate.content,
			true
		);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + name.toLowerCase());

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = description;

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + name.toLowerCase() + '.svg';

		cardsEl.appendChild(cardTemplateNode);
	}

	/* [init] */
	removeLoading();
	cardsWrapperEl.appendChild(cardsTemplateNode);
};

sendHttpRequest('GET', URL, renderCardsContent, handleError);
