const express = require('express');
const router = express.Router();
const Todo = require('../../models/todo');

//create
router.get('/create', (req, res) => {
  res.render('create', { title: "新增" })

})

router.post('/', (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;
  return Todo.create({
    name,
    userId
  }).then(() => {
    res.redirect('/')
  });

});
//put
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => {
      res.render('edit', { title: "編輯", todo })
    })
})
router.put('/:id', (req, res) => {
  const _id = req.params.id;
  let { name, isDone } = req.body;
  const userId = req.user._id;

  return Todo.findOne({ _id, userId })
    .then(todo => {
      if (isDone) {
        todo.name = name;
        todo.isDone = true;
        todo.save();
      } else {
        todo.name = name;
        todo.isDone = false;
        todo.save();
      }
    }).then(() => res.redirect('/'))
})

// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id
  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.remove()
    })
    .then(() => res.redirect('/'))
})
module.exports = router;