import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { LOCATIONS } from '../constants';
import { MapPin, Clock, Phone, Navigation, Search } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const LocationMarker = ({ location, isSelected, onSelect }: { 
  location: typeof LOCATIONS[0], 
  isSelected: boolean, 
  onSelect: () => void,
  key?: string
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: location.lat, lng: location.lng }}
        onClick={onSelect}
      >
        <Pin 
          background={isSelected ? "#D62300" : "#F5A623"} 
          glyphColor="#fff" 
          borderColor="#1A1A1A"
        />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow anchor={marker} onCloseClick={() => onSelect()}>
          <div className="p-2 max-w-[200px]">
            <h3 className="font-display text-lg uppercase mb-1">{location.name}</h3>
            <p className="text-xs text-gray-600 mb-2">{location.address}</p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-bk-red">
              <Clock size={10} /> {location.hours}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const Locations = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-xl bg-white p-12 rounded-[3rem] shadow-xl border border-bk-charcoal/5">
          <div className="w-20 h-20 bg-bk-red/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <MapPin size={40} className="text-bk-red" />
          </div>
          <h2 className="font-display text-4xl uppercase mb-6">Google Maps Key Required</h2>
          <p className="text-bk-charcoal/60 mb-8 leading-relaxed">
            To see our restaurant locations on an interactive map, please add your Google Maps API key as a secret.
          </p>
          <div className="text-left bg-bk-cream p-6 rounded-2xl space-y-4 text-sm">
            <p><strong>1.</strong> Get a key at <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" className="text-bk-red underline">Google Cloud Console</a></p>
            <p><strong>2.</strong> Open <strong>Settings</strong> (⚙️) → <strong>Secrets</strong></p>
            <p><strong>3.</strong> Add <code>GOOGLE_MAPS_PLATFORM_KEY</code> with your key value.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        {/* Sidebar */}
        <div className="bg-white border-r border-bk-charcoal/10 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-bk-charcoal/10">
            <h1 className="font-display text-4xl uppercase mb-6">Find a BK</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-charcoal/40" size={20} />
              <input
                type="text"
                placeholder="City, State, or Zip"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-bk-cream rounded-xl border border-bk-charcoal/10 outline-none focus:border-bk-red transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  selectedId === loc.id 
                    ? "bg-bk-red text-white border-bk-red shadow-lg scale-[1.02]" 
                    : "bg-white text-bk-charcoal border-bk-charcoal/10 hover:border-bk-red"
                }`}
              >
                <h3 className="font-display text-2xl uppercase mb-2">{loc.name}</h3>
                <p className={`text-sm mb-4 ${selectedId === loc.id ? "opacity-80" : "text-bk-charcoal/50"}`}>
                  {loc.address}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase">
                  <div className="flex items-center gap-1"><Clock size={14} /> {loc.hours}</div>
                  {loc.driveThru && <div className="flex items-center gap-1">Drive-Thru</div>}
                </div>
                <div className="mt-6 flex gap-2">
                  <button className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2 ${
                    selectedId === loc.id ? "bg-white text-bk-red" : "bg-bk-charcoal text-white"
                  }`}>
                    <Navigation size={14} /> Directions
                  </button>
                  <button className={`p-2 rounded-lg ${
                    selectedId === loc.id ? "bg-white/20" : "bg-bk-cream"
                  }`}>
                    <Phone size={14} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-2 relative h-full">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
              defaultZoom={12}
              mapId="BK_LOCATIONS_MAP"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              disableDefaultUI={true}
              zoomControl={true}
            >
              {LOCATIONS.map(loc => (
                <LocationMarker 
                  key={loc.id} 
                  location={loc} 
                  isSelected={selectedId === loc.id}
                  onSelect={() => { setSelectedId(loc.id === selectedId ? null : loc.id); }}
                />
              ))}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default Locations;
