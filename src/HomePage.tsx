import { PlusCircle, ListTodo } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// HomePage Component
const HomePage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/add">
              <Button className="w-full h-32 text-lg" variant="outline">
                <div className="flex flex-col items-center gap-2">
                  <PlusCircle size={32} />
                  <span>Add New Task</span>
                </div>
              </Button>
            </Link>
            <Link to="/manage">
              <Button className="w-full h-32 text-lg" variant="outline">
                <div className="flex flex-col items-center gap-2">
                  <ListTodo size={32} />
                  <span>Manage Tasks</span>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
