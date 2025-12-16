import firstCardImage from '../assets/FirstCard.png';
import secondCardImage from '../assets/SecondCard.png';
import thirdCardImage from '../assets/ThirdCard.png';

export const FEATURES = [
  {
    id: 1,
    title: 'Shortner the link',
    description: 'Short link generation transforms lengthy URLs into compact, trackable, and branded links that redirect users seamlessly to the original destination, making sharing easier, analytics smarter, and marketing more effective.',
    image: firstCardImage,
    isRight: false,
  },
  {
    id: 2,
    title: 'Link expiration',
    description: 'Link expiry is a feature that lets you set a specific time or date after which a short link automatically stops working. Once expired, the link can either show an error message, redirect to a fallback page, or simply become inactive.',
    image: secondCardImage,
    isRight: true,
  },
  {
    id: 3,
    title: 'URL HISTORY',
    description: 'History is a feature that stores and displays all the links a user has shortened over time. It allows users to revisit, manage, or reuse previously created short links without generating them again.',
    image: thirdCardImage,
    isRight: false,
  },
];

export const HERO_CONTENT = {
  headline: 'Monitor every click',
  brandName: 'Brotix',
  subheadline: 'understand your audience, optimize your reach, and grow smarter.',
  description: 'Short your links and share them effortlessly. Take control of your data with customizable expiry and tracking. Monitor every click, understand your reach, and grow smarter. Fast, Free, and Built for Creators who value simplicity and power.',
  ctaText: 'Try For Free',
};

export const FEATURES_SECTION = {
  title: 'Features In URL',
  subtitle: 'Everything you need to create, customize, and display widgets that engage your users.',
};

export const IMPLEMENTATION_SECTION = {
  title: 'How URL Implement',
  description: 'Brotix lets you shorten, customize, track, and control your links — all in one smart platform.',
};

