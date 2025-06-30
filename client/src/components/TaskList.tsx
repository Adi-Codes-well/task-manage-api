import React from "react";
import { Task } from "../types/Task";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white shadow p-4 rounded flex justify-between items-center"
        >
          <div>
            <h2 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h2>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task._id)}
              title="Mark Complete"
            />
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Task"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
