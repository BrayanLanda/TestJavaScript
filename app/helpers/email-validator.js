
//Validacion De Email
export const emailValidator = function(email){
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i")
    return regex.test(email)
}