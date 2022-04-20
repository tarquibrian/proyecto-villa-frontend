import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

const iconStyle = (Icon) => <Icon />;

export const footerSocialData = [
	{
		name: 'Facebook',
		icon: iconStyle(FaFacebook),
	},
	{
		name: 'Instagram',
		icon: iconStyle(FaInstagram),
	},
	{
		name: 'YouTube',
		icon: iconStyle(FaYoutube),
	},
	{
		name: 'Twitter',
		icon: iconStyle(FaTwitter),
	},
	{
		name: 'LinkedIn',
		icon: iconStyle(FaLinkedin),
	},
];

export const footerData = [
	// {
	// 	title: 'enlace1',
	// 	links: ['enlace1', 'enlace1', 'enlace1', 'enlace1'],
	// },
	{
		title: 'Sistema',
		links: ['Login'],
	},
	// {
	// 	title: 'enlace',
	// 	links: ['enlace', 'enlace', 'enlace', 'enlace'],
	// },
];
