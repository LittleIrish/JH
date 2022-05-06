import Image from "next/image"
import jh from "../public/jhLogo2.png"
import twitter from "../public/twitter.svg"
import outlook from "../public/outlook.svg"
import facebook from "../public/facebook.svg"
import discord from "../public/discord.svg"
import gmail from "../public/gmail.svg"
import Header from "../comps/header"
import { useEffect } from "react"
import { useState } from "react"
import Cookies from "js-cookie"

function index(){
    
    async function getCookies(){
        if(await Cookies.get("beacon")){
            document.getElementById("intersite").innerText = "Sign Out"
            document.getElementById("intersite").href = "http://localhost:3000/signout#"
           
            // setup MSSE on the cookies, with a cross ip check with the last recorded IP upon an actual login event
            // this will in turn combat cookie logging attacks to some extent 
            // meaning when any page loads if your IP address is different to the one on file {ip addresses should be encrypted with MSSE}
            // but base 64 or just plaintext will be fine for DEVELOPMENT testing ONLY
            
        }
    }

    getCookies()
    
   async function use(){
        
        if(await Cookies.get("beacon")){
            window.location.replace("http://localhost:3000/main")
        
        }
        if(!await Cookies.get("beacon")){
            window.location.replace("http://localhost:3000/signup")
        }
    }
    return(
        <div className="">
           <Header/>
            
            <div id="info-card" className="mx-12 sm:mx-24  md:mx-32 xl:mx-96 align-middle mb-8 hover:text-blue-500  hover:text-lg transition-all duration-500 ease-out">
                <h1 className="hover:text-green-400 text-blue-500 text-2xl font-bold tracking-wide hover:cursor-none hover:text-3xl hover:backdrop-blur-sm mr-96 transition-all duration-300 ease-in-out ">100% Free</h1>
                <p className="break-normal">JotHound is completely free to use, with no paywalled features or annoying popups to buy a premium version. </p>
            </div>

            <div id="info-card" className="mx-12 sm:mx-24  md:mx-32 xl:mx-96 align-middle mb-8 hover:text-blue-500  hover:text-lg transition-all duration-500 ease-out">
                <h1 className="hover:text-rose-400 text-blue-500 text-2xl font-bold tracking-wide hover:cursor-none hover:text-3xl hover:backdrop-blur-sm mr-96 transition-all duration-300 ease-in-out ">Simple Easy,<br></br> <span className="align-middle">Notes</span></h1>
                <p className="justify-center">JotHound makes the mun<i className="">dane</i> and tedious,  </p>
                <p className="">organized and customizable. Use JotHound for simple <br></br> personal memos, make a todo list, create schedules. Or set personal goals</p>
            </div>

            <div id="info-card" className="mx-12 sm:mx-24  md:mx-32 xl:mx-96 align-middle mb-1 hover:text-blue-500  hover:text-lg transition-all duration-500 ease-out">
                <h1 className="hover:text-indigo-800 hover:cursor-none hover:text-3xl hover:backdrop-blur-sm mr-96 transition-all duration-300 ease-in-out text-blue-500 text-2xl font-bold tracking-wide ">We don't sell data<span className="break-normal"> ever.</span></h1>
                <p className="justify-center">At JotHound we don't sell a lick of your information.</p>
                <p className="">We run a few unpersonalized minimal and non-invasive ad's on our site,<br></br> which you can pay to remove them for a reasonable price. </p><br></br>
            </div>
            <a href="http://localhost:3000/no-selling" className="mx-12 sm:mx-24  md:mx-32 xl:mx-96 text-blue-500 text-sm hover:px-2 font-bold hover:bg-gray-800 hover:text-white hover:rounded-md hover:shadow-lg transition-all duration-500 ease-linear">Learn More →</a>
            
            <div className="flex flex-1 justify-center mt-16">
                <button onClick={use} className="hover:bg-indigo-600 hover:shadow-2xl transition-all duration-500 ease-in-out bg-blue-400 font-semibold text-white rounded-md px-2 py-2 w-60">Use JotHound <span className="font-light">It's actually free</span></button>

            </div>
            
            <div className="transition-all duration-500 ease-in-out hover:text-indigo-600 mt-80 text-center   mx-12 sm:24 xl:mx-64 hover:py-2 hover:px-2 hover:bg-white rounded-lg  mb-8 ">
                
                <h2 className="text-blue-500   rounded-md font-bold text-2xl  break-normal ">Share memos, schedules, tasks and goals.</h2><br></br> 
                <p className="break-normal    drop-shadow-md stroke-2  stroke-white  tracking-wide ">Easily fill those you want, in on your daily schedule. <br></br> Plan group events, and communicate via JotHounds built in Quick messaging, Or share on other platforms.</p>
               
            </div>

            <div className="transition-all duration-500 ease-in-out hover:text-indigo-600 mt-24 text-center   mx-12 sm:24 xl:mx-64 hover:py-2 hover:px-2 hover:bg-white rounded-lg mb-8 ">
                
                <h2 className="text-blue-500   rounded-md font-bold text-2xl  break-normal ">Keep on top of things.</h2><br></br> 
                <p className="break-normal    drop-shadow-md stroke-2  stroke-white  tracking-wide ">With JotHound you don't have to worry about cluttered calenders, and messy note applications. <br></br> You can create different containers and categories. Only need a todo-list? Then just create a todo container and add some items.</p>
               
            </div>
            
            <div className="flex flex-1 justify-center">
                

            </div>
            
        </div>


    )
}

export default index