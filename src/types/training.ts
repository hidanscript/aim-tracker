export interface TrainingSession {
  _id: string;
  date: string;
  exercise: string;
  duration?: number;
  hits?: number;
  difficulty?: number;
  notes?: string;
  dpi: number;
  igs: number;
  improved?: boolean;
} 