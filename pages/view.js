import cookie from "cookie"
import Header from "../comps/header";
function parseCookies(req){
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps (context){
    const cookies = parseCookies(context.req);
    const { query } = context
    var card = query.cuid
    var type = query.t
    var cValue = cookies.beacon
    var username = cookies.username
    var body = ""
    var body = ""
    var title = ""
    var redirect = false
    const formData = new URLSearchParams();
    formData.append('cookie', cValue)
    formData.append('card', card)
    formData.append('card-type', type)
    formData.append("type", "pull-card")
    formData.append('username',username)
    const response = await fetch("http://localhost:8008/ret", {
    method: 'POST', 
    body: formData

        

     });
    const text = await response.text()
    if(text != "404"){
        
        const serverResponse = JSON.parse(text)
        body = serverResponse.body
        title = serverResponse.title
    }
    if(text == "404"){
        redirect = true
    }
    
    return {
        props: {body,title, redirect, card, type,cValue, username}
    }
}



function view ( { body, title, redirect, card, type, cValue, username } ){
    var bodyRef = body
   
    var titleRef = title
    async function redirectf(){
        if(redirect){
           await window.location.replace("http://localhost:3000/main")
        }
        if(!redirect){
            document.getElementById("container").className = "visible"
        }
    }
    redirectf()
    
    function check(){
        var titleT = document.getElementById("title-box")
        var bodyT = document.getElementById("body-box")

        if(bodyT.value != bodyRef | titleT.value != titleRef){
            document.getElementById("edit").className = "flex flex-1 justify-center transition-all duration-500 ease-in-out  mt-1"

        }
        if(bodyT.value == bodyRef && titleT.value == titleRef ){
            document.getElementById("edit").className = " flex flex-1 justify-center mt-1  transition-all duration-500 ease-in-out hidden"
        }
    }
    function cancel(){
        var titleT = document.getElementById("title-box")
        var bodyT = document.getElementById("body-box")
        bodyT.value = bodyRef
        titleT.value = titleRef
        check()
    }

    async function save(){
        var titleT = document.getElementById("title-box")
        var bodyT = document.getElementById("body-box")
         
        const formData = new FormData
        formData.append('cookie', cValue)
        formData.append('card', card)
        formData.append('card-type', type)
        formData.append("type", "save-card")
        formData.append('note-title', titleT.value)
        formData.append("note-body", bodyT.value)
        formData.append('username',username)
        const response = await fetch("http://localhost:8008/view", {
        method: 'POST', 
        body: formData
        });
        bodyRef = bodyT.value
        titleRef = titleT.value
        check()

        
    }   
    return(
        
        <div id="container" className="hidden">
            <Header/>
            <div className="flex flex-1 justify-center hover:bg-gray-600 transition-all duration-500 ease-in-out bg-gray-600  shadow-2xl mx-48 rounded-md py-2 ">
                
                <input id="title-box" onClick={check} onChange={check} onMouseLeave={check} defaultValue={title} className="text-white group hover:animate-pulse focus:animate-none bg-gray-600 hover:text-blue-200 font-bold hover:cursor-pointer focus:text-gray-600 focus:bg-white text-xl focus:rounded-md focus:shadow-2xl text-center transition-all duration-500 ease-in-out outline-none focus:outline-blue-200"  type="text"></input>

            </div>
            <div className="flex flex-col  mt-4 align-middle mx-48 rounded-md py-4 text-lg  shadow-2xl  justify-center">
                <div  className="flex flex-1 justify-center">
                    <textarea id="body-box" onClick={check}  onChange={check} onMouseLeave={check} defaultValue={body} className="text-black  focus:cursor-text group rounded-md border-2 border-gray-100 w-11/12  align-middle overflow-hidden  justify-center focus:animate-none hover:transition-all   font-bold hover:cursor-pointer transition-colors duration-500 ease-in-out focus:text-gray-600 focus:bg-white text-lg focus:rounded-md focus:shadow-2xl text-center mb-2 outline-none focus:outline-blue-200"  type="text"></textarea>
                </div>
                <br></br><div id="edit" className="flex flex-1 justify-center mt-1 transition-all duration-500 ease-in-out hidden">
                    <button id="cancel" onClick={cancel} className="bg-red-400 mx-2  hover:text-red-400 hover:bg-white rounded-md px-4 py-1 transition-all duration-500 ease-in-out  text-white  font-bold">Cancel</button>
                    <button id="save" onClick={save} className="bg-emerald-400 rounded-md px-4 py-1 transition-all duration-500 ease-in-out hover:text-emerald-400 hover:bg-white text-white  font-bold">Save</button>
                </div>
                
            </div>
            
        </div>
    )
}


export default view