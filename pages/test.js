export async function getServerSideProps (context){
   

    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: "John",
                email: "john@example.com"
            }
        })
    });
     return{
         props:{thing:  "hey"}
     }
}

export default function view(){
    return(
        <div>
            <h1>Hey</h1>
        </div>
    )
}