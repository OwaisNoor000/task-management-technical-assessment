import React from "react";
import {
  Card,
  Typography,
  Box,
  Checkbox,
  Stack,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Delete} from "@mui/icons-material";
import { Task } from "../types/tasks";

interface WithAuthProps {
  task: Task;
}

interface Props {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: number | string) => void;
  onEdit: (task: Task) => void;
  
}

const statusColors: Record<Task["status"], string> = {
  pending: "#f57c00",      
  "in-progress": "#0288d1",
  completed: "#43a047",   
};

const priorityColors: Record<Task["priority"], string> = {
  low: "#aed581",     
  normal: "#64b5f6",   
  high: "#e57373",     
};

const TaskItem: React.FC<Props> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const handleToggle = () => {
    onToggleComplete(task);
  };

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        boxShadow: 1,
        backgroundColor: task.status === "completed" ? "#f0f4f8" : "white",
      }}
      elevation={3}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
        <Checkbox
          checked={task.status === "completed" || task.isCompleted}
          onChange={handleToggle}
          sx={{
            color: "#e66465",
            "&.Mui-checked": { color: "#e66465" },
          }}
          inputProps={{ "aria-label": `Mark task "${task.title}" as completed` }}
        />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              textDecoration:
                task.status === "completed" || task.isCompleted
                  ? "line-through"
                  : "none",
              color:
                task.status === "completed" || task.isCompleted
                  ? "#a9a9a9"
                  : "inherit",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={task.title}
          >
            {task.title}
          </Typography>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={task.description}
            >
              {task.description}
            </Typography>
          )}
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mt: { xs: 1, sm: 0 } }}
      >
        <Tooltip title={`Status: ${task.status}`}>
          <Chip
            label={task.status}
            size="small"
            sx={{
              backgroundColor: statusColors[task.status],
              color: "white",
              textTransform: "capitalize",
            }}
          />
        </Tooltip>

        <Tooltip title={`Priority: ${task.priority}`}>
          <Chip
            label={task.priority}
            size="small"
            sx={{
              backgroundColor:
                priorityColors[task.priority] || "#bdbdbd", 
              color: "white",
              textTransform: "capitalize",
            }}
          />
        </Tooltip>

        <IconButton
          aria-label="edit task"
          color="primary"
          onClick={() => onEdit(task)}
        >
          <Edit />
        </IconButton>

        <IconButton
          aria-label="delete task"
          color="error"
          onClick={() => onDelete(task.id)}
          
        >
          <Delete />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default TaskItem;
