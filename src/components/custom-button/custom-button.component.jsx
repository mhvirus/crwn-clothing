import React from 'react';
import './custom-button.style.scss';


const CustomButton = ({ children, isGoogleSignIn,...otherProrps }) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in': '' } custom-button`} {...otherProrps}>
        {children}
    </button>
);

export default CustomButton;