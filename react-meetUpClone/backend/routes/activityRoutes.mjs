import express  from "express"
import { getActivity, setActivity, updateActivity, removeActivity } from '../controllers/activityController.js'
const router = express.Router()

router.route('/').get(getActivity).post(setActivity)
router.route('/:id').put(updateActivity).delete(removeActivity)



export default router