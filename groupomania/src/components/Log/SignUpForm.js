import React, {useState} from "react";
import axios from "axios";
import SignInForm from "./SignInForm";


const SignUpForm = ()=> {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setcontrolPassword] = useState('');

  const handleRegister =async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    
    //remettre à 0 le message d'erreur
    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword ){
      if (password !== controlPassword);
      passwordConfirmError.innerHTML = "les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `http://localhost:5000/api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res.data.errors);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
  <>
  {formSubmit ? (
      <>
      <SignInForm/>
      <span></span>
      <h4 className="sucess">Enregistrement réussi, veuillez-vous connecter</h4>
      </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
              <br/>
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo (e.target.value)}
                value={pseudo}
              />
              <div className="pseudo error"></div>
              <br/>

              <label htmlFor="email">Email</label>
              <br/>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail (e.target.value)}
                value={email}
              />
              <div className="email error"></div>
              <br/>

              <label htmlFor="password">Mot de passe</label>
              <br/>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword (e.target.value)}
                value={password}
              />
              <div className="password error"></div>
              <br/>

              <label htmlFor="password-conf">Confirmer Mot de passe</label>
              <br/>
              <input
                type="password"
                name="password-conf"
                id="password-conf"
                onChange={(e) => setcontrolPassword (e.target.value)}
                value={controlPassword}
              />
              <div className="password-confirm error"></div>
              <br/>

            <input type="submit" value="Valider inscription"/>
          </form>
        )}
  </>
  )
}

export default SignUpForm;