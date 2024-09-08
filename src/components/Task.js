import React from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <div className={task.completed ? "task completed": "task"}>
        <p><b>{index + 1}.</b> {task.name}</p>
        <div className="task-icons">
            <FaRegCircleCheck color='green' onClick={() => setToComplete(task)} />
            <RiEdit2Fill color='purple' onClick={() => getSingleTask(task)} />
            <FaRegTrashAlt color='red' onClick={deleteTask} />
        </div>
    </div>
  )
}

export default Task;
