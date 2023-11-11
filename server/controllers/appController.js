import UserModel from '../model/User.Model.js'
import bcrypt from 'bcrypt'
import ENV from '../config.js'
import jwt from 'jsonwebtoken';
 import otpGenerator from 'otp-generator'
import { request } from 'express';


/**middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
      const { username } = req.method === "GET" ? req.query : req.body;
  
      // check the user existence
      let exist = await UserModel.findOne({ username });
      if (!exist) {
        return res.status(404).send({ error: "User not found!" });
      }
      
      // User exists, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error); // Log the actual error for debugging purposes
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }


/** POST: http://localhost:8080/api/register 
import Password from './../../client/src/components/Password';
 * @param :{
  "username" : "admin",
  "password" : "admin@123",
  "email": "admin@gmail.com",
  "firstName" : "Nabin",
  "lastName": "Hamal",
  "mobile": 8009860560,
  "address" : "Lalitpur,Nepal",
  "profile": ""
}
*/

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        const existUsername = await UserModel.findOne({ username });
        if (existUsername) {
            return res.status(400).json({ error: "Please use a unique username" });
        }

        const existEmail = await UserModel.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ error: "Please use a unique email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        const result = await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



/** POST: http://localhost:8080/api/login
 * @param : {
  "username" : "admin",
  "password" : "admin@123",
}
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Username not found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).json({ error: "Incorrect password" });
        }
//create JWt Token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, ENV.JWT_SECRET , { expiresIn: "24h" });

        return res.status(200).json({
            msg: "Login Successful",
            username: user.username,
            token
           
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



/** GET:http://localhost:8080/api/user/example123 */

export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Couldn't Find the User" });
        }

        // Remove password from user
        const { password, ...rest } =Object.assign({}, user.toJSON());

        return res.status(200).send(rest);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/

export async function updateUser(req, res) {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(401).send({ error: "User ID not provided." });
        }

        const body = req.body;

        // Use async/await for Mongoose operations
        const result = await UserModel.updateOne({ _id: userId }, body);

        if (result.n > 0) {
            // No matching user found.
            return res.status(404).send({ error: "User not found." });
        } else {
            return res.status(200).send({ msg: "Record Updated Successfully!" });
            
        }
    } catch (error) {
        // Handle errors appropriately
        console.error('Update User Error:', error); // Log the error for debugging
        return res.status(500).send({ error: "Internal Server Error" });
    }
}







 /** GET: http://localhost:8080/api/generateOTP */
 export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }



 // update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){

}