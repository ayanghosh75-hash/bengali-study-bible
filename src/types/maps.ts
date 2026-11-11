// Types for Biblical Maps, Places, Journeys and Timeline

export type BiblicalLocationType =
  | 'city'
  | 'mountain'
  | 'river'
  | 'sea'
  | 'region'
  | 'empire'
  | 'sanctuary';

export interface BiblicalLocation {
  id: string;
  nameBn: string;
  nameEn: string;
  type: BiblicalLocationType;
  modernCountryBn: string;
  latitude: number;
  longitude: number;
  significanceBn: string;
  archaeologicalNotesBn?: string;
  keyPassages: string[];
  historicalEraBn: string;
  confidenceBn: 'সুনিশ্চিত ভৌগোলিক স্থান' | 'সম্ভাব্য প্রত্নতাত্ত্বিক অবস্থান' | 'ঐতিহাসিক বিবরণভিত্তিক ধারণা';
}

export interface BiblicalJourneyWaypoint {
  step: number;
  locationNameBn: string;
  passageRef: string;
  eventDescriptionBn: string;
}

export interface BiblicalJourney {
  id: string;
  titleBn: string;
  travelerBn: string;
  eraBn: string;
  durationEstimateBn: string;
  descriptionBn: string;
  significanceBn: string;
  waypoints: BiblicalJourneyWaypoint[];
}
