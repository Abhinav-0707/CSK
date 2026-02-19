
export interface User {
  id: string;
  email: string;
  name: string;
  joinedAt: string;
}

export interface Curriculum {
  id: string;
  userId: string;
  title: string;
  targetAudience: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  industry: string;
  duration: string;
  objectives: string[];
  description: string;
  modules: Module[];
  outcomes: string[];
  assignments: string[];
  tools: string[];
  qualityScore: number;
  industryAlignment: number;
  createdAt: string;
}

export interface Module {
  title: string;
  topics: string[];
  practicalTasks: string[];
}

export interface Slide {
  title: string;
  bullets: string[];
  speakerNotes: string;
}

export interface TeachingNote {
  moduleTitle: string;
  content: string;
  examples: string[];
  caseStudy?: string;
}

export interface SavedContent {
  curriculums: Curriculum[];
  users: User[];
}
