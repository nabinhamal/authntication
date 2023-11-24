import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// Create Mailgen instance
const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
 *   "username" : "admin",
 *   "userEmail" : "admin@123",
 *   "text" : "",
 *   "subject" : "",
 * }
 */
export const registerMail = async (req, res) => {
    try {
        const { username, userEmail, text, subject } = req.body;

        // Email body
        const email = {
            body: {
                name: username,
                intro: text || 'Welcome to Mern Authorization! We\'re very excited to have you on board.',
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        // Generate email body using Mailgen
        const emailBody = MailGenerator.generate(email);

        // Message configuration
        const message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: subject || "Signup Successful",
            html: emailBody
        };

        // Send mail
        await transporter.sendMail(message);

        // Success response
        return res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        // Log the error for debugging
        console.error('Email Sending Error:', error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};
