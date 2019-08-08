/******************************************************************************
 *  Purpose:  Service is created to send data to user.model to perform CRUD 
 *            operations and write business logic.
 *
 *  @file    user.service
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const Model = require('../model/user.model')
const log = require('../logfile/logger')
let modelObj = new Model()                   //  Model object is created

/**
 * @param data contains email,first name, last name, password
 * @description Registration services take data from controller and pass to model
 *              Received result send to registration controller again
 */
exports.register = (async function (data) {
    console.log('data in service ', data);
    try {
        let result = await modelObj.register(data)
        console.log('service register', result)
        return result;
    }
    catch (error) {
        log.logger.error('register service', error)
        console.log(error)
    }
})

/**
 * @param data contains email, password
 * @description Login services take data from controller and pass to model
 *              Received result send to login controller again
 */
exports.login = (async function (data) {
    console.log('data in service login ', data);
    try {
        let result = await modelObj.login(data)
        console.log('service login', result)
        return result;
    }
    catch (error) {
        log.logger.error('login service', error)
        console.log(error)
    }
})

/**
 * @param data contains id of user
 * @description Email verification services take data from controller and pass to model
 *              Received result send to emailVerification controller again
 */
exports.emailVerification = (async function (data) {
    console.log('data in service verification ', data);
    try {
        let result = await modelObj.emailVerification(data)
        console.log('service verification', result)
        return result;
    }
    catch (error) {
        log.logger.error('verification service', error)
        console.log(error)
    }
})

/**
 * @param data contains email id
 * @description Forget password services take data from controller and pass to model
 *              Received result send to forgetPass controller again
 */
exports.forgetPass = (async function (data) {
    console.log('data in service foget ', data);
    try {
        let result = await modelObj.forgetPass(data)
        console.log('service forget password', result)
        return result;
    }
    catch (error) {
        log.logger.error('service forget password', error)
        console.log(error)
    }
})

/**
 * @param data contains password
 * @description Reset password services take data from controller and pass to model
 *              Received result send to resetPass controller again
 */
exports.resetPass = (async function (data,changedPass) {
    console.log('data in service reset ', data);
    try {
        let result = await modelObj.resetPass(data,changedPass)
        console.log('service reset', result)
        return result;
    }
    catch (error) {
        log.logger.error('reset service', error)
        console.log(error)
    }
})

/**
 * @param data contains s3 image url and user id
 * @description Store url services take data from controller and pass to model
 *              Received result send to uploadFile controller again
 */
exports.storeUrl = (async function (url,id) {
    console.log('data in service reset ', url);
    try {
        let result = await modelObj.storeUrl(url,id)
        console.log('service reset', result)
        return result;
    }
    catch (error) {
        log.logger.error('reset service', error)
        console.log(error)
    }
})