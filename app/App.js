import { Router } from "./Router";

export const App = function(){
    const root = document.getElementById('root');
    if(!root){
        throw new Error('Error App');
    }
    Router();
}