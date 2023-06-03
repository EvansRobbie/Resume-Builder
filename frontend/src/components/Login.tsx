import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import { Form, Formik } from "formik";
import FormikControl from "../forms/FormikControl";
// import Button from "./Button"
// import { useUserContext } from '../context/UserContext'

const Login = ({
  handleToggle,
  setLoginModal,
}: {
  handleToggle: () => void;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //   const [username, setUsername] = useState('')
  //   const [password, setPassword] = useState('')
  //   const {setUser} = useUserContext()
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values: any) => {
    // e.preventDefault()
        try{
        await  axios.post('/login', values)
    //       setUser(data)
    //       navigate('/')
          setLoginModal(false)
        }catch(e){
          alert('Login Failed')
        }
    // if(user){
    //   return <Navigate to={'/'}/>
    // }
    //  console.log(data)
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      <Form>
        <FormikControl
          control="input"
          name="username"
          label="Username"
          placeholder="Jane Doe"
        />
        <FormikControl
          control="input"
          name="password"
          label="Password"
          placeholder="password"
        />
        <div className=' button'>
            <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Login</button>
        </div>
        <div className="flex md:hidden gap-2 items-center">
            <p className="text-sm">Don't have an account?</p>
            <span
            onClick={handleToggle}
            className="text-cyan-500 hover:underline underline-offset-2"
            >
            Register
            </span>
        </div>
      </Form>

    </Formik>
  );
};

export default Login;
