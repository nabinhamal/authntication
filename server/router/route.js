import { Router } from "express";


/**import all the controllers */
import * as controller from "../controllers/appController.js"

const router = Router();



/**POST Methods */
router.route('/register').post(controller.regsiter);//register user
//router.route('/registerMail').post();//send the mail
router.route('/authenticate').post((req,res)=>res.end());//authrnticate user
router.route('/login').post(controller.login);//login in app


/**GET methids */
//router.route('/').get()
router.route('/user/:username').get(controller.getUser);//user with username
router.route('/generateOTP').get(controller.generateOTP);//generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP);//verify the generated otp
router.route('/createResetSession').get(controller.createResetSession);//reset all the variables

/**PUT methods */

//router.route('/').put()

router.route('/updateuser').put(controller.updateUser);//is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword);//use to reset the password



export default router;