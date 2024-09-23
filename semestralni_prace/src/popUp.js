import './App.css';
import React from "react";

function PopUp(props) {

    return (props.trigger) ? (
        <div style={{border: "1px solid gainsboro", width: "100%"}}>
            <button onClick={() => {props.hover(false)}}
                    className={"button"} style={{width: "10%", backgroundColor: "darkred"}}>Zrušit</button>
            {props.children}
        </div>
    ) : "";
}

export default PopUp;
