import Image from "next/image"
import jh from "../public/jhLogo2.png"
import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";



function signout(){

    async function Redirect(){
    

        var cValue = await Cookies.get("beacon")
        var username = await Cookies.get("username")
        const formData = new URLSearchParams();
        formData.append('cookie', cValue)
        formData.append('username',username)
        const response = await fetch("http://localhost:8008/signout", {
                method: 'POST', 
                body: formData
        });
        var text = await response.text()
        const serverResponse = JSON.parse(text)
        if(serverResponse.wiped == "true"){
            await Cookies.remove("beacon")
            await Cookies.remove("username")
            window.location.replace("http://localhost:3000/")
            
        }
        else if(serverResponse.wiped == "" && serverResponse.authorized == "false"){
            await Cookies.remove("beacon")
            await Cookies.remove("username")
            window.location.replace("http://localhost:3000/")
        }
    }

    Redirect()
    

    return(
        <div className="">
            <div className="flex flex-1 justify-center">
                <Image  src={jh}></Image>
            </div>
            <div className="flex flex-1 animate-pulse justify-center">
                <h1 className="animate-bounce text-center px-28 rounded-md shadow-2xl font-bold text-white bg-blue-400 ">Taking you out of the dog house</h1>
                    
            </div>
            <div className="flex flex-1  mt-8 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-white animate-spin w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>             
            </div>
            
            
        </div>
        
    )
}

export default signout