const express = require('express');
const Todo = require('../../models/todo');
const router = express.Router();




router.get('/', (req, res) => {
  const userId = req.user._id;
  Todo.find({userId})
    .lean()
    .then(data => {
      const notFinished = data.filter(todo => todo.isDone === false)
      const todos = data.filter(todo => todo.isDone === true)
      res.render('index', { title: 'TodoList', todos, notFinished })
    })
});

module.exports = router;