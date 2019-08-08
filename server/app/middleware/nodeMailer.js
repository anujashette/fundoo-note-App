/******************************************************************************
 *  Purpose:  Send mail to user
 *
 *  @file    NodeMailer
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const nodemailer = require('nodemailer')
const log = require('../logfile/logger')
require('dotenv').config()
function auth() { }

/**
 *  @param url
 *  @param email
 */

auth.prototype.mailer = (url, email) => 
{
    const transporter = nodemailer.createTransport
        ({
            service: 'yahoo',
            auth:
            {
                user: process.env.id,
                pass: process.env.pass
            }
        });

    const mailOptions =
    {
        from: process.env.id,       // sender address
        to: email,                  // list of receivers
        subject: 'Fundoo Notes Verify Email...!', // Subject line
        html: `To verify your account click on this link\n\n'<a href="${url}">${url}</a>"`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) 
    {
        if (err) 
        {
            log.logger.error('Node Mailer',err)
        } 
        else 
        {
            log.logger.info(info)
        }
    });
}

module.exports = auth