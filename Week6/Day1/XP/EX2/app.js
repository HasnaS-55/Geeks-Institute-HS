import express from 'express'
import router from "./routes/todo.js"


const app = express()
app.use(express.json())
app.use("/todos", router)

const PORT = 3000
app.listen(PORT, ()=> {
    console.log("server running");
    
})