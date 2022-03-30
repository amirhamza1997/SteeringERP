import { iComment } from "."
import axios from "axios"

export const getAllTaskComments = async (
  hasUnMounted: Boolean,
  taskId: string,
  setAllComments: React.Dispatch<React.SetStateAction<iComment[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/task-comment/task/${taskId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setAllComments(res.data.data)
      else {
        setSnackbar({ open: true, message: "Failed to fetch comments" })
      }
    }
  } catch (error) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch comments" })
    }
  }
}

export const postComment = async (
  body: object,
  allComments: Array<iComment>,
  setAllComments: React.Dispatch<React.SetStateAction<iComment[]>>,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/task-comment`, body)
    if (res.data.statusCode === 200) {
      setAllComments([...allComments, res.data.data[0]])
    }
    else {
      showSnackbar("Failed to post comment")
    }
  } catch (error) {
    showSnackbar("Failed to post comment")
  }
}

export const addTimeLog = async (
  body: object,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/timesheet`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Time log added")
      setOpen(false)
    }
    else {
      showSnackbar("Failed to add Time log")
    }
  } catch (error) {
    showSnackbar("Failed to add Time log")
  }
}

export const updateTaskStatus = async (taskId: string, body: object, showSnackbar: Function) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/task/${taskId}`, body)
    if (res.data.statusCode === 200) {
      return res.data
    }
    else {
      showSnackbar("Failed to update task status")
    }
  } catch (error: any) {
    showSnackbar("Failed to update task status")
  }
}