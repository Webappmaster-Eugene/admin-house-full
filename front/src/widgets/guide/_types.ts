export type GuideSectionId =
  | 'hero'
  | 'quick-start'
  | 'glossary'
  | 'handbook'
  | 'estimates'
  | 'units'
  | 'pies'
  | 'faq';

/** Идентификаторы для inline-подсказок GuideInfoAlert — соответствуют якорям внутри /dashboard/guide */
export type GuideAnchor = 'quick-start' | 'handbook' | 'estimates' | 'units' | 'pies' | 'faq';

export interface GuideScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface GuideStep {
  title: string;
  description: string;
  screenshot?: GuideScreenshot;
}

export interface GuideDetailBlock {
  title: string;
  body: string;
  bullets?: string[];
  screenshot?: GuideScreenshot;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideGlossaryItem {
  term: string;
  definition: string;
}

export interface GuideContent {
  hero: {
    title: string;
    lead: string;
    cta: string;
  };
  quickStart: {
    title: string;
    lead: string;
    steps: GuideStep[];
  };
  glossary: {
    title: string;
    lead: string;
    items: GuideGlossaryItem[];
  };
  handbook: {
    title: string;
    lead: string;
    blocks: GuideDetailBlock[];
  };
  estimates: {
    title: string;
    lead: string;
    blocks: GuideDetailBlock[];
    rowTypes: Array<{
      kind: 'manual' | 'unit' | 'pie';
      label: string;
      description: string;
      screenshot?: GuideScreenshot;
    }>;
  };
  units: {
    title: string;
    lead: string;
    blocks: GuideDetailBlock[];
  };
  pies: {
    title: string;
    lead: string;
    blocks: GuideDetailBlock[];
  };
  faq: {
    title: string;
    lead: string;
    items: GuideFaqItem[];
  };
}
