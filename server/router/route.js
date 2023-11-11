import { Router } from "express";


/**import all the controllers */
import * as controller from "../controllers/appController.js"
import Auth ,{localVariables} from '../middleware/auth.js'
import { registerMail } from "../controllers/mailer.js";

const router = Router();



/**POST Methods */
router.route('/register').post(controller.register);//register user
router.route('/registerMail').post(registerMail);//send the mail
router.route('/authenticate').post((req,res)=>res.end());//authrnticate user
router.route('/login').post(controller.verifyUser,controller.login);//login in app


/**GET methids */
//router.route('/').get()
router.route('/user/:username').get(controller.getUser);//user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP);//generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP);//verify the generated otp
router.route('/createResetSession').get(controller.createResetSession);//reset all the variables

/**PUT methods */

//router.route('/').put()

router.route('/updateuser').put(Auth ,controller.updateUser);//is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);//use to reset the password



export default router;