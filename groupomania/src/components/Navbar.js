import React from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Logout from './Log/logout';

const Navbar = ()=> {
    const uid = useContext(UidContext)
    //insérer notre non lorsque l'on se connecte
    const userData = useSelector((state) => state.userReducer);


  return (
    <nav>
        <div className='nav-container'>
            <div className = "logo">
                <NavLink exact to="/">
                    <div className = "logo">
                            <img src="./img/icon-left-font.png" alt="icon" />
                    </div>
                </NavLink>
            </div>
            {uid ?  (
                <ul>
                    <li></li>
                    <li className='welcome'>
                        <NavLink exact to="/profil">
                            <h5>Bienvenue {userData.pseudo}</h5>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
            ) : (
             <ul>
                <li></li>
                <li>
                    <NavLink exact to="/profil">
                        <img src="./img/icons/login.svg" alt="login"/>
                    </NavLink>
                </li>
             </ul>   
            )}
        </div>
    </nav>
  )
}

export default Navbar;