import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AddTaskPage: React.FC = () => {
  const [newTask, setNewTask] = React.useState<string>("");
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTaskObj]));
    setNewTask("");
    setShowAlert(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Task</h2>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
          <form onSubmit={addTask} className="space-y-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task..."
              className="w-full p-2 border rounded-lg"
            />
            <Button disabled={!newTask} type="submit" className="w-full">
              Add Task
            </Button>
          </form>
          {showAlert && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              Task added successfully!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTaskPage;
