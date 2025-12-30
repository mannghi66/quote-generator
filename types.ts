
export interface Quote {
  text: string;
  author: string;
  category: string;
}

export enum QuoteCategory {
  LOVE = 'Love',
  SUCCESS = 'Success',
  LIFE = 'Life',
  WISDOM = 'Wisdom',
  HAPPINESS = 'Happiness',
  MOTIVATION = 'Motivation',
  FRIENDSHIP = 'Friendship',
  CUSTOM = 'Custom'
}

export interface QuoteCardStyle {
  id: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
}
