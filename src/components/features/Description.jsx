import React from "react";

const Description = ({ title, description }) => {
  const titleText = title || "How URL Implement";
  const parts = titleText.split("URL");

  return (
    <div className="w-full bg-gray-50 py-16 px-5 my-16">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[32px] font-bold text-black m-0 mb-4">
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <span className="text-teal">URL</span>
              {parts[1]}
            </>
          ) : (
            titleText
          )}
        </h2>

        <p className="mx-auto m-0 text-base text-[#555] max-w-[800px] leading-normal">
          {description || "Brotix lets you shorten, customize, track, and control your links — all in one smart platform."}
        </p>
      </div>
    </div>
  );
};

export default Description;
