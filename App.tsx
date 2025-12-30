
import React, { useState, useEffect, useCallback } from 'react';
import { Quote, QuoteCategory, QuoteCardStyle } from './types';
import { CATEGORIES, CARD_STYLES } from './constants';
import { generateQuote } from './services/geminiService';
import QuoteCard from './components/QuoteCard';

const App: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    text: "Your heart is the most beautiful part of you.",
    author: "Gentle Reminder",
    category: "Love"
  });
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory>(QuoteCategory.LOVE);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [cardStyle, setCardStyle] = useState<QuoteCardStyle>(CARD_STYLES[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    const topic = selectedCategory === QuoteCategory.CUSTOM ? customTopic : selectedCategory;
    const quote = await generateQuote(topic || 'Inspiration');
    setCurrentQuote(quote);
    setLoading(false);
  };

  const handleSave = () => {
    if (!savedQuotes.some(q => q.text === currentQuote.text)) {
      setSavedQuotes([currentQuote, ...savedQuotes]);
    }
  };

  const handleDownload = () => {
    // Simple mock download - in a real app we'd use html2canvas
    alert("In a full production environment, this would download your aesthetic quote as an image! ✨");
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <header className="pt-12 pb-8 px-4 text-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-cursive text-pink-500 mb-4 drop-shadow-sm">
          Quote Haven
        </h1>
        <p className="text-lg md:text-xl text-pink-400 font-medium max-w-lg mx-auto leading-relaxed">
          Sprinkle some magic and inspiration onto your day with baby-pink aesthetic quotes.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Quote Visualizer */}
        <section className="w-full mb-12 flex flex-col items-center">
          <QuoteCard quote={currentQuote} style={cardStyle} isLoading={loading} />
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              Generate New ✨
            </button>
            <button 
              onClick={handleSave}
              className="bg-white hover:bg-pink-50 text-pink-500 border-2 border-pink-200 font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:-translate-y-1"
            >
              Save to Favorites ❤️
            </button>
            <button 
              onClick={handleDownload}
              className="bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:-translate-y-1"
            >
              Download Card ⬇️
            </button>
          </div>
        </section>

        {/* Customization & Settings */}
        <section className="w-full max-w-4xl bg-white rounded-[2rem] p-8 shadow-sm border border-pink-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Topic Selection */}
            <div>
              <h3 className="text-xl font-bold text-pink-600 mb-6 flex items-center gap-2">
                 Choose Your Vibe
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-pink-500 text-white shadow-md' 
                        : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {selectedCategory === QuoteCategory.CUSTOM && (
                <div className="mt-4 animate-fadeIn">
                  <label className="block text-xs font-bold text-pink-400 uppercase tracking-widest mb-2 ml-1">What's on your mind?</label>
                  <input 
                    type="text" 
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="E.g. Rainy days, Coffee, Cats..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-300 focus:outline-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Style Selection */}
            <div>
              <h3 className="text-xl font-bold text-pink-600 mb-6 flex items-center gap-2">
                <span className="text-2xl">🎨</span> Card Aesthetics
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {CARD_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setCardStyle(style)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${style.bgClass} ${
                      cardStyle.id === style.id ? 'border-pink-500 scale-110 shadow-lg' : 'border-white hover:border-pink-200'
                    }`}
                    title={style.id}
                  />
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-400 italic">
                Each style is carefully curated to feel soft, calming, and aesthetic.
              </p>
            </div>

          </div>
        </section>

        {/* Saved Gallery */}
        {savedQuotes.length > 0 && (
          <section className="w-full mb-12">
            <h2 className="text-3xl font-cursive text-pink-400 mb-8 text-center">Your Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQuotes.map((q, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-pink-50 transition-all hover:shadow-md hover:scale-[1.02]">
                  <p className="text-gray-700 font-medium mb-3 line-clamp-3">"{q.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-cursive text-pink-400">— {q.author}</span>
                    <span className="text-[10px] bg-pink-50 text-pink-300 px-2 py-1 rounded-full uppercase tracking-tighter">
                      {q.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 text-center text-pink-300 border-t border-pink-100">
        <p className="font-cursive text-2xl mb-2">Made with love & sparkles</p>
        <p className="text-xs uppercase tracking-widest">© 2024 Quote Haven AI</p>
      </footer>
    </div>
  );
};

export default App;
