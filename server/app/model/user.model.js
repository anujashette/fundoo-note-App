/******************************************************************************
 *  Purpose:  Model is created to store data into database
 *
 *  @file    user.model
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const log = require('../logfile/logger')
const genTokenObj = require('../../utility/genToken')
const NodeMailer = require('../middleware/nodeMailer')
// const redis = require('redis')
const mailObj = new NodeMailer()                        //  Node mailer object

/**
 * User Schema is created to store data in database
 */
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmed: {
        type: Boolean,
        defaultValue: false
    },
    imageurl:{
        type: String,
    },
}, {
        timestamps: true
    });

/**
  * User Schema object
  */
const userObj = mongoose.model('user', userSchema);

function User() { }

/**
 * @param body
 * @description Registration model save all user data  
 */
User.prototype.register = async (body) => {
    console.log('register==>', body)
    try {
        data = await userObj.find({ "email": body.email })
        result = await saveData(data)

        async function saveData(data) {
            var response = {
                status: true,
                message: '',
                data: ''
            }
            if (data != '') {
                response.status = false
                response.message = 'User already exist'
            }
            else {
                console.log('model data==>', body)
                try {
                    const newUser = new userObj                 //  User object created
                        ({
                            email: body.email,
                            firstname: body.firstname,
                            lastname: body.lastname,
                            password: body.password,
                            confirmed: false
                        });

                    let salt = await bcrypt.genSalt(10)
                    let hash = await bcrypt.hash(newUser.password, salt)//when fail to bcrypt its goes to catch
                    console.log('hash password==>', hash)
                    newUser.password = hash
                    console.log('bcerypted password==>', newUser.password)
                    saveUser = await newUser.save()                     //when fail its goes to catch
                    console.log(saveUser)                       
                    emailToken = await genTokenObj.genToken(newUser)    //Generate token
                    url = process.env.emailurl + emailToken;
                    console.log('url  ==>', url)
                    mailObj.mailer(url, newUser.email)
                    response.message = 'Link is send to your email'
                    response.data = saveUser
                }
                catch (err) {
                    console.log('err==>' + err)
                    log.logger.error('Error in register model', err)
                    return err
                }
            }
            return response
        }
        return result
    }
    catch (err) {
        log.logger.error('Error in register model==>', err)
        return err
    }
}

/**
 * @param body
 * @description Login model check wheather email and password is valid or not
 */
User.prototype.login = async (body) => {
    console.log('login model', body)
    var response = {
        status: true,
        message: '',
        data: ''
    }
    try {
        console.log(body.email, '=====>body')

        data = await userObj.findOne({ "email": body.email })
        console.log(data, '=====>data')
        if (data) {
            isMatch = await bcrypt.compare(body.password, data.password)
            if (isMatch) {
                if (data.confirmed) {
                    token = await genTokenObj.genToken(data)
                   await client.set('user'+data.id,token,redis.print)    

                    response.message = 'Login successful'
                    response.data = token
                }
                else {
                    response.status = false,
                    response.message = 'Email is not verified'
                }
            }
            else {
                response.status = false,
                response.message = 'Username or password is incorrect'
            }
        }
        else {
            response.status = false,
            response.message = 'Account is not exist'
        }

        return response
    }
    catch (err) {
        log.logger.error('Error in login model==>', err)
        return err
    }

}

/**
 * @param id contains id
 * @description Email verification model check wheather token is valid or not
 */
User.prototype.emailVerification = async (id) => {
    var response = {
        status: true,
        message: '',
        data: ''
    }
    try {
        result = await userObj.updateOne({ "_id": id }, { confirmed: true });
        console.log('verification==>', result)
        response.message = 'Email is verified'
        return response
    }
    catch (err) {
        log.logger.error('Exception in verification of email', err);
        return err
    }
}

/**
 * @param body
 * @description Forget passowrd model check email exist in database.
 * If not return account not exist otherwise return reset url.
 */
User.prototype.forgetPass = async (body) => {
    var response = {
        status: true,
        message: '',
        data: ''
    }
    try {
        data = await userObj.findOne({ "email": body.email })
        console.log('Forget ==>',data)
        if (data) {
            console.log('data found')
            emailToken = await genTokenObj.genToken(data)
            url = process.env.reserurl + emailToken;
            console.log('url  ==>', url)
            mailObj.mailer(url, data.email)
            response.message = 'Reset password link is send to your email'
        }
        else {
            response.status = false
            response.message = 'Email id is incorrect'
        }
        return response
    }
    catch (err) {
        log.logger.error('Exception in forget password', err);
        return err
    }
}

/**
 * @param id contains id
 * @param changedPass
 * @description Reset password model update password where id found
 */
User.prototype.resetPass = async (id,changedPass) => {
    console.log(changedPass)
    console.log(id)
    var response = {
        status: true,
        message: '',
        data: ''
    }
    try {
        console.log('changed pass==>',changedPass)
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(changedPass, salt)
        changedPass = hash
        console.log('changed pass in hash==>',changedPass)
        result = await userObj.updateOne({ "_id": id }, { password: changedPass });

        response.message = 'Password reset successfully'
        return response
    }
    catch (err) {
        log.logger.error('Exception in reset password', err);
        return err
    }
}

/**
 * @param id contains id
 * @param changedPass
 * @description StoreUrl model update url to perticular id
 */
User.prototype.storeUrl = async (url,id) =>{
    console.log('url:',url,'id :',id)
    var response = {
        status: true,
        message: '',
        data: ''
    }
    try {
        result = await userObj.updateOne({ "_id": id }, { imageurl : url });
        response.message = 'Image set successfully'
        response.data = url
        return response
    }
    catch (err) {
        log.logger.error('Exception in store url', err);
        return err
    }
}
module.exports = User;