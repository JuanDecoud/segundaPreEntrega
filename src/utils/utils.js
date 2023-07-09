function comprobateMongoId (string){
    let boolean = false 
    if (string.length === 24)boolean = true
    return boolean 
}



export {comprobateMongoId}