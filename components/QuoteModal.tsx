
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ArrowRight, Check, Sparkles, Building2, User, Mail, Phone, Camera, CheckCircle2 } from 'lucide-react';
import { getQuoteAnalysis } from '../services/geminiService';
import { allProducts, dealers } from '../constants';

interface QuoteModalProps {
  onClose: () => void;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({ sqft: '', usage: [] as string[], location: '' });
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ recommendations: { productName: string, reason: string }[], analysis: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setStep(2);
    let imagePayload;
    if (imageFile) {
      const data = await fileToBase64(imageFile);
      imagePayload = { mimeType: imageFile.type, data };
    }
    
    const resultJson = await getQuoteAnalysis(projectData, imagePayload);
    setAnalysisResult(JSON.parse(resultJson));
    setIsLoading(false);
    setStep(3);
  };

  const USAGE_OPTIONS = ["Pets", "Kids Play Area", "High Traffic", "Pool Surround", "Sports/Golf", "Garden/Yard"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="flex justify-between items-center p-8 bg-gray-50 border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">AI PROJECT ANALYSIS</h2>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mt-1">
              <Sparkles className="w-3 h-3" />
              Powered by RealTurf Intelligence
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white hover:bg-gray-200 rounded-full transition shadow-sm"><X/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Camera className="w-5 h-5 text-red-600" />
                    1. Upload Project Area
                  </h3>
                  <label className="block group cursor-pointer">
                    <div className={`border-4 border-dashed rounded-[1.5rem] p-12 text-center transition-all ${imagePreview ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-xl shadow-xl"/>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-300 group-hover:text-red-600 transition-colors mb-4" />
                          <p className="text-gray-600 font-bold">Drag & Drop project photo</p>
                          <p className="text-gray-400 text-sm mt-1">Our AI analyzes surface and obstacles automatically</p>
                        </div>
                      )}
                      <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </div>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400 block mb-3">Square Footage</label>
                    <input type="number" placeholder="e.g. 1500" className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-xl p-4 transition outline-none text-xl font-bold" value={projectData.sqft} onChange={e => setProjectData({...projectData, sqft: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400 block mb-3">Project Location</label>
                    <input type="text" placeholder="City, State" className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-xl p-4 transition outline-none text-xl font-bold" value={projectData.location} onChange={e => setProjectData({...projectData, location: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black uppercase tracking-widest text-gray-400 block mb-6">Primary Usage Requirements</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {USAGE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => {
                          const newUsage = projectData.usage.includes(opt) ? projectData.usage.filter(u => u !== opt) : [...projectData.usage, opt];
                          setProjectData({...projectData, usage: newUsage});
                        }}
                        className={`p-4 rounded-xl text-sm font-bold transition-all border-2 ${projectData.usage.includes(opt) ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-white border-gray-100 text-gray-600 hover:border-red-200'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleAnalyze} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
                  Analyze Project
                  <Sparkles className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mx-auto" />
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-red-600 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">AI MATCHING...</h3>
                  <p className="text-gray-500 font-medium">Gemini is processing your project data and area visuals.</p>
                </div>
              </motion.div>
            )}

            {step === 3 && analysisResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <h4 className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-3">AI Expert Analysis</h4>
                  <p className="text-gray-800 font-medium leading-relaxed italic">"{analysisResult.analysis}"</p>
                </div>

                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, i) => {
                    const product = allProducts.find(p => p.name === rec.productName);
                    return product && (
                      <div key={i} className="flex gap-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <img src={product.image} className="w-24 h-24 rounded-xl object-cover shadow-lg" />
                        <div>
                          <h5 className="text-xl font-black uppercase text-gray-900">{product.name}</h5>
                          <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                          <p className="text-red-600 text-sm font-bold mt-3 bg-red-50 inline-block px-3 py-1 rounded-full border border-red-100">{rec.reason}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setStep(4)} className="w-full py-6 bg-black text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3">
                  Confirm & Connect
                  <ArrowRight />
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">LOCAL CONNECTION</h3>
                  <p className="text-gray-500 font-medium">Finalize your details to speak with a local RealTurf expert.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Full Name" className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl outline-none font-bold" value={contactInfo.name} onChange={e => setContactInfo({...contactInfo, name: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" placeholder="Email Address" className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl outline-none font-bold" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} />
                  </div>
                </div>

                <button onClick={() => setStep(5)} className="w-full py-6 bg-red-600 text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-black transition-all">
                  Request Consultation
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-4xl font-black tracking-tight text-gray-900">SUCCESS!</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">Thank you, {contactInfo.name}. Our elite support team will reach out within 24 hours.</p>
                <button onClick={onClose} className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold uppercase">Close Panel</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
