import React from 'react';

import './sign-in-an-and-sign-up.styles.scss';

import SingIn from '../../../components/menu-iteam/sing-in/sing-in.component';

import SignUp from '../../../components/menu-iteam/sign-up/sign-up.component';

const SingInAndSignUp = () => (
    <div className='sign-in-an-and-sign-up'>
        <SingIn />
        <SignUp/>
    </div>
);

export default SingInAndSignUp;