import { useState} from 'react';
import {signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from '../../utilities/firebase/firebase.utilities'
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

  };
  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email,password);
      resetFormFields();
    }catch(error){
      switch(error.code) {
        case "auth/wrong-password":
        alert("Please Input The Correct Password");
        break
        case "auth/invalid-email":
        alert("Please Input A Valid Email");
        break
        case "auth/user-not-found":
        alert("User Not Found, Please Create An Account")
        break
        default:
        console.log(error);
        }
      }
    }


  const handleChange = (event) => {
    const {name,value} = event.target;
    setFormFields( { ...formFields, [name]:value });
  };

  return (
    <div className = 'sign-up-container'>
      <h2>Have an Account?</h2>
      <span> Sign in with your Email and Password! </span>
      <form onSubmit = {handleSubmit}>
        <FormInput
        label = "Email"
        type = 'text'
        required
        onChange = {handleChange}
        name= "email"
        value = {email}
        />
        <FormInput
        label = "Password"
        type = 'password'
        required
        onChange = {handleChange}
        name= "password"
        value = {password}
        />
      <div className = 'buttons-container'>
        <Button type = 'submit' >Sign In!</Button>
        <Button type = 'button' buttonType='google' onClick ={signInWithGoogle} >Google Sign In</Button>
      </div>
      </form>
    </div>
    )
  }
export default SignInForm;
