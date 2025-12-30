
import React from 'react';
import { Quote, QuoteCardStyle } from '../types';

interface QuoteCardProps {
  quote: Quote;
  style: QuoteCardStyle;
  isLoading: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, style, isLoading }) => {
  return (
    <div className={`relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] flex flex-col items-center justify-center p-8 md:p-12 rounded-[2.5rem] shadow-xl border-4 ${style.bgClass} ${style.accentClass} transition-all duration-500 transform hover:scale-[1.02]`}>
      {/* Decorative elements */}
      <div className="absolute top-6 left-6 text-6xl opacity-20 select-none">“</div>
      <div className="absolute bottom-6 right-6 text-6xl opacity-20 select-none rotate-180">“</div>
      
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-pink-500 font-medium animate-pulse">Sprinkling some magic...</p>
        </div>
      ) : (
        <div className="text-center z-10 flex flex-col items-center">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed mb-6 ${style.textClass}`}>
            {quote.text}
          </h2>
          <div className={`h-1 w-20 mb-4 rounded-full bg-current opacity-30`}></div>
          <p className={`text-lg md:text-xl font-cursive ${style.textClass} opacity-80 italic`}>
            — {quote.author}
          </p>
        </div>
      )}

      {/* Aesthetic floaties */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-200 rounded-full opacity-50 blur-xl animate-bounce"></div>
      <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-40 blur-xl animate-pulse delay-700"></div>
    </div>
  );
};

export default QuoteCard;
