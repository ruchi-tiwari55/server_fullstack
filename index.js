import express from 'express'
const app = express();
import mongoose, { mongo } from 'mongoose';
import cors from "cors"
import UserModel from "./models/Users.js"
import dotenv from 'dotenv';


const port = 3005;

dotenv.config(); // Load environment variables from .env file

// Isto vem antes do Mongoose
app.use(cors());
app.use(express.json());
// const yourPassw ="mongodb+srv://ruchit215:ruchi12345@host:port/MyData"




// const yourPassw= "mongodb+srv://ruchit215:ruchi12345@cluster0.l04kl.mongodb.net/MyData"

// const yourConnectionString = '@cluster0.epsupyi.mongodb.net/crud?retryWrites=true&w=majority';
// const conectbco = yourPassw + yourConnectionString;

// Aqui podemos por a conexão com MongoDB
const connect=async()=>{
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Data base connetced")
   } catch (error) {
      console.log(error)
   }
}
connect();

// Aqui vamos colocar as rotas ou endpoints da API
app.get('/', (req, res) => {
   UserModel.find({})
      .then(users => res.json(users))
      .catch(err => res.json(err))
} );

app.get('/getUser/:id', (req, res) => {
   const id = req.params.id; // ponha na variavel id o valor que está no corpo da URL
   UserModel.findById({_id:id})
      .then(users => res.json(users))
      .catch(err => res.json(err))
} );

app.put('/updateUser/:id', (req, res) => {
   const id = req.params.id;
     UserModel.findByIdAndUpdate({_id:id}, {
       name: req.body.name, 
       email: req.body.email,
       age: req.body.age
    })
      .then(users => res.json(users))
      .catch(err => res.json(err))
} );

app.delete('/deleteUser/:id', (req, res) => {
   const id = req.params.id;
     UserModel.findByIdAndDelete({_id:id})
  .then(res  => res.json(res))
  .catch(err => res.json(err))
} );

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
       .then(users => res.json(users))
       .catch(err => res.json(err))
} );

// Aqui vem o servidor
app.listen(port, () => {
   console.log(`Server app is listening at ${port}`)
});
