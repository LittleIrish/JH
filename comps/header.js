import Image from "next/image"
import jh from "../public/jhLogo2.png"
import { Router, useRouter } from 'next/router'
import { Component } from "react";


class Header extends Component{
    
    render(){
        
        
        async function Redirect(){
            window.location.replace("http://localhost:3000")
        }
        
        return(
            
            
            <header className="flex justify-between text-purple-50-800  px-6 ">
                <Image onClick={Redirect} src={jh} className="hover:cursor-pointer scale-75 hover:scale-90 hover:rotate-2 hover:bg-blue-400 hover:rounded-md hover:px-2 transition-all duration-500 ease-in-out"/>
                <ul className="flex flex-row items-center align-middle gap-4 mx-6"> 
                    <a href="http://localhost:3000/main" className="text-md font-medium  hover:text-white hover:bg-indigo-600 hover:rounded-md hover:px-2 transition-all duration-300 ease-in-out">Open</a>
                    <a href="http://localhost:3000/login" id="intersite" className="text-md font-medium  hover:text-white hover:bg-gray-800 hover:rounded-md hover:px-2 transition-all duration-300 ease-in-out">Log In</a>
  
                </ul>
                
            </header>
            
        )
    }


} 

export default Header