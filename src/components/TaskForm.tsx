"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { ITask } from "@/interfaces/Task";

interface ITaskFormProps {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  taskEdit: ITask[];
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
}
const TaskForm: React.FunctionComponent<ITaskFormProps> = ({
  btnText,
  taskList,
  setTaskList,
  taskEdit,
  setEditing,
  editing,
}) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  const editingTask = () => {
    if (setEditing !== undefined) {
      setEditing(false);
    }

    taskList.map((task) => {
      if (task.id === id) {
        task.title = title;
        task.difficulty = difficulty;
      }
    });

    setTitle("");
    setDifficulty(0);
  };

  const addTaskHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (btnText === "Editar Tarefa") {
      editingTask();
      return;
    }
    const id = Math.floor(Math.random() * 100000);

    const newTask: ITask = {
      id,
      title,
      difficulty,
    };

    setTaskList!([...taskList, newTask]);

    setTitle("");
    setDifficulty(0);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  const getColorClass = (difficulty: number) => {
    const colorRange: Record<number, string> = {
      0: "blue-500",
      1: "green-500",
      2: "yellow-500",
      3: "orange-500",
      4: "red-500",
      5: "violet-950",
    };
    return colorRange[difficulty];
  };

  useEffect(() => {
    if (editing) {
      setId(taskEdit[0].id);
      setTitle(taskEdit[0].title);
      setDifficulty(taskEdit[0].difficulty);
    }
  }, [editing]);

  return (
    <form
      onSubmit={addTaskHandler}
      className="flex flex-col max-w-[400px] m-auto bg-"
    >
      <div className="flex flex-col text-left w-full">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          className="bg-white mt-1 px-3 py-2 w-full border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          onChange={changeHandler}
          value={title}
        />
      </div>
      <div className="flex flex-col text-left mt-4 mb-4">
        <label htmlFor="difficulty">
          Dificuldade:
          <span className="ml-1">{difficulty}</span>
        </label>
        <input
          type="range"
          min={0}
          max={5}
          name="difficulty"
          className={`accent-${getColorClass(difficulty)} mt-1 `}
          onChange={changeHandler}
          value={difficulty}
        />
      </div>
      <input
        type="submit"
        value={btnText}
        className="bg-violet-500 text-white font-bold uppercase mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm cursor-pointer hover:bg-violet-600  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
      />
    </form>
  );
};

export default TaskForm;
