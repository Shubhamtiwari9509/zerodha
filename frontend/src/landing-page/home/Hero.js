import React from 'react';
function Hero() {
    return (
        <div className="container p-5">
            <div className="row text-center">
               <img src="media/images/homeHero.png"  alt="Hero Image" className="mb-5" ></img>
               <h1 className="mt-5">Invest in everything</h1>
                <p>Online plateform to invest in stocks , derivatievs mutual funda , and more</p>
                <button className="btn btn-primary" style={{width:"15%", margin:"0% auto" }}>Singup Now</button>
            </div>
        </div>
      );
}

export default Hero;