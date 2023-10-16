import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorPopup from "./ErrorPopup";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function AccountPage(){
const AccountPage = () => {
    const navigate = useNavigate();
    const [error, seterror] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [name, setname] = useState();
    const [loading, setloading] = useState(false);
} 
}
return(
    <h1>Heading 1</h1>
)
export default AccountPage