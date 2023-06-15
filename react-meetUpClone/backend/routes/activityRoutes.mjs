import express  from "express"
import { getActivity, createActivity, updateActivity, removeActivity } from '../controllers/activityController.js'
const router = express.Router()

router.route('/').get(getActivity).post(createActivity)
router.route('/:id').put(updateActivity).delete(removeActivity)



export default router