import asyncHandler  from 'express-async-handler';
import Activity from '../models/activityModel.js'




// Get Activity, GET /api/activity
const getActivity = asyncHandler(async (req, res) => {  
    const activities = await Activity.find()
    res.status(200).json(activities)
})

// Create Activity, POST /api/activity
const setActivity = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }

    const activity = await Activity.create({
        text: req.body.text,
    })

    res.status(200).json(activity)
})

// Update Activity, PUT /api/activity/:id
const updateActivity = asyncHandler(async (req, res) => {

    const activity = await Activity.findById(req.params.id)

    if(!activity){
        res.status(400)
        throw new Error('Activity not found')
    }

    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedActivity)
})

//  Delete Activity, DELETE /api/activity/:id
const removeActivity = asyncHandler(async (req, res) => {

    const activity = await Activity.findById(req.params.id)
    if(!activity){
        res.status(400)
        throw new Error('Activity not found')
    }

    await activity.deleteOne({ _id: req.params.id });

    res.status(200).json({id: req.params.id})
})

export {
    getActivity,
    setActivity,
    updateActivity,
    removeActivity
}