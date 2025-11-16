import React from "react";
import HeroPrice from "./HeroPrice";
import Brokerage from "./BroKerage";   
import OpenAccount from '../../OpenAccount';


function PricingPage() {
  return (
    <>
      <HeroPrice/>
      <OpenAccount/>
      <Brokerage/>
    </>
  );
}

export default PricingPage;
