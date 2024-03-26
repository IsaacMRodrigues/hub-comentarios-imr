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
    const navlogin = document.getElementById("navlogin");
    
    if (newCommentTag.classList.contains("disabled")) {
        newCommentTag.classList.remove("disabled");
        loginTag.classList.add("disabled");
        navlogin.classList.remove("disabled");
    } else {
        newCommentTag.classList.add("disabled");
        navlogin.classList.add("disabled");
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


        const divNav = document.getElementById("navlogin");
        divNav.innerHTML = ``;

          const divDisplay = document.createElement("li");
          divDisplay.className = "nav-item dropdown";
          divDisplay.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          @${result.username}
        </a>
        <ul class="dropdown-menu">
          <li><a id="userDataLink" class="dropdown-item">Meus dados</a></li>
          <li><a id="userLogout" class="dropdown-item" href="#">Sair</a></li>
        </ul>
   
              `;
          divNav.appendChild(divDisplay);
          document.getElementById("userDataLink").addEventListener('click', userData);
          document.getElementById("userLogout").addEventListener('click', logout);


          const divUser = document.getElementById("userdados");
            divUser.innerHTML = ``;

          const divDisplay1 = document.createElement("div");
          divDisplay1.className = "d-flex text-body-secondary pt-3 disabled";
          console.log(result)
          divDisplay1.innerHTML = `
            ${result.id} - ${result.username} - ${result.password} - ${result.firstname} - ${result.lastname}
   
              `;
          divUser.appendChild(divDisplay1);
    }).catch(error =>{
        alert(`Login Invalido. Error: ${error.message}`)
    })
}

const logout = () => {
    const newCommentTag = document.getElementById("form-comentario");
    const userdados = document.getElementById("userdados");
    const feedcom = document.getElementById("feedcom");
    const navlogin = document.getElementById("navlogin");
    const loginTag = document.getElementById("login-form");

        loginTag.classList.remove("disabled");
        navlogin.classList.add("disabled");
        userdados.classList.add("disabled");
        feedcom.classList.add("disabled");
        newCommentTag.classList.add("disabled");
        userdados.classList.add("disabled");

    

}

const userData = () => {
    const newCommentTag = document.getElementById("form-comentario");
    const userdados = document.getElementById("userdados");
    const feedcom = document.getElementById("feedcom");

    if (userdados.classList.contains("disabled")) {
        userdados.classList.remove("disabled");
        feedcom.classList.add("disabled");
        newCommentTag.classList.add("disabled");
    } else {
        feedcom.classList.remove("disabled");
        newCommentTag.classList.remove("disabled");
        userdados.classList.add("disabled");
    }
}





const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    }
}

export { LoginComponent };