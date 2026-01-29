
import React from 'react';
import { dealers } from '../constants';
import { MapPin, Building } from 'lucide-react';

export default function Dealers() {
  const physicalCenters = dealers.filter(d => d.type === 'Physical Center');
  const partnerCenters = dealers.filter(d => d.type === 'Partner Center');

  return (
    <div className="py-12 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Dealer Network</h1>
          <p className="mt-4 text-lg text-gray-600">Find a RealTurf location near you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Building className="w-8 h-8 text-red-600" />
              Physical Centers
            </h2>
            <div className="space-y-6">
              {physicalCenters.map(dealer => (
                <div key={dealer.name} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">{dealer.name}</h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {dealer.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Building className="w-8 h-8 text-red-600" />
              Partner Centers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {partnerCenters.map(dealer => (
                <div key={dealer.name} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                  <p className="font-medium text-gray-700">{dealer.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
