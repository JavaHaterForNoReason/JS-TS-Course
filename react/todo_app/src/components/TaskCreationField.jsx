import { useState, useEffect } from 'react'
import { TaskInputField } from './styles/TaskInputField'
import { Button as AddTaskButton } from './styles/Button'
import { TaskCreationFieldDiv } from './styles/TaskCreationFieldDiv'
// Icons
import { FaPlus } from 'react-icons/fa'
import { TaskContainer } from './TaskContainer'
import { keyEnterPress } from '../utils/keyEnterPress'

export const TaskCreationField = () => {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem('tasks')
    return localTasks ? JSON.parse(localTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleAddTaskButtonClick = () => {
    if (!newTask.trim()) return

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: tasks.length + 1,
        description: newTask,
        isEditing: false,
        isChecked: false,
      },
    ])
    setNewTask('')
  }

  return (
    <>
      <h1 className="title">Lista de Tarefas</h1>
      <TaskCreationFieldDiv>
        <TaskInputField
          onChange={handleTaskInputChange}
          onKeyDown={(e) => keyEnterPress(e, handleAddTaskButtonClick)}
          value={newTask}
        />
        <AddTaskButton type="submit" onClick={handleAddTaskButtonClick}>
          <FaPlus />
        </AddTaskButton>
      </TaskCreationFieldDiv>
      <TaskContainer tasks={tasks} setTasks={setTasks} />
    </>
  )
}
