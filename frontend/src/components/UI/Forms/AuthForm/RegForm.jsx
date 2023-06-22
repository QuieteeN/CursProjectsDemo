import React, { useState } from "react";
import axios from "axios";

import classes from './AuthForm.module.css'

import InfoInput from "../InfoInput/InfoInput";
import FormButton from "../FormButton/FormButton";
import ProgLangs from "../pop_up/ProgLangs";

import { validateUsername, validatePassword, validateEmail, validatePasswordConfirmation, validateField } from "../../../../validation";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const RegForm = ({setActive, setNotActive}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [mail, setMail] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);

    const [loginNotValid, setLoginNotValid]                     = useState(false);
    const [passwordNotValid, setPasswordNotValid]               = useState(false);
    const [passwordRepeatNotValid, setPasswordRepeatNotValid]   = useState(false);
    const [mailNotValid, setMailNotValid]                       = useState(false);
    const [selectedValuesNotValid, setSelectedValuesNotValid]   = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validData = true;

        const UserData = {
            login: login,
            username: login,
            password: password,
            email: mail,
            loveProgramming: selectedValues,
            githubUser: null
        }

        if(validateUsername(login)){
            validData = true;
        }
        else{
            setLoginNotValid(true);
            validData = false;
        }

        if(validatePassword(password)){
            validData &=  true;
        }
        else{
            setPasswordNotValid(true);
            validData = false;
        }

        if(validateEmail(mail)){
            validData &= true;
        }
        else{
            setMailNotValid(true);
            validData = false;
        }

        if(validatePasswordConfirmation(password, passwordRepeat)){
            validData &= true;
        }
        else{
            setPasswordRepeatNotValid(true);
            validData = false;
        }

        if(validateField(selectedValues.length)){
            validData &= true;
        }
        else{
            setSelectedValuesNotValid(true);
            validData = false;
        }

        if(validData)
            try {
            const response = await axios.post('http://127.0.0.1:8000/register/', UserData);
            // Обработка успешной регистрации
            setActive(true)
            setNotActive(false)
            console.log(response.data);
            } catch (error) {
            // Обработка ошибки регистрации
            console.error(error);
            }
        
      };



    return(
        <section className={classes.content} onClick={ e => e.stopPropagation()}>
            {/* <MainLogo /> */}
            <h3 className={classes.form_title}>Регистрация</h3>
            <form onSubmit={handleSubmit} className={classes.form}>
                <InfoInput 
                    value={login} 
                    onChange={e => {
                        setLogin(e.target.value);
                        setLoginNotValid(false)
                    }} 
                    placeholder="Логин/Имя"/>
                { loginNotValid ? (
                  <span className={classes.not_valid}>
                    Логин должен состоять из латинских букв и арабских цифр
                  </span>
                ) : (
                  <></>
                ) }
                <InfoInput 
                    value={mail} 
                    onChange={e => {
                        setMail(e.target.value);
                        setMailNotValid(false);
                    }} 
                    placeholder="Почта"/>
                { mailNotValid ? (
                  <span className={classes.not_valid}>
                    Введите правильную почту.
                  </span>
                ) : (
                  <></>
                ) }
                <InfoInput 
                    name="password" 
                    value={password} 
                    onChange={e => {
                        setPassword(e.target.value);
                        setPasswordNotValid(false);
                    }} 
                    placeholder="Пароль"/>
                { passwordNotValid ? (
                  <span className={classes.not_valid}>
                    Пароль должен иметь хотя б одну строчную и прописную латинскую букву, и арабскую цифру, и состоять не меньше 8 символов.
                  </span>
                ) : (
                  <></>
                ) }
                <InfoInput 
                    name="password" 
                    value={passwordRepeat} 
                    onChange={e => {
                        setPasswordRepeat(e.target.value);
                        setPasswordRepeatNotValid(false);
                    }} 
                    placeholder="Повторите пароль"/>
                { passwordRepeatNotValid ? (
                  <span className={classes.not_valid}>
                    Пароль не совподает.
                  </span>
                ) : (
                  <></>
                ) }
                <ProgLangs selectedValues={selectedValues} setSelectedValues={setSelectedValues} setSelectedValuesNotValid={setSelectedValuesNotValid}/>
                { selectedValuesNotValid ? (
                  <span className={classes.not_valid}>
                    Выберите не меньше 3 языков.
                  </span>
                ) : (
                  <></>
                ) }
                <FormButton name="Зарегистрироваться" type="submit"/>
            </form>
            <div className={classes.footer}>
                <FormButton name="Авторизация" onClick={() => {setActive(true); setNotActive(false)}} />
                <span className={classes.link} onClick={() => {setActive(true); setNotActive(false)}}>Уже есть аккаунт. 
                    <span className={classes.registr}> Авторизоваться.</span>
                </span>
            </div>
        </section>
    )

}

export default RegForm;