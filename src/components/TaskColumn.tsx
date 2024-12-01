import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, Status } from '../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskColumn({
  status,
  tasks,
  onDeleteTask,
  onEditTask,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });
  const filteredTasks = tasks.filter((task) => task.status === status);

  const getColumnTitle = (status: Status) => {
    switch (status) {
      case 'todo':
        return 'To-Do';
      case 'progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      case 'revise':
        return 'Revise';
      default:
        return '';
    }
  };

  const getColumnColor = (status: Status) => {
    switch (status) {
      case 'todo':
        return 'bg-purple-500';
      case 'progress':
        return 'bg-yellow-500';
      case 'done':
        return 'bg-green-500';
      case 'revise':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
  };

  const handleEditTask = (task: Task) => {
    onEditTask(task);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-w-[300px]"
    >
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${getColumnColor(status)} mr-2`} />
        <h2 className="text-lg font-semibold dark:text-white">
          {getColumnTitle(status)}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({filteredTasks.length})
          </span>
        </h2>
      </div>
      <SortableContext
        items={filteredTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </SortableContext>
    </div>
  );
}