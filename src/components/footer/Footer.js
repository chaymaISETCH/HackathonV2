import React from 'react';
import "./Footer.css"
import { ReactComponent as Fb } from "../images/fb.svg"
import { ReactComponent as In } from "../images/in.svg"
import { ReactComponent as Insta } from "../images/insta.svg"
import { ReactComponent as Twitter } from "../images/twitter.svg"

const Footer = () => {

    return (
        <div className="footer">

            <div className="icons">
                <a href="https://www.facebook.com/gomycode" target="_blank">
                    <Fb width="30px" />
                </a>
                <a href="https://twitter.com/gomycode" target="_blank">
                    <Twitter width="30px" />
                </a>
                <a href="https://www.instagram.com/gomycode/" target="_blank">
                    <Insta width="30px" />
                </a>
                <a href="https://fr.linkedin.com/company/go-my-code" target="_blank">
                    <In width="30px" />
                </a>
            </div>
        </div>
    );
}

export default Footer
