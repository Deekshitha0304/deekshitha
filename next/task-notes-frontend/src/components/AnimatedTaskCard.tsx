"use client"

import { motion } from "framer-motion"
import TaskCard from "./TaskCard"

interface AnimatedTaskCardProps {
  index: number
  taskId?: string
  title: string
  description: string
  year: number
  completed: boolean
  deleteTask: (title: string) => void
  toggleCompletion: (title: string) => void
}

export default function AnimatedTaskCard({
  index,
  taskId,
  title,
  description,
  year,
  completed,
  deleteTask,
  toggleCompletion
}: AnimatedTaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.25,
        delay: Math.min(index * 0.05, 0.4),
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.01 }}
    >
      <TaskCard
        taskId={taskId}
        title={title}
        description={description}
        year={year}
        completed={completed}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </motion.div>
  )
}
