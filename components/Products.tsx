
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, ArrowRightLeft, X, Trash2, CheckCircle2 } from 'lucide-react';
import { allProducts } from '../constants';
import { Product } from '../types';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'landscape' | 'sports'>('all');
  const [selectedApp, setSelectedApp] = useState('all');
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesApp = selectedApp === 'all' || (p.apps?.some(app => app.toLowerCase() === selectedApp) ?? false);
    return matchesSearch && matchesCategory && matchesApp;
  });

  const toggleComparison = (product: Product) => {
    if (comparisonList.find(p => p.name === product.name)) {
      setComparisonList(comparisonList.filter(p => p.name !== product.name));
    } else {
      if (comparisonList.length < 4) {
        setComparisonList([...comparisonList, product]);
      } else {
        alert("You can compare up to 4 products at once.");
      }
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 bg-gray-50 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Our <span className="text-red-600">Product Lineup</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium">
            Elite artificial turf systems precision-engineered for the most demanding environments.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="sticky top-24 z-30 mb-12 flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[
              { id: 'all', label: 'All', icon: '🏆' },
              { id: 'landscape', label: 'Landscape', icon: '🌿' },
              { id: 'sports', label: 'Sports', icon: '⚽' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-xl shadow-red-600/30'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto w-full">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search premium turf..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white rounded-xl focus:outline-none font-bold transition-all"
              />
            </div>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="px-6 py-3 bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white rounded-xl focus:outline-none font-bold appearance-none min-w-[200px]"
            >
              <option value="all">All Applications</option>
              <optgroup label="Landscape">
                <option value="yard">Yard</option>
                <option value="pet">Pet</option>
                <option value="pool">Pool</option>
                <option value="commercial">Commercial</option>
              </optgroup>
              <optgroup label="Sports">
                <option value="golf">Golf</option>
                <option value="soccer">Soccer</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, idx) => {
            const isComparing = comparisonList.some(p => p.name === product.name);
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group overflow-hidden"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <button
                      onClick={() => toggleComparison(product)}
                      className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-90 ${
                        isComparing ? 'bg-red-600 text-white' : 'bg-white/90 text-gray-900 hover:bg-red-50'
                      }`}
                    >
                      <ArrowRightLeft className="w-5 h-5" />
                    </button>
                    <div className="px-4 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full self-end">
                      {product.category}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h3>
                  <div className="flex gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pile Height</span>
                      <span className="text-sm font-black text-red-600">{product.pileHeight}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-100 self-center" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Face Weight</span>
                      <span className="text-sm font-black text-gray-900">{product.faceWeight}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.features.slice(0, 3).map(f => (
                      <span key={f} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-lg border border-gray-100 uppercase tracking-tighter">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                    >
                      Specs
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison HUD */}
        <AnimatePresence>
          {comparisonList.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
            >
              <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="hidden sm:block">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest">Comparison Tray</h4>
                    <p className="text-gray-400 text-[10px] font-bold">{comparisonList.length}/4 Selected</p>
                  </div>
                  <div className="flex gap-2">
                    {comparisonList.map(p => (
                      <div key={p.name} className="relative group">
                        <img src={p.image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10 transition group-hover:ring-red-500" />
                        <button 
                          onClick={() => toggleComparison(p)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setComparisonList([])}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowComparisonModal(true)}
                    className="px-8 py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white hover:text-red-600 transition-all shadow-xl active:scale-95"
                  >
                    Compare Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Matrix Modal */}
        <AnimatePresence>
          {showComparisonModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowComparisonModal(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative bg-white w-full max-w-6xl max-h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="p-8 md:p-12 flex justify-between items-center border-b border-gray-100">
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Technical Matrix</h2>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.3em] mt-1">Side-by-Side Analysis</p>
                  </div>
                  <button 
                    onClick={() => setShowComparisonModal(false)}
                    className="p-4 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-full transition-all"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-8 md:p-12">
                  <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(200px,1fr))] gap-8 min-w-[1000px]">
                    {/* Column Header */}
                    <div />
                    {comparisonList.map(p => (
                      <div key={p.name} className="space-y-4">
                        <img src={p.image} className="w-full h-40 rounded-3xl object-cover shadow-2xl" />
                        <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">{p.name}</h4>
                      </div>
                    ))}

                    {/* Pile Height Row */}
                    <div className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center border-t border-gray-100 pt-6">Pile Height</div>
                    {comparisonList.map(p => (
                      <div key={p.name} className="border-t border-gray-100 pt-6">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-red-600" style={{ width: p.pileHeight?.includes('1') ? '50%' : '80%' }} />
                        </div>
                        <span className="text-lg font-black text-gray-900 mt-2 block">{p.pileHeight ?? 'N/A'}</span>
                      </div>
                    ))}

                    {/* Face Weight Row */}
                    <div className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center border-t border-gray-100 pt-6">Face Weight</div>
                    {comparisonList.map(p => (
                      <div key={p.name} className="border-t border-gray-100 pt-6">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-black" style={{ width: `${((p.faceWeightVal ?? 0) / 120) * 100}%` }} />
                        </div>
                        <span className="text-lg font-black text-gray-900 mt-2 block">{p.faceWeight ?? 'N/A'}</span>
                      </div>
                    ))}

                    {/* Fiber Row */}
                    <div className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center border-t border-gray-100 pt-6">Fiber Tech</div>
                    {comparisonList.map(p => (
                      <div key={p.name} className="border-t border-gray-100 pt-6">
                        <span className="text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">{p.fiber ?? 'N/A'}</span>
                      </div>
                    ))}

                    {/* Features Row */}
                    <div className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-start border-t border-gray-100 pt-6">Core Features</div>
                    {comparisonList.map(p => (
                      <div key={p.name} className="border-t border-gray-100 pt-6 space-y-2">
                        {p.features.map((f: string) => (
                          <div key={f} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                            <CheckCircle2 className="w-3 h-3 text-red-600" />
                            {f}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
