"use client";

import React, { useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import { ITask } from "@/interfaces/Task";

export default function Home() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskEdit, setTaskEdit] = useState<ITask[]>([]);
  const [editing, setEditing] = useState(false);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const editTask = (id: number) => {
    const editing = taskList.filter((task) => task.id === id);

    setTaskEdit(editing);
    setEditing(true);
  };

  return (
    <div>
      <Header />
      <main className="min-h-[80vh] text-center p-4">
        <div>
          <h2 className="font-bold text-3xl mb-3">Qual a Tarefa?</h2>
          <TaskForm
            btnText={editing ? "Editar Tarefa" : "Adicionar Tarefa"}
            taskList={taskList}
            setTaskList={setTaskList}
            taskEdit={taskEdit}
            editing={editing}
            setEditing={setEditing}
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl mt-3 mb-3">Suas tarefas:</h2>
          <TaskList
            taskList={taskList}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
