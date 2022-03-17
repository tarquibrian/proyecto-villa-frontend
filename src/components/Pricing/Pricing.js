import React from "react";
import { Button, Heading, TextWrapper } from "../../globalStyles";
import { IconContext } from "react-icons/lib";
import {
  PricingSection,
  PricingWrapper,
  PricingContainer,
  PricingCardInfo,
  PricingCardPlan,
  PricingCardCost,
  PricingCardFeatures,
  PricingCardText,
  PricingCardFeature,
  PricingCard,
} from "./PricingStyles";
import { pricingData } from "../../data/PricingData";
import { Historia } from "../../components/Historia/Historia";
import { FeatureTitle } from "../Features/FeaturesStyles";
import { HistoriaHome } from "../Historia/HistoriaHome";

function Pricing() {
  return (
    <>
      <HistoriaHome />
    </>
    // <IconContext.Provider value={{ color: "#a9b3c1", size: "1rem" }}>
    //   <PricingSection id="pricing">
    //     <PricingCardPlan>
    //       <FeatureTitle>
    //         "Cuna de Hombres Célebres y Pueblo de Grandes Tradiciones".
    //       </FeatureTitle>

    //       <TextWrapper
    //         mb="1.5rem"
    //         mt="1rem"
    //         weight="600"
    //         size="1.1rem"
    //         color="black"
    //         align="center"
    //       >
    //         Conoce Al Municipio y Sus Grandes Personajes
    //       </TextWrapper>

    //       <HistoriaHome />

    //       {/* <PricingContainer>
    // 				{pricingData.map((card, index) => (
    // 					<PricingCard key={index}>
    // 						<PricingCardInfo>
    // 							<PricingCardPlan>{card.title}</PricingCardPlan>
    // 							<PricingCardCost>{card.price}</PricingCardCost>
    // 							<PricingCardText>{card.description}</PricingCardText>
    // 							<PricingCardFeatures>
    // 								{card.features.map((feature, index) => (
    // 									<PricingCardFeature key={index}>
    // 										{feature}
    // 									</PricingCardFeature>
    // 								))}
    // 							</PricingCardFeatures>
    // 							<Button>CONOCER MÁS</Button>
    // 						</PricingCardInfo>
    // 					</PricingCard>
    // 				))}
    // 			</PricingContainer> */}
    //     </PricingCardPlan>
    //   </PricingSection>
    // </IconContext.Provider>
  );
}
export default Pricing;
