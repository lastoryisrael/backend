const nodemailer = require("nodemailer");

const sendResetLink = async (email, id) => {
    try {
        const transporter = nodemailer.createTransport({
           
            service: 'gmail',
            port: 587,
            secure: false,
            requireTLS: true,
           
            auth: {
                user: 'vjjzurhx2@gmail.com',
                pass: 'ojk0pj92i5',
            },
        });

        await transporter.sendMail({
            from: 'vjjzurhx2@gmail.com',
            to: email,
            subject: 'subject',
            text: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendResetLink;