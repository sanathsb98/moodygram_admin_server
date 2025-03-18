import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HostSchema = new Schema({
    hostName: {
        type: String,
        required: true
    },
    hostEmail: {
        type: String, 
        required: true,
        unique : true,
    },
    hostPhone: {
        type: String,
        required: true
    },
    hostAltPhone: {
        type: String,
    },
    hostPassword : {
        type : String,
        required : true
    },
    hostAccessToken: {
        type: String
    },
    hostRefreshToken: {
        type: String
    },
    hostResetToken : {
        type : String
    },
    hostEmailOTP : {
        type : String
    },
    hostEmailOTPExpires : {
        type : Date
    },
    hostAccountStatus : {
        type : String,
        enum : ['active','inactive','suspended'],
        default : 'active'
    },
    hostVerified : {
        type : Boolean,
        default : false
    },
},{timestamps : true})

const HostModel = mongoose.model('Host', HostSchema);
export default HostModel;