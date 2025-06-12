export type MoodEntry = {
  name: string;
  mood: string;
  comment?: string;
  createdAt: string;
};

export const moods: MoodEntry[] = [];