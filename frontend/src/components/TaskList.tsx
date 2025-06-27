import React, { useMemo, useState } from "react";
import {
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import TaskItem from "./TaskItem";
import { Task, TaskStatus } from "../types/tasks";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (task: Task) => void;
  errorMessage: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  errorMessage,
}) => {
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "normal" | "high">("all");

  // Filtered tasks based on filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filterStatus !== "all" && task.status !== filterStatus) return false;
      if (filterPriority !== "all" && task.priority !== filterPriority) return false;
      return true;
    });
  }, [tasks, filterStatus, filterPriority]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={1}>
        Task List
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel id="filter-status-label">Filter by Status</InputLabel>
          <Select
            labelId="filter-status-label"
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "all")}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel id="filter-priority-label">Filter by Priority</InputLabel>
          <Select
            labelId="filter-priority-label"
            label="Filter by Priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as "all" | "low" | "normal" | "high")}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredTasks.length === 0 && (
        <Typography sx={{ mt: 2, fontStyle: "italic" }}>
          No tasks found matching the filter criteria.
        </Typography>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Stack spacing={1} sx={{  flexGrow: 1 }}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onToggleComplete={() => onToggleComplete(task)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;
