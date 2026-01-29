
import React, { useState } from 'react';
import { knowledgeBase } from '../constants';
import { ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center text-left py-5 px-6"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <ChevronDown
          className={`w-6 h-6 text-red-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Resources() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 mx-auto text-red-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900">Knowledge Hub</h1>
          <p className="mt-4 text-lg text-gray-600">Your guide to artificial turf installation, maintenance, and more.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {knowledgeBase.map((article, index) => (
            <AccordionItem
              key={article.title}
              title={article.title}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            >
              {article.content.map((paragraph, pIndex) => (
                  <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
              ))}
            </AccordionItem>
          ))}
        </div>
      </div>
    </div>
  );
}
