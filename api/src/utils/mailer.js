require('dotenv').config();
const nodemailer = require('nodemailer');

const mailer = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILFROM,
            pass: process.env.PASSWORD_EMAILFROM
        }
    })
    
    const mailOptions = {
        from: process.env.EMAILFROM,
        to: email,
        subject: 'Complete your password reset',
        html: `<h1>Click on the link below and reset your password!</h1>
            <p>Please click on the following <a href='${process.env.RECOVERY_URL}/${token}'>link</a> in order to login and start shooting Flares!</p>
        `
    }

    return (
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) throw new Error(`email could not be sent`)
            else ('Email sent: ' + info.response)
        })
    )
};

module.exports = {
    mailer
};




