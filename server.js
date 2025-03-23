import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`server is running in http://localhost:${PORT}`);
    

    let users = [
        { 
          id: 1,
          name:"Smith",
          age: 21
        },
        { 
          id: 2,
          name:"Mike",
          age: 30
        },
        { 
          id: 3,
          name:"Leana", 
          age: 32
        },
        { 
          id: 4,
          name:"Monalisa",
          age: 25
        },
        { 
          id: 5,
          name:"Peter", 
          age: 22
        },
    ];

    app.get('/users',(req , res)=>{
        res.json(users);

    });

    app.post('/users',(req , res)=>{
        const newUser = {
            id: users.length +1,
            name: req.body.name,
            age: req.body.age,
        };
        users.push(newUser);
        res.json({message:"User added successfully !", user: newUser});
    });

    app.put('/users/:id',(req, res)=>{
        const userId = parseInt(req.params.id);
        const user = users.find((u) =>u.id === userId);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        user.name = req.body.name || user.name;
        user.age = req.body.age  || user.age;
        res.json({message:"User updated successfully !", user});

    });

    app.delete('/users/:id',(req, res)=>{
        const userId = parseInt(req.params.id);
        users = users.filter((u)=> u.id !== userId);
        res.json({message:"User deleted successfully !"});


    });
});

