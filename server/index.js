/*
  Name: Index.js
  Description: node start file. Currently holds all endpoints and db connection
*/

// Required modules
const express = require('express');
const pool = require('./db'); // Import the database pool
const cors = require('cors');

// Creating app const
const app = express();
app.use(cors());
app.use(express.json());

// Prefix for all endpoints
const prefix = "/api/v1";
const port = process.env.PORT || 3001;

/*
  Description: Gets all tasks from db view
  Method: GET
*/
app.get(`${prefix}/tasks`, (req, res) => {
  pool.query('SELECT * FROM vw_tasks')
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});


/*
  Description: adds a new task to the table
  Method: POST
*/
app.post(`${prefix}/task`, (req, res) => {
  console.log("Received task data:", req.body);
  pool.query(`INSERT INTO tasks (title, description, due_date, status_id) VALUES ("${req.body.title}", "${req.body.description}", ${req.body.due_date ? `"${req.body.due_date} 23:59:59"` : null}, ${req.body.status_label})`)
    .then(() => {
      res.status(201).json({ message: 'Task created successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create task' });
    });
});


/*
  Description: Updates a task for a given id
  Method: PUT
*/
app.put(`${prefix}/task/:id`, (req, res) => {
  pool.query(`UPDATE tasks SET title = "${req.body.title}", description = "${req.body.description}", due_date = ${req.body.due_date ? `"${req.body.due_date} 23:59:59"` : null}, status_id = ${req.body.status_label} WHERE id = ${req.params.id}`)
    .then(() => {
      res.status(200).json({ message: 'Task updated successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update task' });
    });
});


/*
  Description: Deletes a task for a given id
  Method: DELETE
*/
app.delete(`${prefix}/task/:id`, (req, res) => {
  pool.query(`DELETE FROM tasks WHERE id = ${req.params.id}`)
    .then(() => {
      res.status(200).json({ message: 'Task deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete task' });
    });
});


/*
  Description: Gets all status options from db table
  Method: GET
*/
app.get(`${prefix}/status`, (req, res) => {
  pool.query('SELECT * FROM status')
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch status' });
    });
});

// Start service
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});