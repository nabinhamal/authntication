import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'; // Importing icons from react-icons
import avatar from '../assets/profile.png';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import styles from '../styles/Username.module.css';
import { passwordValidate } from '../helper/validate';

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues:{
      password:'admin@1234'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  });

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="relative">
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.textbox}
                  type={showPassword ? "password" : "text"}
                  placeholder='Password'
                />
                <span
                  className="absolute ring-8 ring-aqua-500  rounded-full right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword  ? <BiHide className="w-5 h-5" /> : <BiShow className='w-5 h-5'/>}
                </span>
              </div>
              <button className={styles.btn} type='submit'>Sign In</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Forgot Password <Link className='text-red-500' to="/recovery">Recovery Now</Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
