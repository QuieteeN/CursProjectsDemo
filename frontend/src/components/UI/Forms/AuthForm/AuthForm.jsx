import React, { useState } from "react";
import InfoInput from "../InfoInput/InfoInput";
import FormButton from "../FormButton/FormButton";
import classes from './AuthForm.module.css'

import { validateUsername, validatePasswordAuth } from "../../../../validation";


import axios from "axios";

const AuthForm = ({setActive, setNotActive, ...props}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginNotValid, setLoginNotValid] = useState(false);
    const [passwordNotValid, setPasswordNotValid] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);

    const changeURL = () => {
        const newURL = '/profile';
        window.location.href = newURL;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const UserData = {
          login: login,
          password: password
      }

      if(validateUsername(login)){

        if(validatePasswordAuth(password)){
          try {
            setLoginNotValid(false)
            const response = await axios.post('http://127.0.0.1:8000/auth/', UserData);
            // Обработка успешной регистрации
            console.log(response.data);
            localStorage.setItem('isRegistered', 'true');
            localStorage.setItem('login', login);
            changeURL()
          } catch (error) {
            // Обработка ошибки регистрации
            if(error.code === "ERR_BAD_REQUEST")
              setErrorAuth(true)
            console.error(error);
          }
        }
        else{
          setPasswordNotValid(true);
        }

      }
      else{
        setLoginNotValid(true)
        if(!validatePasswordAuth(password))
          setPasswordNotValid(true)
      }
      };



    return(
        <section className={classes.content} onClick={ e => e.stopPropagation()}>
            {/* <MainLogo /> */}
            <h3 className={classes.form_title}>Авторизация</h3>
            <form onSubmit={handleSubmit} className={classes.form}>
                { errorAuth ? (
                  <span className={classes.not_valid}>
                    Неправильные данные. Такого пользоваателя несуществует.
                  </span>
                ) : (
                  <></>
                ) }
                <InfoInput onChange={e => {
                  setLogin(e.target.value);
                  setLoginNotValid(false);
                  setErrorAuth(false)
                }} placeholder="Логин/Имя"/>
                { loginNotValid ? (
                  <span className={classes.not_valid}>
                    Несоответсвующий логин
                  </span>
                ) : (
                  <></>
                ) }
                <InfoInput name="password" onChange={e => {
                  setPassword(e.target.value);
                  setErrorAuth(false)
                  setPasswordNotValid(false);
                }} placeholder="Пароль"/>
                { passwordNotValid ? (
                  <span className={classes.not_valid}>
                    Несоответсвующий пароль
                  </span>
                ) : (
                  <></>
                ) }
                <FormButton name="Авторизоваться" type="submit"/>
            </form>
            <div className={classes.footer}>
              <FormButton name="Регистрация" onClick={() => {setActive(true); setNotActive(false)}} />
              <span className={classes.link} onClick={() => {setActive(true); setNotActive(false)}}>Еще нету аккаунта.  
                <span className={classes.registr}> Зарегистрироваться.</span>
              </span>
            </div>
        </section>
    )

}

export default AuthForm;