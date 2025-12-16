import React from 'react';
import { Header, Footer } from '../components/layout';
import { HeroInput, HeroSection } from '../components/ui';
import { FeatureCard, UrlGenerator, Description } from '../components/features';
import { FEATURES, FEATURES_SECTION, IMPLEMENTATION_SECTION } from '../constants/features';

const HomePage = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="max-w-[1200px] my-12 mx-auto px-5 flex flex-col items-center gap-8" aria-label="Hero section">
        <HeroInput />
        <HeroSection />
      </section>

      {/* Features In URL Section */}
      <section id="features" className='max-w-[1200px] my-20 mx-auto px-5' aria-label="Features section">
        <div className="text-center mb-[60px]">
          <h2 className="text-[32px] font-bold text-[#0b0b0b] m-0 mb-4">
            {FEATURES_SECTION.title}
          </h2>
          <p className="text-base text-[#555] m-0 max-w-[800px] mx-auto leading-normal">
            {FEATURES_SECTION.subtitle}
          </p>
        </div>
        <div className='flex flex-col gap-0'>
          {FEATURES.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              isRight={feature.isRight}
            />
          ))}
        </div>
      </section>

      {/* How URL Implement Section */}
      <section id="integration">
        <Description 
          title={IMPLEMENTATION_SECTION.title} 
          description={IMPLEMENTATION_SECTION.description} 
        />
      </section>
      
      {/* URL Generator Section */}
      <UrlGenerator />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
