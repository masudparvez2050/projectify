import { motion } from "framer-motion";
import { Trash2, Edit, Calendar, AlertCircle } from "lucide-react";
import { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { useStore } from "../store/useStore";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const { categories } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 dark:text-red-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "low":
        return "text-green-500 dark:text-green-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const category = categories.find((cat) => cat.id === task.category);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit(task);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 border border-[#4645453b] p-4 rounded-lg shadow-md mb-4 relative group cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Edit
              size={16}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-900/50 transition-colors"
          >
            <Trash2
              size={16}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            />
          </button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        {task.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span
            className={`flex items-center ${getPriorityColor(task.priority)}`}
          >
            <AlertCircle size={14} className="mr-1" />
            {task.priority}
          </span>
        </div>
        {task.dueDate && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            {format(new Date(task.dueDate), "MMM d, yyyy")}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        {category && (
          <span
            className="inline-block px-2 py-1 text-xs rounded-full text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        )}
      </div>
    </motion.div>
  );
}
