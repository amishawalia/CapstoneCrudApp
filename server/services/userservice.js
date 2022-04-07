const mongoose = require('mongoose');
const UserScehma = require('../models/user');

class UserService {

    getUserList() {
        let User = mongoose.model('Users',UserScehma);
        return  User.find({isDel: false}).select(["-salt", "-hash"])
    }

    async createUser(obj) {
        console.log(obj);
        let User = mongoose.model('Users',UserScehma);
        if (obj['_id'] !== undefined) {

            return  User.updateOne({ _id: userObj["_id"] }, { $set: userObj });

        } else {
            let userInstance = new User(obj);
            userInstance.setPassword(obj["password"])
            const result = await userInstance.save();
            result["salt"]='';
            result["hash"]='';
            return result;
        }
    }

    async loginUser(loginObject){
        let User = mongoose.model('Users',UserScehma);
        let FoundUser = await User.findOne({email: loginObject.email})
        console.log(FoundUser)
        if(FoundUser){
            console.log("User Found...")
            const user = FoundUser;
            console.log('user' + loginObject.password);    
            if(user.validatePassword(loginObject.password)){
                console.log('inside');
                user.hash = "";
                user.salt = "";
                const objUser = user.toObject();

                objUser.token =  user.generateToken();
                return objUser;
                // return user;
            }else{
                console.log('here');
                return {};
            }
        } else {
            return {}
        }
    }

     updateUser(id,obj) {
        let User = mongoose.model('Users',UserScehma);
        let user = User.findById(id);
        if (user) {
            let result = User.updateOne({_id:id},{$set:obj}) 
            return  result;
        } else {
            return {}
        }
    }
    
    deleteUser(id) {
        let User = mongoose.model('Users',UserScehma);
        return User.updateOne({_id: id}, {$set:{isDel: true}}); 
    }

}

module.exports = UserService;
