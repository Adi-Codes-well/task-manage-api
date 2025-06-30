import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "/api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await axios.get<Task[]>(API);
    setTasks(res.data);
  };

  const addTask = async (title: string, description: string) => {
    const res = await axios.post<Task>(API, { title, description });
    setTasks((prev) => [...prev, res.data]);
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API}/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const res = await axios.put(`${API}/${id}`, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-3xl font-bold mb-4">QuickTasks</h1>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      </div>
    </div>
  );
}

export default App;
