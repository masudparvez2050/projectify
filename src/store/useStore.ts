import { create } from 'zustand';
import { Task, Category, Status } from '../types';
import { initialTasks, initialCategories } from '../data/initialData';

interface Store {
  tasks: Task[];
  filteredTasks: Task[];
  categories: Category[];
  darkMode: boolean;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, status: Status) => void;
  addCategory: (category: Category) => void;
  toggleDarkMode: () => void;
  filterTasks: (searchTerm: string) => void;
}

export const useStore = create<Store>((set) => ({
  tasks: initialTasks,
  filteredTasks: initialTasks,
  categories: initialCategories,
  darkMode: false,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
      filteredTasks: [...state.tasks, task],
    })),
  updateTask: (id, updates) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      return {
        tasks: updatedTasks,
        filteredTasks: updatedTasks,
      };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      return {
        tasks: updatedTasks,
        filteredTasks: updatedTasks,
      };
    }),
  moveTask: (taskId, status) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      return {
        tasks: updatedTasks,
        filteredTasks: updatedTasks,
      };
    }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  filterTasks: (searchTerm) =>
    set((state) => ({
      filteredTasks: state.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
}));