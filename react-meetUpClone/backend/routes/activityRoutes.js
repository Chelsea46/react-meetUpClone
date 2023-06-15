import express  from "express"

export const router = express.Router()

router.get('/', (rep, res) => {
    res.status(200).json({ message : 'Get activity' })
})


