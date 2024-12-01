import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { tasks, filterTasks } = useStore();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    filterTasks(searchTerm);
  }, [searchTerm, filterTasks]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <AnimatePresence>
        {showResults && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              {tasks
                .filter(
                  (task) =>
                    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                  >
                    <h4 className="font-medium dark:text-white">{task.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description.substring(0, 50)}...
                    </p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}