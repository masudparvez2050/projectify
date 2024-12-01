import { Task, Category } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Frontend',
    color: '#3B82F6',
  },
  {
    id: 'cat-2',
    name: 'Backend',
    color: '#10B981',
  },
  {
    id: 'cat-3',
    name: 'Design',
    color: '#8B5CF6',
  },
  {
    id: 'cat-4',
    name: 'DevOps',
    color: '#F59E0B',
  }
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement User Authentication',
    description: 'Add JWT-based authentication system with login/register functionality',
    category: 'cat-2',
    status: 'todo',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Design Landing Page',
    description: 'Create a modern and responsive landing page design with animations',
    category: 'cat-3',
    status: 'progress',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    category: 'cat-4',
    status: 'done',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
  },
  {
    id: 'task-4',
    title: 'Optimize API Performance',
    description: 'Implement caching and optimize database queries for better performance',
    category: 'cat-2',
    status: 'revise',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
  },
  {
    id: 'task-5',
    title: 'Implement Dark Mode',
    description: 'Add system-wide dark mode support with theme switching',
    category: 'cat-1',
    status: 'progress',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
  },
  {
    id: 'task-6',
    title: 'Add Analytics Dashboard',
    description: 'Create a dashboard with charts and metrics for user analytics',
    category: 'cat-1',
    status: 'todo',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
  }
];