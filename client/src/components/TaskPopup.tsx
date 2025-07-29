/*
  Name: TaskPopup.tsx
  Description: Popup component to add or ed
*/
import React from "react";
import { useDispatch } from "react-redux";
import { addNewTask, closeToggle, updateTask } from "../store/taskSlice";
import { ZodError } from "zod";
import Button from "./Button";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { TaskSchema } from "../types/taskSchema";
import { InputField } from "./InputField";
import { MultiLineField } from "./MultiLineField";
import { DropDown } from "./DropDown";

function TaskPopup() {
  // create dispatch const, needs AppDispatch
  const dispatch = useDispatch<AppDispatch>();

  // get variables/states from the store
  const tasks = useSelector((state: any) => state.task.tasks);
  const statusOptions = useSelector((state: any) => state.task.statusOptions);
  const selectedTaskId = useSelector((state: any) => state.task.selectedTaskId);

  // Find the task if id is provided
  const task = selectedTaskId ? tasks.find((t: any) => String(t.id) === String(selectedTaskId)) : undefined;

  // creates states for the fields
  const [title, setTitle] = React.useState(task?.title || "");
  const [description, setDescription] = React.useState(task?.description || "");
  const [dueDate, setDueDate] = React.useState(task?.due_date || "");
  const [status, setStatus] = React.useState(task?.status_label || "1");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.due_date ? task.due_date.split("T")[0] : "" );
      setStatus(statusOptions.find((option: any) => option.label === task.status_label)?.id || 1);
    }
  }, [task, statusOptions]);

  /*
    Description: OnSubmit handle function 
    @param (React.FormEvent) e
  */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validating fields against zod type
    const result = TaskSchema.safeParse({
      title,
      description,
      due_date: dueDate,
      status
    });

    // was the safeParse successful?
    if (!result.success) {
      const zodError = result.error as ZodError;

      // updates field erros if validation failed for a field
      const fieldErrors: Record<string, string> = {};
      zodError.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      });

      // update state
      setErrors(fieldErrors);
      // return to stop dispatch
      return;
    }else{
      // reset any possible error messages
      setErrors({});
    }

    const taskData = result.data;

    // adding id and status label which are not fields in the form
    const taskPayload = {
      id: selectedTaskId ?? 0,
      ...taskData,
      status_label: status
    };

    // check if this is a new task if so then update, or if it's an existing task then update
    if (selectedTaskId === 0) {
      dispatch(addNewTask(taskPayload));
    } else {
      dispatch(updateTask(taskPayload));
    }
    // close the popup after the update to take user back to table
    dispatch(closeToggle());
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 shadow-md w-96">
        {/* Title for the card Edit or Add */}
        <h2 className="text-lg font-semibold mb-4">{selectedTaskId ? "Edit Task" : "Add New Task"}</h2>
        {/* start of the form for fields */}
        <form onSubmit={handleSubmit}>

          {/* Title Field, required, max length 50 */}
          <div className="mb-3">
            <InputField
              label="Title"
              value={title}
              onChange={setTitle}
              error_msg={errors.title}
              placeholder="Enter task title"
            />
          </div>

          {/* Description Field, optional, max length 255 */}
          <div className="mb-3">
            <MultiLineField
              label="Description"
              value={description}
              onChange={setDescription}
              error_msg={errors.description}
              placeholder="Enter task description"
            />
          </div>

          {/* Due Date Field, optional */}
          <div className="mb-3">
            <InputField
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              error_msg={errors.due_date}
              placeholder="Enter due date"
              type="date"
            />
          </div>


          {/* Status Field, optional */}
          <div className="mb-3">
            <DropDown 
              label="Status"
              options={statusOptions}
              value={status}
              onChange={setStatus}
              error_msg={errors.status}
            />
          </div>
          
          {/* Buttons for Add/Update or Cancel */}
          <div className="flex" style={{ float: 'right', gap: '8px' }}>
            <Button
              text={selectedTaskId ? "Update" : "Add"}
              color="#fff"
              bgColor="rgb(40, 167, 69)"
              style={{ marginRight: '8px' }}
            />
            <Button
              text="Cancel"
              color="#fff"
              bgColor="#c0c0c0"
              onClick={() => dispatch(closeToggle())}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default TaskPopup;