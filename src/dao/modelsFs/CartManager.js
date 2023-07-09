import fs from 'fs'

export default class CartManager {
    
    #patchFile
    #arrayCarts
    #fileType

    constructor  (patchFile , typeFile){
        this.#patchFile = patchFile
        this.#fileType = typeFile
        this.#arrayCarts=[]
    }

    createCart =async ()=>{
        this.#arrayCarts= await this.#retrieveData()
        let arrayProducts = []
        this.#arrayCarts.push({id:this.#generateId() , arrayProducts}) 
        await this.#saveData()
    }

    isproductAtcard =  (productid , arrayProducts)=>{
        let product = null ;
        product= arrayProducts.find(element=>{
          return element.id == productid
       })
       return product
    }


    updateCart = async (cartId , newCart )=>{
        this.#arrayCarts = await this.#retrieveData()
        this.#arrayCarts.forEach(cart=>{
            if (cart.id == cartId) {
                let {arrayProducts } = newCart
                cart.arrayProducts = arrayProducts
            }
        })
       await this.#saveData()
    }

    getCarts = async  ()=>{
        this.#arrayCarts = await this.#retrieveData()
        return  this.#arrayCarts
    }

    getCartsByid = async (id)=>{
        let cartSearch = null
        this.#arrayCarts = await this.#retrieveData()
        this.#arrayCarts.forEach(cart=>{
        if (cart.id == id) cartSearch = cart })
        return  cartSearch
    }



    #generateId =  ()=>{
        let id = 1 ;
        if (this.#arrayCarts.lenght !=0){
            this.#arrayCarts.forEach(element => {
               id= element.id < id ? id = 1 : ++id
            });
        }
        return id
    }

    #saveData = async ()=> {
        await  fs.promises.writeFile(this.#patchFile , JSON.stringify(this.#arrayCarts,null,"\t"))
    }

    #retrieveData= async ()=>{
        let data = []
       if(fs.existsSync(this.#patchFile)) data= JSON.parse( await fs.promises.readFile(this.#patchFile, this.#fileType))
       return  data
    }

    


}