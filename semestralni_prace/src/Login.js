import React from "react";
import { useHistory } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
    const navigate = useHistory();
    const users = [
        { name: "1", password: "1" },
        { name: "honza", password: "honza" },
    ];

    let [userName, setUserName] = React.useState("");
    let [Password, setPassword] = React.useState("");

    let [alertColorUsername, setAlertColorUsername] = React.useState("white");
    let [alertColorPassword, setAlertColorPassword] = React.useState("white");

    const Verify = () => {
        if(userName == "") {
            alert("Zadejte prosím název uživatele!")
            setAlertColorUsername("#FD7979");
            return;
        }
        if(Password == "") {
            alert("Zadejte prosím heslo!")
            setAlertColorPassword("#FD7979")
            return;
        }
        for (let x in users) {
            if (users[x].name === userName) {
                if (users[x].password === Password) {
                    navigate.push("/home/pokladna");
                    return;
                } else {
                    alert("Špatně zadané heslo!");
                    setAlertColorPassword("#FD7979")
                    return;
                }
            }
        }
        alert("Neexistuje žádný uživatel s takovém uživatelském jménem!");
        setAlertColorUsername("#FD7979");
    };

    return (
        <div className="login-container">
            <h3 className="login-heading">Přihlášení</h3>
            <div className="login-input-container" style={{ backgroundColor: alertColorUsername}}>
                <PersonIcon className="login-icon" />
                <input
                    type="text"
                    className="login-input"
                    value={userName}
                    onChange={(event) => {setUserName(event.target.value); setAlertColorUsername("white")}}
                    style={{ backgroundColor: alertColorUsername}}
                />
            </div>
            <div className="login-input-container" style={{ backgroundColor: alertColorPassword}}>
                <LockIcon className="login-icon" />
                <input
                    type="password"
                    className="login-input"
                    value={Password}
                    onChange={(event) => {setPassword(event.target.value); setAlertColorPassword("white")}}
                    style={{ backgroundColor: alertColorPassword}}
                />
            </div>
            <button onClick={Verify} className="login-button">
                Přihlásit se
            </button>
        </div>
    );
};

export default Login;