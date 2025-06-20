import { Course, Quiz, Badge, LeaderboardEntry } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the basics of React including components, state, props, and lifecycle methods.',
    category: 'Frontend Development',
    difficulty: 'beginner',
    duration: '6 weeks',
    enrolledStudents: 1250,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructor: 'Sarah Chen',
    modules: [
      {
        id: '1',
        courseId: '1',
        title: 'Introduction to React',
        description: 'Learn what React is and why it\'s popular',
        content: 'React is a JavaScript library for building user interfaces...',
        duration: '45 minutes',
        points: 100,
        quizId: '1'
      },
      {
        id: '2',
        courseId: '1',
        title: 'Components and JSX',
        description: 'Understanding React components and JSX syntax',
        content: 'Components are the building blocks of React applications...',
        duration: '60 minutes',
        points: 150,
        quizId: '2'
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript Advanced Concepts',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.',
    category: 'Programming',
    difficulty: 'advanced',
    duration: '8 weeks',
    enrolledStudents: 890,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructor: 'Mike Rodriguez',
    modules: [
      {
        id: '3',
        courseId: '2',
        title: 'Closures and Scope',
        description: 'Understanding closures and lexical scope in JavaScript',
        content: 'Closures are a fundamental concept in JavaScript...',
        duration: '90 minutes',
        points: 200,
        quizId: '3'
      }
    ]
  },
  {
    id: '3',
    title: 'Database Design Principles',
    description: 'Learn how to design efficient and scalable database schemas.',
    category: 'Backend Development',
    difficulty: 'intermediate',
    duration: '5 weeks',
    enrolledStudents: 675,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructor: 'Dr. Emily Watson',
    modules: [
      {
        id: '4',
        courseId: '3',
        title: 'Entity Relationship Diagrams',
        description: 'Creating and interpreting ER diagrams',
        content: 'Entity Relationship Diagrams help visualize database structure...',
        duration: '75 minutes',
        points: 175,
        quizId: '4'
      }
    ]
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    moduleId: '1',
    title: 'React Basics Quiz',
    timeLimit: 600,
    passingScore: 70,
    questions: [
      {
        id: '1',
        question: 'What is React?',
        type: 'multiple-choice',
        options: ['A JavaScript library', 'A database', 'A web server', 'A CSS framework'],
        correctAnswer: 0,
        explanation: 'React is a JavaScript library for building user interfaces.',
        points: 25
      },
      {
        id: '2',
        question: 'React components must return a single element.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'React components must return a single parent element or use fragments.',
        points: 25
      }
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first module',
    icon: '🌟',
    criteria: 'Complete 1 module',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: '🏆',
    criteria: 'Perfect score on 5 quizzes',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Knowledge Seeker',
    description: 'Complete 10 modules',
    icon: '📚',
    criteria: 'Complete 10 modules',
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'React Expert',
    description: 'Master React fundamentals',
    icon: '⚛️',
    criteria: 'Complete React course with 90%+ average',
    rarity: 'legendary'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: 2450,
      level: 8,
      badges: [],
      progress: {},
      completedCourses: [],
      joinedDate: '2024-01-15'
    },
    points: 2450,
    level: 8,
    badges: 12
  },
  {
    rank: 2,
    user: {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: 2180,
      level: 7,
      badges: [],
      progress: {},
      completedCourses: [],
      joinedDate: '2024-01-20'
    },
    points: 2180,
    level: 7,
    badges: 9
  },
  {
    rank: 3,
    user: {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: 1950,
      level: 6,
      badges: [],
      progress: {},
      completedCourses: [],
      joinedDate: '2024-02-01'
    },
    points: 1950,
    level: 6,
    badges: 8
  }
];