/*
  Name: TaskTable.tsx
  Description: Table component to hold all taks
*/
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "./Button";
import { openToggle, setSelectedTaskId, deleteTask} from "../store/taskSlice";

function TaskTable() {
  // Get taks from store
  const tasks = useSelector((state: RootState) => state.task.tasks);
  // Create dispatch const, needs AppDispatch
  const dispatch = useDispatch<AppDispatch>();

  // create columsn array
  // field: item from data 
  // headerName: Name for the column header
  // flex: number of spaces available the column should use (ratio)
  // resizable: can the user change the width of the column
  // renderCell: Required for custom "component style" return
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, resizable: false },
    { field: "description", headerName: "Description", flex: 2, resizable: false },
    { field: "due_date", headerName: "Due Date", flex: 1, resizable: false },
    { field: "status_label", headerName: "Status", flex: 1, resizable: false },
    { field: "actions", headerName: "Actions", flex: 1, resizable: false, renderCell: (params) => (
        <>
          <Button 
            style={{ marginRight: '8px' }}
            text="Edit"
            color="#fff"
            bgColor="#007bff"
            onClick={() => {
              console.log("My ID is,.", params.row.id);
              dispatch(setSelectedTaskId(params.row.id));
              dispatch(openToggle());
            }}
          />
          <Button 
            style={{ marginRight: '8px' }}
            text="Delete"
            color="#fff"
            bgColor="#dc3545"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                dispatch(deleteTask(params.row.id));
              }
            }}
          />
        </>
      )
    }
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        disableColumnResize
      />
    </div>
  );
}

export default TaskTable;
