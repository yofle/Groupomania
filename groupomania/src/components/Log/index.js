import React, {useState} from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
//-----------mise en page------------





//--------------mise en page------------
const Log = ()=> {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register" ){
            setSignInModal(false);
            setSignUpModal(true);  
        }else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }


  return (
    <div className="connection-form">
      <div className="form-container">
            <ul>
                <li onClick={handleModals} id="register">S'inscrire</li>
                <li onClick={handleModals} id="login">Se connecter</li>
            </ul>
            {signUpModal && <SignUpForm/>}
            {signInModal && <SignInForm/>}
      </div>
    </div>
  )
}

export default Log;
