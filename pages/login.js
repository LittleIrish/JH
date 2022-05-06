import Header from "../comps/header"
import Image from "next/image"
import jh from "../public/jhLogo2.png"
import Cookies from 'js-cookie'
import { useState } from "react"
import Script from "next/script"



function login(){
    async function send(){
        const password = document.getElementById("password").value
        const user = document.getElementById("user").value

        const formData = new FormData();
        formData.append('username', user)
        formData.append('password', password)
  
        if(password && user != ""){

            const response = await fetch("http://localhost:8008/login", {
                method: 'POST', 
                body: formData
                
              });
              const text = await response.text()
              console.log(text)
              const serverResponse = JSON.parse(text)

              if(serverResponse.Pvalid == "false"){
                document.getElementById("password").className="transition-all duration-500 ease-in-out mb-6 border-2 outline-gray-400 border-red-200 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10"
              }
              else if(serverResponse.Pvalid == "true"){
                document.getElementById("password").className="transition-all duration-500 ease-in-out mb-6 border-2 outline-gray-400 border-gray-400 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10"
              }
              if(serverResponse.Uvalid == "false"){
                document.getElementById("user").className="transition-all duration-500 ease-in-out mb-6 border-2 outline-gray-400 border-red-200 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10"

              }
             else if(serverResponse.Uvalid == "true"){
                document.getElementById("user").className="transition-all duration-500 ease-in-out mb-6 border-2 outline-gray-400 border-gray-400 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10"

              }

              if(serverResponse.Uvalid == "true" && serverResponse.Pvalid == "true"){
                  const bp = (serverResponse.cookie)
                  Cookies.set("beacon",bp)
                  Cookies.set("username", user)
                  document.getElementById("form").className = "opacity-50 text-center shadow-lg drop-shadow-lg  pb-8 mt-8 border-1 bg-white hover:shadow-2xl transition-all duration-300 ease-in-out rounded-lg xl:mx-[770px]"
                  document.getElementById("password").disabled = true
                  document.getElementById("user").disabled = true
                  document.getElementById("load").className="flex flex-1 justify-center mt-4 transition-all duration-300 ease-in-out"
                  document.getElementById("signup").href = ""
                  window.location.replace("http://localhost:3000/main")
              }
            }
           
        } 
    
    


    return(
        <div>
            <Header/>
            <div id="form" className="text-center shadow-lg drop-shadow-lg  pb-8 mt-8 border-1 bg-white hover:shadow-2xl transition-all duration-300 ease-in-out rounded-lg xl:mx-[770px]">
                <Image  src={jh} className="hover:cursor-pointer scale-75 hover:scale-90 hover: hover:bg-indigo-500 hover:rounded-md hover:px-2 transition-all duration-500 ease-in-out"/>
                <h1 className=" bg-white rounded-md text-xl font- font-semibold tracking-wider ">Sign in</h1>
                <h3 className="mb-12">Use your JotHound Account</h3>
                
                <input required type="text" id="user" className=" transition-all duration-500 ease-in-out mb-8 border-2 outline-gray-400 border-gray-400 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10" placeholder="Username"></input><br></br>
                <input required type="password" id="password" placeholder="Password" className="transition-all duration-500 ease-in-out mb-6 border-2 outline-gray-400 border-gray-400 f focus:border-blue-500 focus:outline-blue-500 hover:border-blue-400 rounded-md w-72 h-10"></input><br></br>
                <div className="flex flex-1 justify-between">
                    <a href="http://localhost:3000/signup" id="signup" className= "h-8 hover:cursor-pointer text-blue-500 rounded-md ml-8 hover:text-indigo-500  transition-all duration-500 ease-in-out ">Create Account </a>
                    <input type="submit" id="submit" onClick={send} value="Sign in" className="h-8  hover:scale-105 hover:cursor-pointer text-white bg-blue-500 rounded-md mr-8 px-4 hover:bg-indigo-500  hover:shadow-xl hover:drop-shadow-lg transition-all duration-300 ease-in-out "></input>
                </div>
                
            </div>
            <div id="load" className="hidden flex-1 justify-center mt-4 transition-all duration-300 ease-in-out">
              
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin text-blue-400 rounded-md"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          
        </div>
    )
}

export default login