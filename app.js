const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Array to store todos
let openTodos = [];
let completedTodos = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { openTodos, completedTodos });
});

app.post('/add-todo', (req, res) => {
  const todoText = req.body.todoText.trim();
  if (todoText) {
    openTodos.push(todoText);
  }
  res.redirect('/');
});

app.post('/complete-todo', (req, res) => {
  const todoIndex = parseInt(req.body.todoIndex);
  if (todoIndex >= 0 && todoIndex < openTodos.length) {
    const completedTodo = openTodos.splice(todoIndex, 1)[0];
    const completionTime = new Date().toLocaleString();
    completedTodos.push(`${completedTodo} (completed on ${completionTime})`);
  }
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});