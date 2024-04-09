import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/Navbar.css'

const Navbar = () =>{
     return (
          <div className="header">
               <a href="/"><h1 className='logoAndName'><span>F</span><span>S</span><span>T</span><span>F</span></h1></a>
               <ul>
                    <li><a href="/terminal">Terminal</a></li>
                    <li><a href="/news">News</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
               </ul>
               <div className="accounts">
                    <button>Log in or Sign up</button>
               </div>
          </div>
     )
}

export default Navbar;