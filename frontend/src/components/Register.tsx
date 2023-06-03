import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Form, Formik } from "formik";
import FormikControl from "../forms/FormikControl";

const Register = ({
  setToggle,
  handleToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggle: () => void;
}) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const onSubmit = async (values: any) => {
    //   e.preventDefault()
    //   // const data =
    //   try{
    //     await  axios.post('/register',{
    //       username,
    //       email,
    //       password
    //     } )
    //     setToggle(false)
    //     setUsername('')
    //     setEmail('')
    //     setPassword('')
    //     // alert('Registration Successful')
    //   }catch(e){
    //     // console.log(e)
    //     alert('Registration Failed')
    //   }
  };
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      <Form className="relative">
        <FormikControl
          control="input"
          name="username"
          label="Username"
          placeholder="Jane Doe"
        />
        <FormikControl
          control="input"
          name="email"
          label="Password"
          placeholder="janedoe@gmail.com"
        />
        <FormikControl
          control="input"
          name="password"
          label="Email"
          placeholder="Password"
        />
        <div className=' button'>
            <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Register</button>
        </div>
         
        <div className="flex md:hidden gap-2 items-center">
          <p className="text-sm">Already have an account?</p>
          <span
            onClick={handleToggle}
            className="text-cyan-500 hover:underline underline-offset-2"
          >
            Login
          </span>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
