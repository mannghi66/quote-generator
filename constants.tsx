
import { QuoteCardStyle, QuoteCategory } from './types';

export const CATEGORIES: QuoteCategory[] = [
  QuoteCategory.LOVE,
  QuoteCategory.SUCCESS,
  QuoteCategory.LIFE,
  QuoteCategory.WISDOM,
  QuoteCategory.HAPPINESS,
  QuoteCategory.MOTIVATION,
  QuoteCategory.FRIENDSHIP,
  QuoteCategory.CUSTOM
];

export const CARD_STYLES: QuoteCardStyle[] = [
  {
    id: 'soft-pink',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-800',
    accentClass: 'border-pink-300'
  },
  {
    id: 'lavender-dream',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    accentClass: 'border-purple-300'
  },
  {
    id: 'peach-fuzz',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-800',
    accentClass: 'border-orange-200'
  },
  {
    id: 'mint-fresh',
    bgClass: 'bg-teal-50',
    textClass: 'text-teal-800',
    accentClass: 'border-teal-200'
  },
  {
    id: 'pure-white',
    bgClass: 'bg-white',
    textClass: 'text-gray-800',
    accentClass: 'border-pink-100'
  }
];
