
// Get Activity, GET /api/activity
const getActivity = (req, res) => {  
    res.status(200).json({ message : 'Get activity' })
}

// Create Activity, POST /api/activity
const createActivity = (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    res.status(200).json({ message : 'Create (set) activity' })
}

// Update Activity, PUT /api/activity/:id
const updateActivity = (req, res) => {
    res.status(200).json({ message : `Update activity ${req.params.id} `})
}

//  Delete Activity, DELETE /api/activity/:id
const removeActivity = (req, res) => {
    res.status(200).json({ message : `Delete activity ${req.params.id} `})
}
export {
    getActivity,
    createActivity,
    updateActivity,
    removeActivity
}