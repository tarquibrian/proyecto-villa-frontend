import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';

const Hero = () => {
	return (
		<HeroSection>
			<HeroVideo src="./assets/cbba_1.mp4" autoPlay muted />
			<Container>
				<MainHeading>Villa Rivero Turismo e Historia</MainHeading>
				<HeroText>
				"Cuna de Hombres Célebres y Pueblo de Grandes Tradiciones".
				</HeroText>
				<ButtonWrapper>
					<Link to="signup">
						<Button>Iniciar Sesión</Button>
					</Link>
					<HeroButton>Ver historias</HeroButton>
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
};

export default Hero;
