import "core-js/stable";
import "regenerator-runtime/runtime";

import "./assets/css/styles.css";

import { Login, Signup, ChangePass, Contact } from "./modules/Form";

const login = new Login(".login-form");
login.init();

const signup = new Signup(".register-form");
signup.init();

const changePass = new ChangePass(".change-pass-form");
changePass.init();

const contact = new Contact(".contact-form");
contact.init();
