import { Task } from "../interfaces/Task";

export const tasksLow: Task[] = [
    {
        task_Id: 1,
        title: "Do Something",
        description: "do this now",
        priority: "low",
        user_id: 1,
    },

]

export const tasksMedium: Task[] = [
    {
        task_Id: 2,
        title: "Do Something Else",
        description: "also do this now",
        priority: "medium",
        user_id: 1,
    },
]

export const tasksHigh: Task[] = [
    {
        task_Id: 3,
        title: "High Task",
        description: "important task",
        priority: "high",
        user_id: 1,
    },
]

export const tasksUrgent: Task[] = [
    {
        task_Id: 4,
        title: "Urgent Task",
        description: "Hurry, do this task",
        priority: "urgent",
        user_id: 1,
    },
]