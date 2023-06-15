import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    text: {
        type: String,
        requires: [true, 'Please add a value']
    }
}, {
    timestamps:true
}
)

export default mongoose.model('Activity', activitySchema)