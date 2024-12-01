export type Status = 'todo' | 'progress' | 'done' | 'revise';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: Status;
  createdAt: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}