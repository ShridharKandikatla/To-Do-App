import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Plus, Check, X, Trash2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTask.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Todo List</span>
            <Badge variant="secondary">
              {tasks.filter((t) => !t.completed).length} remaining
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={handleInputChange}
              placeholder="Add a new task..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </form>

          {showAlert && (
            <Alert className="mb-4 bg-red-100 text-red-800">
              Please enter a task
            </Alert>
          )}

          <div className="space-y-2">
            {tasks.map((task: Task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`p-1 rounded-full border ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {task.completed ? <X size={16} /> : <Check size={16} />}
                  </button>
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
