const express = require("express");
const connectDB = require("./config/db");
const taskRouter = require("./routes/taskRoutes");
const app = express();

const PORT = 5000;

connectDB();
app.use(express.json());
app.use('/api/tasks', taskRouter)

app.listen(PORT, ()=>console.log(`server started at port ${PORT}`))