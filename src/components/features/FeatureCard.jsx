import React from 'react';

const FeatureCard = ({ title, description, isRight }) => {
  const renderIcon = () => {
    if (title === "Shortner the link") {
      return <div className="text-[72px] font-bold text-white tracking-wider">URL</div>;
    }

    if (title === "Link expiration") {
      return (
        <div className="flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#FFC107"/>
            <circle cx="50" cy="50" r="40" fill="white"/>
            <circle cx="50" cy="50" r="2" fill="#FFC107"/>
            <path d="M50 30 L50 50 L65 58" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <circle cx="50" cy="50" r="45" stroke="#FFC107" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      );
    }

    if (title === "URL HISTORY") {
      return (
        <div className="flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="35" height="35" fill="white" stroke="none"/>
            <rect x="55" y="10" width="35" height="35" fill="white" stroke="none"/>
            <rect x="10" y="55" width="35" height="35" fill="white" stroke="none"/>
            <rect x="60" y="60" width="20" height="20" fill="white"/>
            <rect x="85" y="60" width="10" height="10" fill="white"/>
            <rect x="60" y="85" width="10" height="10" fill="white"/>
            <rect x="10" y="10" width="35" height="35" fill="none" stroke="white" strokeWidth="3"/>
            <rect x="55" y="10" width="35" height="35" fill="none" stroke="white" strokeWidth="3"/>
            <rect x="10" y="55" width="35" height="35" fill="none" stroke="white" strokeWidth="3"/>
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`w-4/5 max-w-[1200px] flex items-center justify-between gap-[60px] my-10 mx-auto p-0 ${isRight ? 'flex-row-reverse' : 'flex-row'} max-md:flex-col max-md:gap-[30px]`}>
      <div className="w-[400px] h-[300px] bg-teal rounded-xl p-[30px] flex flex-col justify-between shadow-[0_4px_20px_rgba(14,165,164,0.2)] max-md:w-full max-md:max-w-[500px]">
        <h3 className="m-0 text-2xl font-bold text-white uppercase">{title}</h3>
        <div className="flex items-center justify-center flex-1">
          {renderIcon()}
        </div>
      </div>
      <div className="w-1/2 text-[15px] leading-[1.8] text-[#333] py-5 max-md:w-full">
        <p className="m-0">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

