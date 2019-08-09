/******************************************************************************
 *  Purpose:  Controller is created to handle request and response data
 *
 *  @file    Controller
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const s3 = require('../middleware/s3');
const serviceObj = require('../services/user.service.js')
const authObj = require('../middleware/authorization')
const log = require('../logfile/logger')

/**
 * @param req get email,first name, last name, password
 * @param res send response to user
 * @description Registration controller validate error if error occured send error
 *              otherwise req.body pass to register services.
 */
exports.register = (async function (req, res) {

    console.log('controller', req.body)

    req.check('email').isEmail()
        .withMessage('Email is not valid')
        .not()
        .isEmpty()
        .withMessage('Email should not be empty')

    req.check('firstname').isAlpha().not().isEmpty()
        .withMessage('First name should be alphabets')
        .isLength({ min: 3 })
        .withMessage('First name having atleast 3 characters')

    req.check('lastname').isAlpha().not().isEmpty()
        .withMessage('Last name should be alphabets')
        .isLength({ min: 3 })
        .withMessage('Last name having atleast 3 characters')

    req.check('password').not().isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password having atleast 6 characters')

    error = req.validationErrors()
    if (error) {
        res.status(400).json({ 'message': error })
    }
    else {
        try {
            let registerRes = await serviceObj.register(req.body)
            console.log('register controller', registerRes)
            return res.status(registerRes.status ? 200 : 422).send(registerRes)
        }
        catch (err) {
            log.logger.error('register controller:', err)
            return res.status(400).json({ 'message': 'Somthing is wrong.Try again' })
        }
    }
})

/**
 * @param req get email and password
 * @param res send response to user
 * @description Login controller validate error if error occured send error
 *              otherwise req.body pass to login services.
 */
exports.login = (async function (req, res) {
    console.log('login controller', req.body)

    req.check('email').isEmail()
        .withMessage('Email is not valid')
        .not()
        .isEmpty()
        .withMessage('Email should not be empty')

    req.check('password').not().isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password having atleast 6 characters')

    error = req.validationErrors()
    if (error) {
        res.status(400).json({ 'message': error })
    }
    else {
        try {
            let loginRes = await serviceObj.login(req.body)
            console.log('controller', loginRes)
            return res.status(loginRes.status ? 200 : 422).send(loginRes)
        }
        catch (err) {
            log.logger.error('register controller:', err)
            return res.status(400).json({ 'message': 'Username or password is wrong' })
        }
    }
})

/**
 * @param req get token in headers
 * @param res send error or authentication response to user 
 * @description Email Verification controller validate error if error occured send error
 *              otherwise after token verificaton req.body.email pass to services.
 */
exports.emailVerification = (async function (req, res) {
    try {
        let verifyRes = await serviceObj.emailVerification(req.token.payload.id)
        console.log('verification controller==>', verifyRes)
        if (verifyRes.status)
            return res.status(200).send(verifyRes)
    }
    catch (err) {
        log.logger.error('verifiction controller:', err)
        return res.status(400).json({ 'message': 'Somthing is wrong.Try again' })
    }
})

/**
 * @param req get email
 * @param res send reset password url to user 
 * @description Forget password controller validate error if error occured send error
 *              otherwise req.body.email pass to services.
 */
exports.forgetPass = async function (req, res) {
    req.check('email').isEmail()
        .withMessage('Email is not valid')
        .not()
        .isEmpty()
        .withMessage('Email should not be empty')

    error = req.validationErrors()
    if (error) {
        res.status(400).json({ 'message': error })
    }
    else {
        try {
            let forgetRes = await serviceObj.forgetPass(req.body)
            res.status(forgetRes.status ? 200 : 422).send(forgetRes)
        }
        catch (err) {
            log.logger.error('forget password controller:', err)
            return res.status(400).json({ 'message': 'Somthing is wrong.Try again' })
        }
    }
}

/**
 * @param req get password in body and token in headers
 * @param res send reset password url to user
 * @description Reset password controller validate error if error occured send error
 *              otherwise after token verificaton req.body.password pass to services.
 */
exports.resetPass = async (req, res) => {
    console.log('pass', req.body)
    var userToken = req.headers['token'];
    console.log('header token', userToken)
    req.check('password').not().isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password having atleast 6 characters')

    error = req.validationErrors()
    if (error) {
        res.status(400).json({ 'message': error })
    }
    else {
        try {
            let result = await serviceObj.resetPass(req.token.payload.id, req.body.password)
            return res.status(result.status ? 200 : 422).send(result)
        }
        catch (err) {
            log.logger.error('reset password controller:', err)
            return res.status(400).json({ 'message': 'Somthing is wrong.Try again' })
        }
    }
}

/**
 * @param req get image in form data
 * @param res send response to user
 * @description Forget password controller validate error if error occured send error
 *              otherwise image url pass to services.
 */
exports.uploadFile = async (req, res, decoded) => {

    try {
        console.log('token', req.token.payload.id)
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;

        params.Key = req.file.originalname;
        params.Body = req.file.buffer;

        s3Client.upload(params, async (err, data) => {
            if (err) {
                res.status(400).send(req.error);
            }
            let result = await serviceObj.storeUrl(data.Location, req.token.payload.id)
            console.log(result)
            res.status(200).send(result);
        });
    }
    catch (err) {
        console.log('----->',req.error)
        log.logger.error('upload file controller:', err)
        return res.status(400).json({ 'message': 'Upload  image only(.jpeg,.jpg,.pgn) extensions.Try again' })
    }
}