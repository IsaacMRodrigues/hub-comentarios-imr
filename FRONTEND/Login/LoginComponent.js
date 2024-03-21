import {User} from "../models/user.model.js"
import { LoginService } from "../services/login.services.js";

const getLoginInputs = () => {
    return {
        username: document.getElementById("username"),
        password: document.getElementById("password"),
    };
}

const handleShowHide = () => {
    const newCommentTag = document.getElementById("form-comentario");
    const loginTag = document.getElementById("login-form");
    
    if (newCommentTag.classList.contains("disabled")) {
        newCommentTag.classList.remove("disabled");
        loginTag.classList.add("disabled");
    } else {
        newCommentTag.classList.add("disabled");
        loginTag.classList.remove("disabled");

}
}

const handleLogin = (event) =>{
    event.preventDefault();
    const {username, password} = getLoginInputs();
    
    const user = new User(null, username.value, password.value, null, null);

    LoginService.apiAuthLogin(user).then(result =>{
        user.setId(result.id)
        user.setFirstname(result.firstname);
        user.setLastname(result.lastname);
        handleShowHide()
        document.getElementById("inputAuthor").value = `${result.firstname} ${result.lastname}`;
    }).catch(error =>{
        alert(`Login Invalido. Error: ${error.message}`)
    })



}


const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    }
}

export { LoginComponent };