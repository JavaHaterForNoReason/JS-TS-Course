import { TaskField } from './styles/TaskField'
import { TaskContainerDiv } from './styles/TaskContainerDiv'
import { FaTrash, FaPen, FaCheck } from 'react-icons/fa'
import {
  Button as EditButton,
  Button as DeleteButton,
  Button as CheckButton,
} from './styles/Button'
import { useState, useRef, useEffect } from 'react'
import { TaskInputField } from './styles/TaskInputField'
import { keyEnterPress } from '../utils/keyEnterPress'

export const TaskContainer = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef, tasks])

  const handleDeleteTaskButtonClick = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTaskButtonClick = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          setEditingTask(task.description)
          return { ...task, isEditing: true }
        }
        return task
      }),
    )
  }

  const handleEditInputChange = (e) => {
    setEditingTask(e.target.value)
  }

  const handleCheckEditingTaskButton = (taskId) => {
    if (!editingTask) return
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, description: editingTask, isEditing: false }
        }
        return task
      }),
    )
  }

  const handleCheckChange = (taskId) => {
    setTasks(
      tasks.map((task) => {
        return task.id === taskId
          ? { ...task, isChecked: !task.isChecked }
          : task
      }),
    )
  }

  const sortByCompletion = (a, b) => {
    if (a.isChecked && !b.isChecked) {
      return 1
    } else if (!a.isChecked && b.isChecked) {
      return -1
    }
    return 0
  }

  const sortedTasks = [...tasks].sort(sortByCompletion)

  return (
    <TaskContainerDiv>
      {sortedTasks.map((task) => (
        <TaskField key={task.id}>
          {task.isEditing ? (
            <>
              <TaskInputField
                type="text"
                value={editingTask}
                style={{ border: 'none' }}
                onChange={handleEditInputChange}
                onKeyDown={(e) =>
                  keyEnterPress(e, () => handleCheckEditingTaskButton(task.id))
                }
                ref={inputRef}
              />
              <CheckButton
                onClick={() => handleCheckEditingTaskButton(task.id)}
                $btnColor="#0ed004"
              >
                <FaCheck />
              </CheckButton>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleCheckChange(task.id)}
              />
              <p>{task.description}</p>
              <div>
                <EditButton onClick={() => handleEditTaskButtonClick(task.id)}>
                  <FaPen />
                </EditButton>
                <DeleteButton
                  onClick={() => handleDeleteTaskButtonClick(task.id)}
                  $btnColor="#f92a2a"
                >
                  <FaTrash />
                </DeleteButton>
              </div>
            </>
          )}
        </TaskField>
      ))}
    </TaskContainerDiv>
  )
}
