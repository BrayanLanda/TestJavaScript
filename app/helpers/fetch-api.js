//Creando fetch
export const fetchApi = async function(url, options){
    try{
        const responde = await fetch(url, options);
        const data = await responde.json();
        return data;
    }catch(err){
        console.log(`Error server ${err}`);
    }
}
