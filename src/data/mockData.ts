import { Quiz, Badge, LeaderboardEntry, QuizAttempt } from '../types';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of basic JavaScript concepts including variables, functions, and data types.',
    category: 'Programming',
    difficulty: 'beginner',
    timeLimit: 900, // 15 minutes
    passingScore: 70,
    points: 100,
    createdBy: 'admin',
    createdAt: '2024-01-15',
    attempts: 245,
    averageScore: 78,
    isActive: true,
    questions: [
      {
        id: '1',
        question: 'What is the correct way to declare a variable in JavaScript?',
        type: 'multiple-choice',
        options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
        correctAnswer: 0,
        explanation: 'The "var" keyword is used to declare variables in JavaScript.',
        points: 10
      },
      {
        id: '2',
        question: 'JavaScript is a case-sensitive language.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'JavaScript is indeed case-sensitive, meaning "myVar" and "myvar" are different variables.',
        points: 10
      },
      {
        id: '3',
        question: 'Which of the following is NOT a JavaScript data type?',
        type: 'multiple-choice',
        options: ['String', 'Boolean', 'Integer', 'Undefined'],
        correctAnswer: 2,
        explanation: 'JavaScript has Number type, not specifically Integer. All numbers are of type Number.',
        points: 15
      },
      {
        id: '4',
        question: 'What does "=== " operator do in JavaScript?',
        type: 'multiple-choice',
        options: ['Assignment', 'Equality check', 'Strict equality check', 'Not equal'],
        correctAnswer: 2,
        explanation: 'The "===" operator checks for strict equality, comparing both value and type.',
        points: 15
      },
      {
        id: '5',
        question: 'Functions in JavaScript can return values.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'JavaScript functions can return values using the return statement.',
        points: 10
      }
    ]
  },
  {
    id: '2',
    title: 'React Components & Props',
    description: 'Advanced quiz covering React components, props, state management, and lifecycle methods.',
    category: 'Frontend Development',
    difficulty: 'intermediate',
    timeLimit: 1200, // 20 minutes
    passingScore: 75,
    points: 150,
    createdBy: 'admin',
    createdAt: '2024-01-20',
    attempts: 189,
    averageScore: 82,
    isActive: true,
    questions: [
      {
        id: '6',
        question: 'What is JSX in React?',
        type: 'multiple-choice',
        options: ['A JavaScript extension', 'A CSS framework', 'A database query language', 'A testing library'],
        correctAnswer: 0,
        explanation: 'JSX is a JavaScript syntax extension that allows you to write HTML-like code in JavaScript.',
        points: 15
      },
      {
        id: '7',
        question: 'Props in React are mutable.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'Props are immutable in React. They cannot be changed by the component that receives them.',
        points: 20
      },
      {
        id: '8',
        question: 'Which hook is used for state management in functional components?',
        type: 'multiple-choice',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useState is the primary hook for managing state in functional components.',
        points: 20
      }
    ]
  },
  {
    id: '3',
    title: 'Database Design & SQL',
    description: 'Comprehensive quiz on database design principles, normalization, and SQL queries.',
    category: 'Backend Development',
    difficulty: 'advanced',
    timeLimit: 1800, // 30 minutes
    passingScore: 80,
    points: 200,
    createdBy: 'admin',
    createdAt: '2024-01-25',
    attempts: 156,
    averageScore: 75,
    isActive: true,
    questions: [
      {
        id: '9',
        question: 'What is the primary key in a database table?',
        type: 'multiple-choice',
        options: ['A unique identifier for each row', 'The first column in a table', 'A foreign key reference', 'An index on the table'],
        correctAnswer: 0,
        explanation: 'A primary key uniquely identifies each row in a database table.',
        points: 25
      },
      {
        id: '10',
        question: 'Normalization helps reduce data redundancy.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Database normalization is the process of organizing data to reduce redundancy and improve data integrity.',
        points: 25
      }
    ]
  },
  {
    id: '4',
    title: 'Web Security Fundamentals',
    description: 'Test your understanding of web security concepts, common vulnerabilities, and best practices.',
    category: 'Security',
    difficulty: 'intermediate',
    timeLimit: 1500, // 25 minutes
    passingScore: 75,
    points: 175,
    createdBy: 'admin',
    createdAt: '2024-02-01',
    attempts: 98,
    averageScore: 71,
    isActive: true,
    questions: [
      {
        id: '11',
        question: 'What does XSS stand for?',
        type: 'multiple-choice',
        options: ['Cross-Site Scripting', 'XML Security Standard', 'eXtended Security System', 'Cross-Server Synchronization'],
        correctAnswer: 0,
        explanation: 'XSS stands for Cross-Site Scripting, a common web security vulnerability.',
        points: 20
      },
      {
        id: '12',
        question: 'HTTPS encrypts data transmission between client and server.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'HTTPS uses SSL/TLS encryption to secure data transmission between client and server.',
        points: 20
      }
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Quiz',
    description: 'Complete your first quiz',
    icon: '🌟',
    criteria: 'Complete 1 quiz',
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
    description: 'Complete 10 quizzes',
    icon: '📚',
    criteria: 'Complete 10 quizzes',
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Programming Expert',
    description: 'Excel in programming quizzes',
    icon: '💻',
    criteria: 'Score 90%+ on 3 programming quizzes',
    rarity: 'legendary'
  },
  {
    id: '5',
    name: 'Speed Demon',
    description: 'Complete a quiz in record time',
    icon: '⚡',
    criteria: 'Complete quiz in under 50% of time limit',
    rarity: 'rare'
  },
  {
    id: '6',
    name: 'Perfectionist',
    description: 'Achieve perfect scores',
    icon: '💎',
    criteria: 'Score 100% on any quiz',
    rarity: 'epic'
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
      completedQuizzes: ['1', '2', '3'],
      joinedDate: '2024-01-15'
    },
    points: 2450,
    level: 8,
    badges: 12,
    quizzesCompleted: 15
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
      completedQuizzes: ['1', '2'],
      joinedDate: '2024-01-20'
    },
    points: 2180,
    level: 7,
    badges: 9,
    quizzesCompleted: 12
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
      completedQuizzes: ['1'],
      joinedDate: '2024-02-01'
    },
    points: 1950,
    level: 6,
    badges: 8,
    quizzesCompleted: 10
  },
  {
    rank: 4,
    user: {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: 1720,
      level: 5,
      badges: [],
      completedQuizzes: ['1', '4'],
      joinedDate: '2024-02-05'
    },
    points: 1720,
    level: 5,
    badges: 6,
    quizzesCompleted: 8
  },
  {
    rank: 5,
    user: {
      id: '5',
      name: 'Emma Brown',
      email: 'emma@example.com',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: 1580,
      level: 5,
      badges: [],
      completedQuizzes: ['1', '2'],
      joinedDate: '2024-02-10'
    },
    points: 1580,
    level: 5,
    badges: 5,
    quizzesCompleted: 7
  }
];

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: '1',
    quizId: '1',
    userId: '1',
    score: 85,
    answers: { '1': 0, '2': 0, '3': 2, '4': 2, '5': 0 },
    completedAt: '2024-02-15T10:30:00Z',
    timeSpent: 720
  }
];