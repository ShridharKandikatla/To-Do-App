import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "./components/ui/badge";

// Types
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const ManageTasksPage: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Tasks</h2>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500">
                No tasks yet. Add some tasks to get started!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5"
                    />
                    <span>{task.text}</span>
                    <Badge className="bg-gray-100 hover:bg-gray-200">
                      {task.completed ? (
                        <span className="text-green-500">Completed</span>
                      ) : (
                        <span className="text-red-500">Pending</span>
                      )}
                    </Badge>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTasksPage;
