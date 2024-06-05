import { DashboardLayout } from "./components/dashboard";
import { routes } from "./routes";

export const Router = function(){
    const path = window.location.pathname;
    const token = localStorage.getItem('token');
    const roleId = localStorage.getItem('roleId');

    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);

    if(path === '/login' || path === '/'){
        if(token){
            NavigateTo('/dashboard');
            return;
        }
    }

    if(path === '/'){
        if(!token){
            NavigateTo('/login');
            return
        }
    }

    if(publicRoute){
        publicRoute.scene();
        return
    }

    if(privateRoute){
        if(token && roleId){
            const { pageContent, logic } = privateRoute.scene();
            DashboardLayout(pageContent, logic)
            return;
        }  
    }

}

export function NavigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router();
}