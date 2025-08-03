import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './service/routes/user.routes.js'
import authRoutes from './service/routes/auth.routes.js'



dotenv.config()

const app = express()
app.use(cors({
    origin : "*",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})