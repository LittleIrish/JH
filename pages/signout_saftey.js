
import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";
import cookie from "cookie"

function parseCookies(req){
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps({ req }) {

    
    
    const cookies = parseCookies(req);
    var cValue = cookies.beacon
    var username = cookies.username

    const formData = new URLSearchParams();
    formData.append('cookie', cValue)
    formData.append('username',username)
    const response = await fetch("http://localhost:8008/cookie-comp", {
            method: 'POST', 
            body: formData
    });
    const text = await response.text()
    const serverResponse = JSON.parse(text)
    var authorized = null
    if (serverResponse.authorized == "false"){
       authorized = false
    }

    return {
      props: {authorized}, // will be passed to the page component as props
    }

  }

function signout({ authorized }){

    async function remove(){
    

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
            document.getElementById("container").className = ""
        }
        
    }
    if(!authorized){
        remove()
       
    }

    if(authorized){
        remove()
        window.location.replace("http://localhost:3000")
    }
    

    return(
        <div id="container" className="">
            <div className="text-center flex flex-1 mt-8 justify-center">
                <h1 id="alert" className="px-4 rounded-md bg-red-500 text-white font-bold">For account saftey you have been signed out, you'll need to login into your account again.<br></br> Sorry for any inconvience</h1>
            </div>
            <div className="text-center flex flex-1 mt-8 justify-center ">
                <a className="bg-blue-500 rounded-md shadow-md font-bold px-4 text-white hover:bg-white hover:text-blue-500 transition-all duration-700 ease-in-out" href="http://localhost:3000/login">Login</a>
                <a className="mx-2 bg-indigo-500 rounded-md shadow-md font-bold px-4 hover:bg-white hover:text-indigo-500 transition-all duration-700 ease-in-out text-white" href="http://localhost:3000/">Home</a>
            </div>
        </div>
    )
}

export default signout