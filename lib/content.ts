/**
 * Zozoto — Brand & Content Configuration
 * Single source of truth for all marketing copy, tokens, and asset URLs.
 */

export interface FoodClip {
  id: string;
  title: string;
  caption: string;
  posterUrl: string;
}

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  label: string;
  icon: 'storefront' | 'pin' | 'bag';
}

export interface FeatureChip {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  side: 'left' | 'right';
  isToggle?: boolean;
}

export interface PhoneScreenState {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  highlightChip: string;
}

export interface EcosystemCard {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  theme: {
    bg: string;
    cardBorder: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  };
  link: string;
}

export interface EliteBenefit {
  id: string;
  title: string;
  description: string;
  subtext: string;
}

export const CONTENT = {
  brand: {
    name: 'zozoto',
    parentName: 'orbitly',
    tagline: "Your city's favourite food delivery app",
    currencySymbol: '₹',
    colors: {
      flame: '#FF5B2E',
      flameDeep: '#D93A12',
      blush: '#FFF1EB',
      ink: '#0B0B0C',
      paper: '#FAFAF8',
      muted: '#6B6B72',
      gold: '#D4A94A',
    },
  },

  hero: {
    h1Line1: "Your city's",
    h1Accent: 'favourite',
    h1Line2: 'food delivery app',
    subtext:
      'Order fast, eat happy. Fresh meals from local kitchens, delivered in minutes on the Zozoto app.',
    scrollPrompt: 'Scroll to explore',
    clips: [
      {
        id: 'bread',
        title: 'Puffed Golden Crust',
        caption: 'Crispy fried bread torn fresh from the flame',
        posterUrl:
          'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1920&q=80',
      },
      {
        id: 'noodles',
        title: 'Wok-Tossed Noodles',
        caption: 'Hand-pulled noodles kissed by high-heat smoky wok hei',
        posterUrl:
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=80',
      },
      {
        id: 'spice',
        title: 'Slow-Mo Spice Dust',
        caption: 'Roasted cumin and crimson paprika dancing over sizzling bowls',
        posterUrl:
          'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
      },
      {
        id: 'pizza',
        title: 'Cheesy Sourdough Pull',
        caption: 'Woodfired buffalo mozzarella stretching fresh from the stone',
        posterUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80',
      },
      {
        id: 'cake',
        title: 'Velvet Chocolate Cake',
        caption: 'A silver fork slicing into warm molten dark cocoa ganache',
        posterUrl:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80',
      },
    ] as FoodClip[],
  },

  betterFood: {
    heading: 'Better food for more people',
    paragraph:
      "For over a decade, we've helped people discover new tastes, delivered right to their doorstep.",
    stats: [
      {
        id: 'restaurants',
        value: 250000,
        suffix: '+',
        label: 'restaurants',
        icon: 'storefront',
      },
      {
        id: 'cities',
        value: 700,
        suffix: '+',
        label: 'cities',
        icon: 'pin',
      },
      {
        id: 'orders',
        value: 2000000000,
        suffix: '+',
        displayOverride: '2B+',
        label: 'orders delivered',
        icon: 'bag',
      },
    ] as StatItem[],
  },

  appFeatures: {
    title: "What's waiting for you on the app?",
    subtitle: 'Packed with features that make ordering food feel like a breeze.',
    chips: [
      {
        id: 'healthy',
        title: 'Healthy',
        tagline: 'Nutrient-counted bowls & greens',
        icon: 'salad',
        side: 'left',
      },
      {
        id: 'veg-mode',
        title: 'Veg Mode',
        tagline: '100% certified pure veg kitchens',
        icon: 'leaf',
        side: 'left',
        isToggle: true,
      },
      {
        id: 'party',
        title: 'Plan a Party',
        tagline: 'Pre-order bulk platters & party bites',
        icon: 'party',
        side: 'left',
      },
      {
        id: 'gift-cards',
        title: 'Gift Cards',
        tagline: 'Surprise someone with their favourite feast',
        icon: 'gift',
        side: 'left',
      },
      {
        id: 'gourmet',
        title: 'Gourmet',
        tagline: 'Signature menus from 5-star masters',
        icon: 'gourmet',
        side: 'right',
      },
      {
        id: 'offers',
        title: 'Offers',
        tagline: 'Exclusive bank savings & daily promo codes',
        icon: 'percent',
        side: 'right',
      },
      {
        id: 'train',
        title: 'Food on Train',
        tagline: 'Hot station deliveries right to your coach seat',
        icon: 'train',
        side: 'right',
      },
      {
        id: 'collections',
        title: 'Collections',
        tagline: 'Handpicked curations for rainy afternoons',
        icon: 'collections',
        side: 'right',
      },
    ] as FeatureChip[],
    screens: [
      {
        id: 'schedule',
        stepNumber: 1,
        title: 'Schedule your order',
        subtitle: 'Pick exact date, time slot & kitchen note ahead of dinner rushes.',
        highlightChip: 'party',
      },
      {
        id: 'track',
        stepNumber: 2,
        title: 'Track your rider',
        subtitle: 'Real-time live telemetry with heat-insulated bag monitoring.',
        highlightChip: 'gourmet',
      },
      {
        id: 'pay',
        stepNumber: 3,
        title: 'Pay securely',
        subtitle: '1-Tap seamless checkout with instant receipts & cashback refunds.',
        highlightChip: 'offers',
      },
    ] as PhoneScreenState[],
  },

  elite: {
    wordmark: 'zozoto',
    title: 'ELITE',
    tagline: 'The ultimate savings club for food lovers',
    badgeLabel: 'ELITE BENEFITS',
    benefits: [
      {
        id: 'free-delivery',
        title: 'Free delivery',
        description: 'on all orders within 6 km',
        subtext: 'No hidden surge fees, even during peak rush hours',
      },
      {
        id: 'extra-off',
        title: 'Up to 25% extra off',
        description: 'at 15,000+ partner restaurants',
        subtext: 'Combines effortlessly with all existing promotional offers',
      },
    ] as EliteBenefit[],
    perks: [
      'Priority customer concierge in under 30 seconds',
      'Zero rainy day surge surcharges',
      'Express kitchen prep guarantee',
    ],
  },

  ecosystem: {
    wordmark: 'orbitly',
    kicker: 'POWERING EVERYDAY LIFESTYLES',
    cards: [
      {
        id: 'zozoto',
        name: 'zozoto',
        tagline: 'Food Delivery',
        category: 'Food & Dining',
        description: 'Get the app now to start ordering your favourite dishes!',
        theme: {
          bg: '#FFE6DC',
          cardBorder: '#FFCBBB',
          accent: '#FF5B2E',
          badgeBg: '#FFEDE6',
          badgeText: '#D93A12',
        },
        link: '#hero',
      },
      {
        id: 'zipmart',
        name: 'zipmart',
        tagline: '10-Min Groceries',
        category: 'Instant Grocery',
        description: 'Groceries and essentials from nearby stores, delivered in 10 minutes.',
        theme: {
          bg: '#FFF3C4',
          cardBorder: '#FFE28A',
          accent: '#D4A94A',
          badgeBg: '#FEF9E6',
          badgeText: '#8C6A1F',
        },
        link: '#zipmart',
      },
      {
        id: 'evenzo',
        name: 'evenzo',
        tagline: 'Live Experiences',
        category: 'Events & Cinema',
        description: 'The best of events, movies, dining and everything you love!',
        theme: {
          bg: '#E9E1FF',
          cardBorder: '#D0C2F8',
          accent: '#7C3AED',
          badgeBg: '#F4F0FF',
          badgeText: '#5B21B6',
        },
        link: '#evenzo',
      },
      {
        id: 'freshchain',
        name: 'freshchain',
        tagline: 'Farm to Kitchen',
        category: 'B2B Supply',
        description: 'Complete supply chain solutions for your restaurant.',
        theme: {
          bg: '#FFDDE6',
          cardBorder: '#F8B7C7',
          accent: '#E11D48',
          badgeBg: '#FFF1F4',
          badgeText: '#9F1239',
        },
        link: '#freshchain',
      },
    ] as EcosystemCard[],
  },

  download: {
    heading: 'Download the app now!',
    subtext: 'Seamless ordering, anytime, anywhere on the Zozoto app.',
    qrText: 'Scan to download',
    qrUrl: 'https://example.com/zozoto',
  },

  footer: {
    wordmark: 'zozoto',
    columns: [
      {
        title: 'Orbitly',
        links: [
          { label: 'Zozoto', href: '#hero' },
          { label: 'Zipmart', href: '#zipmart' },
          { label: 'Evenzo', href: '#evenzo' },
          { label: 'Freshchain', href: '#freshchain' },
          { label: 'Feeding Kids Foundation', href: '#impact' },
        ],
      },
      {
        title: 'For Restaurants',
        links: [
          { label: 'Partner With Us', href: '#partner' },
          { label: 'Apps For You', href: '#merchant-app' },
          { label: 'Restaurant Consulting', href: '#consulting' },
        ],
      },
      {
        title: 'For Delivery Partners',
        links: [
          { label: 'Partner With Us', href: '#rider-partner' },
          { label: 'Apps For You', href: '#rider-app' },
        ],
      },
      {
        title: 'Learn More',
        links: [
          { label: 'Privacy', href: '#privacy' },
          { label: 'Security', href: '#security' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Help & Support', href: '#help' },
          { label: 'Report a Fraud', href: '#fraud' },
          { label: 'Blog', href: '#blog' },
        ],
      },
    ],
    socials: [
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
      { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
      { name: 'X', href: 'https://x.com', icon: 'x' },
    ],
    legal:
      'By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2026 © Zozoto Ltd. All rights reserved.',
  },
};
