import React from "react";
import { useNavigate } from "react-router-dom";
import { poweredByFrame } from "../../constants/images";
import { HERO_CONTENT } from "../../constants/features";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleTryForFree = () => {
    navigate('/generate');
  };

  return (
    <div className="w-full">
      <h1 className="max-w-[1000px] mx-auto text-center font-poppins font-bold leading-[1.2] tracking-normal text-[#0b0b0b] mb-4 sm:mb-6 text-[clamp(24px,5vw,48px)] px-4 sm:px-5">
        {HERO_CONTENT.headline} <span className="whitespace-nowrap">
          with <a href="#" className="text-teal no-underline font-bold" aria-label={`Learn more about ${HERO_CONTENT.brandName}`}>{HERO_CONTENT.brandName}</a> —
        </span>
        {' '}{HERO_CONTENT.subheadline}
      </h1>

      <div className="max-w-[900px] mt-4 sm:mt-6 mx-auto font-['Poppins'] font-normal text-sm sm:text-[15px] leading-[1.6] sm:leading-[1.7] text-center text-black/54 px-4 sm:px-5 mb-6 sm:mb-8">
        {HERO_CONTENT.description}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mx-auto w-full sm:w-fit px-4 sm:px-0">
        <button 
          onClick={handleTryForFree} 
          className="w-full sm:w-auto flex flex-row justify-center items-center py-3 sm:py-4 px-8 sm:px-10 bg-teal shadow-[0px_4px_20px_rgba(14,165,164,0.3)] rounded-xl border-none font-['Poppins'] font-semibold text-base sm:text-lg text-white text-center cursor-pointer transition-all hover:bg-teal-dark hover:shadow-[0px_6px_25px_rgba(14,165,164,0.4)] hover:-translate-y-0.5"
          aria-label="Try URL shortener for free"
          tabIndex={0}
        >
          {HERO_CONTENT.ctaText}
        </button>
        <div className="flex items-center gap-2">
          <img 
            src={poweredByFrame} 
            alt="BotrixAI logo" 
            className="h-7 sm:h-8 w-auto"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
