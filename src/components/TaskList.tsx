import React from "react";
import { ITask } from "@/interfaces/Task";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface ITaskListProps {
  taskList: ITask[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

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

const TaskList: React.FunctionComponent<ITaskListProps> = ({
  taskList,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((item) => (
          <div
            key={item.id}
            // className="bg-violet-950 flex m-auto items-center max-w-[400px] mb-1 border-solid border-2 border-violet-500/50 rounded-lg p-1 hover:border-violet-500"
            className={`flex m-auto items-center max-w-[400px] mb-1 text-white bg-${getColorClass(
              item.difficulty
            )} border-solid border-2 rounded-lg p-1 hover:border-violet-500`}
          >
            <div className="flex-1">
              <p className="text-lg">{item.title}</p>
              {/* <p className="text-base">Dificuldade: {item.difficulty}</p> */}
            </div>
            <div className="flex flex-row gap-2">
              <FaEdit
                className="cursor-pointer hover:text-violet-500"
                onClick={() => onEdit(item.id)}
              />
              <FaRegTrashAlt
                className="cursor-pointer hover:text-violet-500"
                onClick={() => onDelete(item.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuma tarefa cadastrada</p>
      )}
    </>
  );
};

export default TaskList;
