import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from '../assets/loader.gif';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [taskID, setTaskID] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        completed: false
      });
    
      const { name } = formData;
    
      const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/v1/tasks`);
            console.log(data);
            setTasks(data);
            setIsLoading(false);
        } catch (err) {
            toast.error(err.message);
            console.log(err);
            setIsLoading(false);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/v1/tasks/${id}`);
            getTasks();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const getSingleTask = async (task) => {
        setFormData({ name: task.name, completed: false });
        setTaskID(task._id);
        setIsEditing(true);
    }

    const updateTask = async () => {
        alert('Hello');
    };

    useEffect(() => {
        getTasks();
    }, []);

    const createTask = async (e) => {
        e.preventDefault();
        if (name === '') {
            return toast.error('Input field cannot be empty');
        }
        console.log(formData);
        try {
            await axios.post(`${URL}/api/v1/tasks`, formData);
            toast.success('Task created successfully');
            setFormData({ ...formData, name: '' });
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
        <div className="--flex-between --pub">
            <p><b>Total Tasks :</b> 0</p>
            <p><b>Completed Tasks :</b> 0</p>
        </div>
        <hr />
        {
            isLoading && (
                <div className='--flex-center'>
                    <img src={loadingImg} alt="Loading" />
                </div>
            )
        }
        {
            !isLoading && tasks.length === 0 ? (
                <p className="--py">No task added. Please add a task</p>
            ) : (
                <>
                    {tasks.map((task, index) => {
                        return <Task key={task._id} task={task} index={index} deleteTask={() => deleteTask(task._id)} getSingleTask={getSingleTask} />
                    })}
                </>
            )
        }
    </div>
  )
}

export default TaskList;
