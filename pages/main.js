import Cookies from "js-cookie"
import CardNote from "../comps/card-note"
import Header from "../comps/header"
import cookie from "cookie"

function parseCookies(req){
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps({ req }) {

    var authorized = "wipe"
    var data = []
    
    const cookies = parseCookies(req);
    var cValue = cookies.beacon
    if(cValue){
        var username = cookies.username

        const formData1 = new URLSearchParams();
        formData1.append('cookie', cValue)
        formData1.append('username',username)
        const response1 = await fetch("http://localhost:8008/cookie-comp", {
            method: 'POST', 
            body: formData1

        });
        

        const text1 = await response1.text()
        const serverResponse1 = JSON.parse(text1)

        if (serverResponse1.authorized == "true"){
            authorized = true
        
            const formData = new URLSearchParams();
            formData.append('cookie', cValue)
            formData.append('username',username)
            formData.append("type", "recent")
            const response = await fetch("http://localhost:8008/ret", {
                    method: 'POST', 
                    body: formData

            });
            const text = await response.text()
            
            const serverResponse = JSON.parse(text)
            const responseList = serverResponse.list.split("_*JHsplitJH*_")
            data = responseList
            data.pop()
        
        if (serverResponse1.authorized == "false"){
            authorized = false
        }
        if (serverResponse1.valid == "false" && serverResponse1.authorized == ""){
            authorized = "wipe"
        }
    }

    

  }
  return {
    props: {data, authorized}, // will be passed to the page component as props
  }
}

function main({ data, authorized }){
    
    async function wipe (){
        await Cookies.remove("beacon")
        await Cookies.remove("username")
        window.location.replace("http://localhost:3000/")

    }
    if(authorized != "wipe"){

        async function start(){

            await getUsername()

        }
        async function getUsername(){
            var username = await Cookies.get("username")
        
            document.getElementById("wt").innerText = username + "'s Dashboard"
            return username
        }
        async function getCookies(){
            if(await Cookies.get("beacon")){
                document.getElementById("intersite").innerText = "Sign Out"
                document.getElementById("intersite").href = "http://localhost:3000/signout#"
                
                // setup MSSE on the cookies, with a cross ip check with the last recorded IP upon an actual login event
                // this will in turn combat cookie logging attacks to some extent 
                // meaning when any page loads if your IP address is different to the one on file {ip addresses should be encrypted with MSSE}
                // but base 64 or just plaintext will be fine for DEVELOPMENT testing ONLY
                var cValue = Cookies.get("beacon")
                document.getElementById("container").className = ""
                start()
            }
            if(!await Cookies.get("beacon")){
                window.location.replace("http://localhost:3000/signup")
            }
            if(!authorized){
                wipe()
            }
        }

        getCookies()
    }
    else if(authorized == "wipe"){
        wipe()
    }
    console.log(data)
    return(
        <div id="container" className="hidden">
                <Header/>
                <div className="mb-4 bg-gradient-to-r  transition-all duration-700 ease-in-out from-white via-indigo-100 to-blue-100 hover:shadow-xl shadown:md rounded-md mx-12 py-2">
                    <h1 className="text-center hover:py-1 hover:text-xl transition-all duration-700 ease-in-out  text-white shadow-md bg-gray-800 rounded-md text-lg font-bold" id="wt"></h1>
                    <div className="grid grid-cols-3 py-8  justify-center text-center">
                        <div id="card" className="group block hover:cursor-pointer text-blue-400 hover:text-white rounded-md transition-all duration-700 ease-in-out bg-white hover:rounded-xl hover:bg-blue-400 py-8 hover:text-xl shadow-2xl mx-48 ">                            
                            <h1 className="font-semibold ">Manage
                            </h1>
                           

                            <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:rotate-12 group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg"  class="h-6 w-6 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                        <div id="card" className="group block hover:cursor-pointer text-blue-400 hover:text-white rounded-md transition-all duration-700 ease-in-out bg-white hover:rounded-xl hover:bg-blue-400 py-8 hover:text-xl shadow-2xl mx-48 ">                            
                            <h1 className="font-semibold ">Settings
                            </h1>
                            <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:rotate-180 group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg"  class="h-6 w-6 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        <div id="card" className="group block hover:cursor-pointer text-blue-400 hover:text-white rounded-md transition-all duration-700 ease-in-out bg-white hover:rounded-xl hover:bg-blue-400 py-8 hover:text-xl shadow-2xl mx-48 ">                            
                            <h1 className="font-semibold ">Account
                            </h1>
                            <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:animate-bounce group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r  transition-all duration-700 ease-in-out from-white via-indigo-100 to-blue-100 hover:shadow-xl shadown:md rounded-md mx-12 py-2">
                    <h1 className="text-center hover:py-1 hover:text-xl transition-all duration-700 ease-in-out  text-white shadow-md bg-blue-500 rounded-md text-lg font-bold" id="wt">Recent</h1>
                    <div id="recent-grid" className="grid grid-cols-3 py-8  justify-center text-center">
                    {data.map(name => (
                        
                        <CardNote title={name}/>
                    ))}
                    </div>
                </div>
        </div>
    )

}
export default main