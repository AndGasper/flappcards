import React from 'react';
import  {Link} from 'react-router';

//get year for copyright
let d = new Date();
d = d.getFullYear();


const Footer  = () =>(
    <div className="footer">
        <nav className="link-container">
            <Link className="foot-link" to="/">Home</Link>
            <Link className="foot-link" to="/about" > About </Link>
            <Link className="foot-link" to="/privacy"> Privacy </Link>
            <Link className="foot-link" to="/disclaimer"> Disclaimer </Link>
        </nav>
        <p className="bottom-menu" >&copy; {d} FlappCards.  All rights reserved.</p>
    </div>
);

export default Footer;