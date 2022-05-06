import { Component } from "react";


class CardNote extends Component{
    render(){
            let name = this.props.title.split("_*IDsep*_")

            console.log(name)
            var id = name[0].split("[")[0]
            var uid = name[0].split("[")[1].split("]")[0]
            

            name = name[1]
        
            console.log(id)
            function view(){
                window.location.replace("http://localhost:3000/view?cuid=" + uid + "&t=" + id)
            }

            if (id == "td"){
                return(
                    <div id={uid} onClick={view} className="group block hover:cursor-pointer text-white hover:text-blue-400 rounded-md transition-all duration-700 ease-in-out bg-gray-800 hover:rounded-xl hover:bg-white py-8 hover:text-xl shadow-2xl mx-48 ">                            
                        <h1 className="font-semibold ">{name}
                        </h1>
                        <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:animate-bounce text-white group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )
            }
            else if(id == "cd"){
                return(
                    <div id={uid} className="group block hover:cursor-pointer text-white hover:text-blue-400 rounded-md transition-all duration-700 ease-in-out bg-gray-800 hover:rounded-xl hover:bg-white py-8 hover:text-xl shadow-2xl mx-48 ">                            
                        <h1 className="font-semibold ">{name}
                        </h1>
                        <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:animate-bounce text-white group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )
            }
            else if(id == "np"){
                return(
                    <div id={uid} onClick={view} className="group block hover:cursor-pointer text-white hover:text-blue-400 rounded-md transition-all duration-700 ease-in-out bg-gray-800 hover:rounded-xl hover:bg-white py-8 hover:text-xl shadow-2xl mx-48 ">                            
                        <h1 className="font-semibold ">{name}
                        </h1>
                        <div className="flex flex-1 justify-center mt-8 scale-120 group-hover:animate-bounce text-white group-hover:text-blue-400  transition-all duration-500 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-all duration-500 ease-linear group-hover:bg-white rounded-lg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )
            }
        }

    }
export default CardNote