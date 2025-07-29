/*
  Name: App.tsx
  Description: Default App file
*/
import React from 'react';
import TaskTable from './components/TaskTable';
import TaskPopup from './components/TaskPopup'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, openToggle, setSelectedTaskId } from './store/taskSlice';
import Button from './components/Button';
import { AppDispatch } from './store';

function App() {
  // load state from slice
  const popupVisible = useSelector((state: any) => state.task.popupVisible);
  // create dispatch const, needs to have AppDispacth type
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    // When dispatch has loaded, fetch data
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '18px', width: '100%', height: "100%", margin: '10px', padding: '24px', boxSizing: 'border-box' }}>
        {/* Structure for table and popup/modal will go here */}
        <h1 style={{fontSize: '24px', textAlign: 'center'}}>My Task Manager</h1>
        {/* Button for addint a new task */}
        <Button 
          onClick={() => { dispatch(setSelectedTaskId(0)); dispatch(openToggle()); }}
          style={{ marginBottom: '10px' }}
          color='#fff'
          bgColor='#007bff'
          text="Add Task"
        />
        {/* Load table with tasks */}
        <TaskTable />
      </div>
      {/* Add popup with state for when component should be visible */}
      {popupVisible && <TaskPopup />}
    </div>
  );
}

export default App;
