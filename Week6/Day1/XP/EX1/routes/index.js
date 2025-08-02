import express from 'express'


const router = express.Router()


router.get('/', (req, res) => {
    res.send('Welcome to homepage')
})


router.get('/about', (req, res) => {
    res.send('About us Page')
})

export default router