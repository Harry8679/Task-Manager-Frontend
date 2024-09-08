import React from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const Task = ({ task, index, deleteTask, getSingleTask }) => {
  return (
    <div className="task">
        <p><b>{index + 1}.</b> {task.name}</p>
        <div className="task-icons">
            <FaRegCircleCheck color='green' />
            <RiEdit2Fill color='purple' onClick={() => getSingleTask(task)} />
            <FaRegTrashAlt color='red' onClick={deleteTask} />
        </div>
    </div>
  )
}

export default Task;
