
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">RealTurf</h1>
            <p className="text-xs text-gray-400">AI-Powered</p>
          </div>
        </div>
        <p className="text-gray-400">
          Providing premium artificial turf solutions with intelligent recommendations.
        </p>
        <p className="text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} RealTurf AI Clone. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
