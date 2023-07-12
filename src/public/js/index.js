
let socket = io()

socket.on ('updateProducts' ,result =>{
    
        let docs = result.docs
        let divProducts = document.getElementById('rtProducts')
 
        divProducts.innerHTML=''
        for ( data of docs) {
            let card = 
            `<div class="card mx-2" style="width: 18rem;">
                <img class="card-img-top" src=${data.linkThubnail} alt="Card image cap" style="object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                </div>
            </div>`
            divProducts.innerHTML+=card
            console.log(card)
        }
    } )


   

