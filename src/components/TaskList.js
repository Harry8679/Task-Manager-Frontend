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

    useEffect(() => {
        const completTasks = tasks.filter((task) => (
            task.completed === true
        ));
        setCompletedTasks(completTasks);
    }, [tasks]);

    const getSingleTask = async (task) => {
        setFormData({ name: task.name, completed: false });
        setTaskID(task._id);
        setIsEditing(true);
    }

    const updateTask = async (e) => {
        e.preventDefault();
        if (name === '') {
            return toast.error('Input field cannot be empty');
        }
        try {
            await axios.put(`${URL}/api/v1/tasks/${taskID}`, formData);
            setFormData({ ...formData, name: '' });
            setIsEditing(false);
            getTasks();
        } catch (err) {
            toast.error(err.message);
        };
    };

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`${URL}/api/v1/tasks/${task._id}`, newFormData);
            getTasks();
        } catch (err) {
            toast.error(err.message);
        }
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
            getTasks();
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
        {tasks.length > 0 && (
            <div className="--flex-between --pub">
                <p><b>Total Tasks :</b> {tasks.length}</p>
                <p><b>Completed Tasks :</b> {completedTasks.length}</p>
            </div>
        )}
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
                        return <Task key={task._id} task={task} index={index} deleteTask={() => deleteTask(task._id)} getSingleTask={getSingleTask} setToComplete={setToComplete} />
                    })}
                </>
            )
        }
    </div>
  )
}

export default TaskList;
