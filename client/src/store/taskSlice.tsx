/*
  Name: taskSlice.tsx
  Description: Slice for data related to tasks
*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const myEndpoint = process.env.REACT_APP_API_URL;

// Creating type for tasks
type Task = {
  id: number;
  title: string;
  description?: string;
  due_date?: string | null;
  date_added?: string;
  status_label: string;
  selectedTaskId?: number | null;
};

// creating status type for the status options
type Status = {
  id: number;
  label: string;
}

// Creating type for the task slice intial values/states
interface TaskStates {
  tasks: Task[];
  popupVisible: boolean;
  selectedTaskId?: number | null;
  statusOptions: Status[];
}

// Setting up inital states for store values
const initialState: TaskStates = {
  tasks: [],
  popupVisible: false,
  selectedTaskId: 0,
  statusOptions: [
    {id: 1, label:"Pending"},
    {id: 2, label:"In Progress"},
    {id: 3, label:"Complete"}
  ]
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // set the value of tasks from API response
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    // adds a new task to the task array
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // sttae for setting the popup to be visible
    openToggle: (state) => {
      state.popupVisible = true;
    },
    // state for setting the popup to not be visible
    closeToggle: (state) => {
      state.popupVisible = false;
    },
    // variable for the selected task so editting
    setSelectedTaskId: (state, action: PayloadAction<number | null>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

/*
  Description: fetch to GET all tasks forom endpoint
*/
export const fetchTasks = () => async (dispatch: any) => {
  try {
    console.log("Fetching tasks from API...");
    const response = await fetch(`${myEndpoint}/tasks`); 
    const data = await response.json();
    dispatch(setTasks(data));
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};

/*
  Description: fetch to DELETE a task for a given task id
  @param (number) id
*/
export const deleteTask = (id: number) => async (dispatch: any) => {
  try {
    const response = await fetch(`${myEndpoint}/task/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      dispatch(fetchTasks());
    } 
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

/*
  Description: fetch to update a task for a given id
  @param (number) id
*/
export const updateTask = (task: Task) => async (dispatch: any) => {
  try {
    const response = await fetch(`${myEndpoint}/task/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      dispatch(fetchTasks());
    } 
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

/*
  Description: fetch to add a new task
  @param (Task) task
*/
export const addNewTask = (task: Task) => async (dispatch: any) => {
  try {
    const response = await fetch(`${myEndpoint}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      dispatch(fetchTasks());
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}
// Export reducers
export const { setTasks, addTask, openToggle, closeToggle, setSelectedTaskId} = taskSlice.actions;
export default taskSlice.reducer;
