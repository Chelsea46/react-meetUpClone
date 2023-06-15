import express from "express"
import dotenv from 'dotenv'
dotenv.config()

import {errorHandler} from './middleware/errorMiddleware.js'
import { connectDB } from "./config/db.js"
import router from "./routes/activityRoutes.mjs";

const port = process.env.PORT || 5000;
// process not working. ChatGPT saying it's because it isnt in a node environement due to being a vite app

connectDB()

const app = express();

app.unsubscribe(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/activity', router)

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))
