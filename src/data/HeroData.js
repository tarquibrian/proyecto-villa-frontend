import ImageEventos from '../images/turismo.jpg'
import ImageHistorias from '../images/turismo3.jpg'

export const heroOne = {
	reverse: true,
	inverse: true,
	topLine: {
		text: 'EVENTOS TRADICIONALES',
	},
	headline: "Villa Rivero Cuenta Con Más de 10 Ferias Por Temporada",
	description: 'Villa Rivero es una localidad y municipio de Bolivia, ubicado en la provincia de Punata del departamento de Cochabamba.',
	buttonLabel: 'Saber Más',
	linkTo: '/eventos',
	imgStart: 'start',
	img: ImageEventos,
	start: 'true',
};

export const heroTwo = {
	reverse: false,
	inverse: false,
	topLine: {
		text: 'BIOGRAFÍAS, CUENTOS E HITORIAS',
	},
	headline: 'Biografías de Personajes Históricos y Tradiciones Costumbristas',
	description: 'La parroquia San Isidro, el centro de residentes y  la Alcaldía de Villa Rivero veneran en julio a la milagrosa Virgen María del Carmen.',
	buttonLabel: 'Ver Eventos',
	linkTo: '/historias',
	imgStart: 'start',
	img: ImageHistorias,
	start: 'true',
};

export const heroThree = {
	reverse: true,
	inverse: true,
	topLine: {
		text: 'LUGARES TUÍSTICOS',
	},
	headline: 'Casa Natal del Expresidente Gualberto Villarroel',
	description:
		'La histórica casa del notable militar, político y presidente de Bolivia, Gualberto Villarroel López (1908-1946)',
	buttonLabel: 'Ver Sitios',

	linkTo: '/sitios',
	imgStart: '',
	img: './assets/casa-gualberto-villarroel.jpg',
	start: 'true',
};
