const express = require('express');
const bodyparser = require('body-parser');
const { error } = require('console');

const app = express();
const PORT = 3000;

//In Memory data storage

let todos = [
    { id: 1, content: "Buy groceries", completed: false },
    { id: 2, content: "Clean the house", completed: true }

];

app.use(bodyparser.json());

// GET /todos - Retrieve a list of all todos

app.get('/todos', (req, res) =>{
    //send back all todos in json format
   res.status(200).json({todos});
})

//GET /todos/:id - Retrieve a specific todo by ID
app.get('/todos/:id',(req,res) => {
    const todosId = parent(req.params.id);
    const todo = todos.find(todo => todo.id === todosId);
    if(!todo){
        return res.status(404).json({error:'Todo not found'})
    }else{
        return res.status(200).json({todo});
    }
    
})



//POST /todos - Posting new todo items in the list
app.post('/todos',(req,res) => {
    const {text} = req.body;

    if(!text){
        return res.status(400).json({error:'Content missing'});
    
    }else{
        const newTodo = {id: todos.length + 1,text};
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
})

// PUT /todos/:id - Update an existing todo by ID

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedText = req.body.text;
  
    const index = todos.findIndex(todo => todo.id === id);
  
    if (index !== -1) {
      todos[index].text = updatedText;
      res.json(todos[index]);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  });


// DELETE /todos/:id - Delete a todo by ID

app.delete('/todos/:id',(req,res) => {
    const todosId = parseInt(req.params.id);
    const index = todos.findIndex((todo)=> todo.id===todosId);
    if (index < 0){
        return res.status(404).json({error:'todo not found'});
    }
    else{
        todos.splice(index,1);
        res.status(204).end();
    }

})

// Error handling middleware

app.use((err,req,res,next) => {
    console.log('Error handler triggered');
    console.log(err.stack);
    res.status(500).json({error : err.message });
})

//Now time to listen our server

app.listen(PORT ,() => {
    console.log(`Server is running on port ${PORT}`);
})