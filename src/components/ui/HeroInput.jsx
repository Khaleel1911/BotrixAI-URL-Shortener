import React from 'react';

const HeroInput = () => {
  const handleGenerate = () => {
    console.log('Generate clicked');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mx-auto max-w-[800px] w-full px-4 sm:px-5">
      <input 
        type="text" 
        placeholder="Enter the link" 
        className="flex-1 h-14 sm:h-16 px-4 sm:px-5 border border-[#dcdcdc] rounded-sm text-base sm:text-lg outline-none bg-white text-[#111] shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_6px_12px_rgba(0,0,0,0.12)] placeholder:text-[#bfbfbf]"
        aria-label="Enter URL to shorten"
      />
      <button 
        className="h-14 sm:h-16 px-6 sm:px-8 py-3 sm:py-4 bg-teal border-none rounded-sm text-base sm:text-lg font-semibold text-white cursor-pointer transition-all hover:bg-teal-dark active:brightness-95 whitespace-nowrap"
        onClick={handleGenerate}
        aria-label="Generate short URL"
        tabIndex={0}
      >
        Generate
      </button>
    </div>
  );
};

export default HeroInput;
