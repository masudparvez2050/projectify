import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TaskColumn } from "./components/TaskColumn";
import { useStore } from "./store/useStore";
import { EditTaskModal } from "./components/EditTaskModal";
import { useState } from "react";
import { Task } from "./types";

function App() {
  const { filteredTasks, moveTask, deleteTask, updateTask, darkMode } =
    useStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as any);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="pl-[240px]">
          <Header />
          <main className="p-6">
            <DndContext onDragEnd={handleDragEnd}>
              <div className="flex space-x-6 overflow-x-auto pb-4">
                <TaskColumn
                  status="todo"
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
                <TaskColumn
                  status="progress"
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
                <TaskColumn
                  status="done"
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
                <TaskColumn
                  status="revise"
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              </div>
            </DndContext>
          </main>
        </div>
        <EditTaskModal
          task={editingTask}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
}

export default App;
