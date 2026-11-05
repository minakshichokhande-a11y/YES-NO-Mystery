import { Chapter } from '../types/game';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Easy Mysteries',
    subtitle: 'Beginner cases to sharpen your detective instincts',
    levelStart: 1,
    levelEnd: 20,
    color: '#35C98B', // Green
    accentColor: 'from-emerald-500/20 to-emerald-950/40',
    description: 'Everyday enigmas and curious occurrences. Perfect for rookie detectives.',
    iconName: 'Sparkles',
  },
  {
    id: 2,
    title: 'School Mysteries',
    subtitle: 'Puzzling events around classrooms and hallways',
    levelStart: 21,
    levelEnd: 40,
    color: '#388BFF', // Blue
    accentColor: 'from-blue-500/20 to-blue-950/40',
    description: 'Chalkboards, textbooks, exams, and bells holding tricky school secrets.',
    iconName: 'GraduationCap',
  },
  {
    id: 3,
    title: 'House Mysteries',
    subtitle: 'Domestic riddles hidden behind locked doors',
    levelStart: 41,
    levelEnd: 60,
    color: '#FF9F1C', // Orange
    accentColor: 'from-amber-500/20 to-amber-950/40',
    description: 'Familiar household rooms concealing unexpected physical phenomena.',
    iconName: 'Home',
  },
  {
    id: 4,
    title: 'Detective Cases',
    subtitle: 'Crime scenes, suspects, and forensic clues',
    levelStart: 61,
    levelEnd: 80,
    color: '#8257FF', // Purple
    accentColor: 'from-purple-500/20 to-purple-950/40',
    description: 'Unsolved gallery thefts, secret notes, missing witnesses, and alibis.',
    iconName: 'ShieldAlert',
  },
  {
    id: 5,
    title: 'Travel Mysteries',
    subtitle: 'Journeys by rail, air, ocean, and road',
    levelStart: 81,
    levelEnd: 100,
    color: '#06D6A0', // Cyan
    accentColor: 'from-cyan-500/20 to-cyan-950/40',
    description: 'Puzzling timetables, empty flights, moving paths, and lost destinations.',
    iconName: 'Compass',
  },
  {
    id: 6,
    title: 'Animal Mysteries',
    subtitle: 'Curious behaviors across the wild kingdom',
    levelStart: 101,
    levelEnd: 120,
    color: '#2EC4B6', // Green
    accentColor: 'from-teal-500/20 to-teal-950/40',
    description: 'Nocturnal owls, sleeping fish, talking parrots, and clever chameleons.',
    iconName: 'Feather',
  },
  {
    id: 7,
    title: 'Science Mysteries',
    subtitle: 'Scientific anomalies, physics, and chemistry',
    levelStart: 121,
    levelEnd: 140,
    color: '#4361EE', // Blue
    accentColor: 'from-indigo-500/20 to-indigo-950/40',
    description: 'Floating needles, inverted water, bending rays of light, and magnets.',
    iconName: 'FlaskConical',
  },
  {
    id: 8,
    title: 'Historical Mysteries',
    subtitle: 'Ancient artifacts, royal crowns, and parchment',
    levelStart: 141,
    levelEnd: 160,
    color: '#FFC857', // Gold
    accentColor: 'from-amber-400/20 to-amber-950/40',
    description: 'Centuries-old documents, vanishing castles, and mysterious relics.',
    iconName: 'Landmark',
  },
  {
    id: 9,
    title: 'Master Detective',
    subtitle: 'Complex paradoxes requiring razor-sharp deduction',
    levelStart: 161,
    levelEnd: 180,
    color: '#D946EF', // Red-purple
    accentColor: 'from-fuchsia-500/20 to-fuchsia-950/40',
    description: 'Double identities, impossible timelines, and deceptive eyewitnesses.',
    iconName: 'BrainCircuit',
  },
  {
    id: 10,
    title: 'The Final Mystery',
    subtitle: 'The supreme test: Who is the Master Detective?',
    levelStart: 181,
    levelEnd: 200,
    color: '#FFD700', // Gold and dark purple
    accentColor: 'from-amber-500/30 via-purple-700/30 to-purple-950/60',
    description: 'Mind-bending lateral puzzles culminating in the grand 200th investigation.',
    iconName: 'Trophy',
  },
];
