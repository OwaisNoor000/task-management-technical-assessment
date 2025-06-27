import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { Task, TaskStatus, TaskPriority } from "../types/tasks";

interface TaskFormProps {
  editTask: Task | null;
  onSave: (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId"> | Task
  ) => void;
  onCancel: () => void;
  errorMessage: string | null;
  clearError: () => void;
  successMessage: string | null;
  clearSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  editTask,
  onSave,
  onCancel,
  errorMessage,
  clearError,
  successMessage,
  clearSuccess,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState<TaskStatus>("pending");
  const [newPriority, setNewPriority] = useState<TaskPriority>("normal");


  useEffect(() => {
    if (editTask) {
      setNewTitle(editTask.title);
      setNewDescription(editTask.description || "");
      setNewStatus(editTask.status);
      setNewPriority(editTask.priority as TaskPriority);
    } else {
      setNewTitle("");
      setNewDescription("");
      setNewStatus("pending");
      setNewPriority("normal");
    }
    clearError();
    clearSuccess();
  }, [editTask, clearError, clearSuccess]);

  const handleSave = () => {
    if (editTask) {
      onSave({
        ...editTask,
        title: newTitle,
        description: newDescription,
        status: newStatus,
        priority: newPriority,
      });
    } else {
      onSave({
        title: newTitle,
        description: newDescription,
        status: newStatus,
        priority: newPriority,
      });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        {editTask ? "Edit Task" : "Add New Task"}
      </Typography>

      <TextField
        label="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        fullWidth
      />

      <TextField
        label="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />

      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          label="Status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          label="Priority"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {editTask ? (
          <>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!newTitle.trim()}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!newTitle.trim()}
          >
            Add Task
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default TaskForm;
