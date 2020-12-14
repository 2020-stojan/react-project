import React from 'react';

import './singIn.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

import FormInput from '../form-input/form-input.component';

import {auth , signInWithGoogle} from '../../../firebase/firebase.utils';

class SingIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit =  async event => {
        event.preventDefualt();

        const {email, password} = this.state;

        try {

        await auth.signInWithEmailAndPassword(email,password);
        this.setState({ email: '' , password: '' });
        }catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { value,name} = event.target;

        this.setState({[name]: value})
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have Account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    label='email' 
                    type='email' 
                    handleChange={this.handleChange}
                    value={this.state.email} 
                    required />
                    
                    <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    label='password'
                    handleChange={this.handleChange}
                    required 
                    />

                    <div className='buttons'>
                    <CustomButton type="submit">SIGN IN</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>

                        {' '}
                        Sign in with Google{' '}
                        


                    </CustomButton>

                    </div>
                </form>
            </div>
        )
    }
}


export default SingIn;


