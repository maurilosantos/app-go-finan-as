function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();    
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login(){
    showLoading();
     window.location.href = "pages/home/home.html";
}

function register(){
    showLoading();
   window.location.href = "pages/register/register.html";
}

function recoverPassword(){
   
}

function isEmailValid(){
    const email = form.email().value;
    if (!email){
        return false;
    } return validatedEmail(email);
}

function toggleEmailErrors(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validatedEmail(email) ? "none" : "block";
    
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;
    
    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;
}

function isPasswordValid(){
    const password = form.password().value;
    if (!password){
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button")

}
