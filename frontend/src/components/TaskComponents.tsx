import React, { useState } from "react";
import { Card, Box, CircularProgress, Alert } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task} from "../types/tasks";

const API_URL = "http://localhost:5000";

const TaskComponents = () => {
  const queryClient = useQueryClient();

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const { data: tasks = [], isError, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      axios.get(`${API_URL}/api/tasks`, getAuthHeaders()).then((res) => res.data || []),
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">) =>
      axios.post(`${API_URL}/api/tasks`, data, getAuthHeaders()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditTask(null);
      setErrorMessage(null);
    },
    onError: () => setErrorMessage("Failed to create task"),
  });

  const updateTaskMutation = useMutation({
    mutationFn: (task: Task) =>
      axios.put(`${API_URL}/api/tasks/${task.id}`, task, getAuthHeaders()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditTask(null);
      setErrorMessage(null);
    },
    onError: () => setErrorMessage("Failed to update task"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${API_URL}/api/tasks/${id}`, getAuthHeaders()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setErrorMessage(null);
    },
    onError: () => setErrorMessage("Failed to delete task"),
  });

  const toggleTaskComplete = (task: Task) => {
    const updatedStatus = task.status === "completed" ? "pending" : "completed";
    updateTaskMutation.mutate({
      ...task,
      status: updatedStatus,
    });
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to fetch tasks
      </Alert>
    );

  const handleSave = (taskData: any) => {
    if ("id" in taskData) {
      updateTaskMutation.mutate(taskData);
    } else {
      createTaskMutation.mutate(taskData);
    }
  };

  const handleCancel = () => {
    setEditTask(null);
    setErrorMessage(null);
  };

  return (
    <Card
      sx={{
        margin: "3vh auto",
        padding: "1.5rem",
        borderRadius: "1rem",
        maxWidth: 1500,
        height: "75vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minWidth: 300,
          maxHeight: "100%",
          borderRight: { md: "1px solid #ddd" },
          pr: { md: 3 },
          mb: { xs: 3, md: 0 },
        }}
      >
       <TaskForm
  editTask={editTask}
  onSave={handleSave}
  onCancel={handleCancel}
  errorMessage={errorMessage}
  clearError={() => setErrorMessage(null)}
  successMessage={successMessage}           // add this
  clearSuccess={() => setSuccessMessage(null)} // and this
/>

      </Box>

      <Box
        sx={{
          flex: 2,
          overflowY: "auto",
          maxHeight: "100%",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TaskList
          tasks={tasks as Task[]}
          onEdit={setEditTask}
          onDelete={(id) => deleteTaskMutation.mutate(id)}
          onToggleComplete={toggleTaskComplete}
          errorMessage={errorMessage}
        />
      </Box>
    </Card>
  );
};

export default TaskComponents;
