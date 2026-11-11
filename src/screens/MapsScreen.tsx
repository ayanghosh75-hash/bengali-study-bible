import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Navigation,
  BookOpen,
  Info,
  ChevronRight,
} from 'lucide-react';
import { BIBLICAL_LOCATIONS, BIBLICAL_JOURNEYS } from '../data/mapsAndPlacesData';
import { BiblicalLocation, BiblicalJourney } from '../types/maps';
import { toBengaliDigits } from '../utils/bengaliNumerals';

export const MapsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'locations' | 'journeys'>('locations');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<BiblicalLocation>(BIBLICAL_LOCATIONS[0]);
  const [selectedJourney, setSelectedJourney] = useState<BiblicalJourney>(BIBLICAL_JOURNEYS[0]);

  const filteredLocations = BIBLICAL_LOCATIONS.filter((loc) => {
    if (selectedType === 'all') return true;
    return loc.type === selectedType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                বাইবেলের মানচিত্র ও ঐতিহাসিক ভূগোল
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ভৌগোলিক প্রেক্ষাপট
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              শাস্ত্রীয় স্থানসমূহ, প্রাচীন সাম্রাজ্য, নদী-পর্বতমালা ও প্রেরিতীয় সুসমাচার প্রচারযাত্রার প্রামাণ্য পরিক্রমা
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 mt-8 space-x-4">
          <button
            onClick={() => setSelectedTab('locations')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
              selectedTab === 'locations'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>বাইবেলের স্থান ও প্রত্নতত্ত্ব ({BIBLICAL_LOCATIONS.length})</span>
          </button>
          <button
            onClick={() => setSelectedTab('journeys')}
            className={`pb-3 px-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
              selectedTab === 'journeys'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>প্রধান বাইবেলীয় যাত্রাপথ ({BIBLICAL_JOURNEYS.length})</span>
          </button>
        </div>
      </div>

      {/* TAB: LOCATIONS */}
      {selectedTab === 'locations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location List Column */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-stone-100 dark:bg-stone-800/60 rounded-xl">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                সব
              </button>
              <button
                onClick={() => setSelectedType('city')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedType === 'city'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                নগরী
              </button>
              <button
                onClick={() => setSelectedType('mountain')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedType === 'mountain'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                পর্বত
              </button>
              <button
                onClick={() => setSelectedType('river')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedType === 'river'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                নদী ও সাগর
              </button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-stone-900 dark:text-stone-100 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm font-serif">{loc.nameBn}</div>
                      <div className="text-xs text-stone-400">{loc.modernCountryBn}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Detail Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {selectedLocation.historicalEraBn}
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {selectedLocation.nameBn}
                  </h2>
                  <div className="text-xs text-stone-400 mt-0.5">
                    বর্তমান অবস্থান: {selectedLocation.modernCountryBn} • জিপিএস: {selectedLocation.latitude.toFixed(4)}° N, {selectedLocation.longitude.toFixed(4)}° E
                  </div>
                </div>

                <span className="self-start px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {selectedLocation.confidenceBn}
                </span>
              </div>

              {/* Significance */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                  ধর্মতাত্ত্বিক ও ঐতিহাসিক তাৎপর্য
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {selectedLocation.significanceBn}
                </p>
              </div>

              {/* Archaeology */}
              {selectedLocation.archaeologicalNotesBn && (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
                    <Info className="w-4 h-4 text-amber-500" />
                    <span>প্রত্নতাত্ত্বিক ও ঐতিহাসিক খনন তথ্য</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {selectedLocation.archaeologicalNotesBn}
                  </p>
                </div>
              )}

              {/* Key Passages */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                  প্রধান শাস্ত্রীয় উল্লেখসমূহ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.keyPassages.map((ref, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-xs font-medium border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{ref}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: JOURNEYS */}
      {selectedTab === 'journeys' && (
        <div className="space-y-8">
          <div className="flex gap-4">
            {BIBLICAL_JOURNEYS.map((journey) => (
              <button
                key={journey.id}
                onClick={() => setSelectedJourney(journey)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  selectedJourney.id === journey.id
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
                }`}
              >
                {journey.titleBn}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-4 mb-6">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                যাত্রী: {selectedJourney.travelerBn} • কাল: {selectedJourney.eraBn}
              </span>
              <h2 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {selectedJourney.titleBn}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
                {selectedJourney.descriptionBn}
              </p>
            </div>

            {/* Waypoints timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-6">
              {selectedJourney.waypoints.map((wp) => (
                <div key={wp.step} className="relative">
                  {/* Step marker */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {toBengaliDigits(wp.step)}
                  </div>

                  <div className="bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200/60 dark:border-stone-700/40">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {wp.locationNameBn}
                      </h4>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                        {wp.passageRef}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {wp.eventDescriptionBn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
