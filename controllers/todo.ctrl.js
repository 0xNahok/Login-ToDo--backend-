
let User = require("../models/user");
let Todo = require("../models/todo");

module.exports = {
    create,
    recordsby,
    deleteTodo,
    all
}

function create(req, res){
     let NewTodo = new Todo(req.body);
     console.log();

     if(req.body.title)
     {

     }
    NewTodo.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    };

function recordsby(req, res){
    console.log(req.params);
    
        Todo.find({"userID" : req.params.userID}, function(err, found_todo)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};
function all(req, res){
    console.log(req.params);
    
        Todo.find({}, function(err, found_todo)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};

    function deleteTodo(req, res){
        //console.log(req.params.id);
        /*
        Todo.remove({ _id: req.params.id })
        .then(todo => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
*/
        Todo.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
            if (err)
                res.sendStatus(500);
            else
            res.sendStatus(200);
        });
         
                /* Todo.remove({ _id: req.params.id }, function(err)
                    {  
                        if(err){
                        console.log(err);
                        res.sendStatus(500);
                        return
                    }
                return res.sendStatus(200);

                });
            */
        }   
