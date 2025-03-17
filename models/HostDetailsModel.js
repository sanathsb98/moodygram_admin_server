import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HostDetailsSchema = new Schema({
    hostId : {
        type : Schema.Types.ObjectId,
        ref : 'Host',
        required : true
    },
    hostAddress : {
        type : String,
        required : true
    },
    hostBusinessName : {
        type : String,
        required : true
    },
    hostBusinessCity : {
        type : String,
        required : true
    },
    hostBusinessState : {
        type : String,
        required : true
    },
    hostBusinessPinCode : {
        type : String,
        required : true
    },
    hostBusinessProfilePic : {
        type : String,
    },
    hostBusinessBannerImg : {
        type : String,
    },
    hostBusinessEmail : {
        type : String,
        required : true
    },
    hostBusinessPhone : {
        type : String,
        required : true
    },
    hostBusinessAltPhone : {
        type : String,
    }
})

const HostDetailsModel = mongoose.model('HostDetails',HostDetailsSchema);
export default HostDetailsModel;