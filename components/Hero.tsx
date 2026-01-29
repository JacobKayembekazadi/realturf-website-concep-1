
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onGetQuote: () => void;
}

export default function Hero({ onGetQuote }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#fafafa]">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100 mb-8"
          >
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Next-Gen Artificial Turf Systems
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 leading-[0.9] mb-8"
          >
            ENGINEERED FOR <br />
            <span className="text-red-600">PERFECTION.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed font-medium"
          >
            Premium surfaces for elite landscapes and professional sports. Powered by Gemini AI for hyper-accurate project matching and technical analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button
              onClick={onGetQuote}
              className="group relative px-10 py-5 bg-red-600 text-white rounded-full font-black text-lg uppercase tracking-widest overflow-hidden transition-all hover:bg-black hover:pr-14 active:scale-95 shadow-2xl shadow-red-600/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start AI Analysis
                <Sparkles className="w-5 h-5" />
              </span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <button
              onClick={() => document.getElementById('chat-widget-button')?.click()}
              className="px-10 py-5 bg-white border-2 border-gray-200 text-gray-900 rounded-full font-black text-lg uppercase tracking-widest hover:border-red-600 transition-colors flex items-center justify-center gap-3"
            >
              <Bot className="w-6 h-6 text-red-600" />
              Consult AI
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-24">
          {[
            { icon: Bot, title: 'Intelligent Matching', text: 'Gemini-powered visual analysis matching your project to our elite catalog.' },
            { icon: ShieldCheck, title: 'Unmatched Durability', text: 'Proprietary RealTech® features ensuring a 15+ year lifespan in extreme U.S. climates.' },
            { icon: Zap, title: 'Rapid Deployment', text: 'Nationwide distribution centers with real-time inventory for contractors.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              className="flex flex-col gap-4 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:-translate-y-2 border border-gray-100">
                <feature.icon className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-black tracking-tight uppercase text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
