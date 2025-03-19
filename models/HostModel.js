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
        required: function () {
            return this.provider === "local";
        }
    },
    hostAltPhone: {
        type: String,
    },
    hostPassword : {
        type : String,
        required : function () {
            return this.provider === "local"
        }
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
    provider : {
        type : String,
        enum : ["local","google"],
        default : "local"
    },
    hostProfilePicture : {
       type : String
    }

},{timestamps : true})

const HostModel = mongoose.model('Host', HostSchema);
export default HostModel;