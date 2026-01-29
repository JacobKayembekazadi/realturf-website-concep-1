
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Dealers from './components/Dealers';
import Resources from './components/Resources';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ChatWidget from './components/ChatWidget';

export type Section = 'home' | 'products' | 'dealers' | 'resources';

export default function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'products':
        return <Products />;
      case 'dealers':
        return <Dealers />;
      case 'resources':
        return <Resources />;
      case 'home':
      default:
        return <Hero onGetQuote={() => setShowQuoteModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header
        activeSection={activeSection}
        onGetQuote={() => setShowQuoteModal(true)}
        setActiveSection={setActiveSection}
      />
      <main className="pt-20">
        {renderSection()}
      </main>
      <Footer />
      <ChatWidget />
      {showQuoteModal && <QuoteModal onClose={() => setShowQuoteModal(false)} />}
    </div>
  );
}
