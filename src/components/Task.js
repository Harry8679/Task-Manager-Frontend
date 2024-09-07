import React, { useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const Task = () => {
  return (
    <div className="task">
        <p><b>1.</b> Task 1</p>
        <div className="task-icons">
            <FaRegCircleCheck color='green' />
            <RiEdit2Fill color='purple' />
            <FaRegTrashAlt color='red' />
        </div>
    </div>
  )
}

export default Task;
