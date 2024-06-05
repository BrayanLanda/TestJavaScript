import { NavigateTo } from "../Router";

export const DashboardLayout = function(pageContente, logic){
    const roleId = localStorage.getItem('roleId');
    const root = document.getElementById('root');
    root.innerHTML = `
    <nav class="navbar bg-body-tertiary">
    <form class="container-fluid justify-content-start">
      <button id="btnFly" class="btn btn-outline-success me-2" type="button">Vuelos Actuales</button>
      <button id="btnEdit" class="btn btn-outline-primary me-2" type="button">Editar Vuelos</button>
      <button id="btnCreate" class="btn btn-outline-dark me-2" type="button">Create Vuelos</button>
      <button class="btn btn-outline-secondary" type="button" id='btn-logout'>Logout</button>
    </form>
    </nav>
    ${pageContente}
    `;
    logic();

    const $btnLogout = document.getElementById('btn-logout');
    $btnLogout.addEventListener('click', () => {
        NavigateTo('/login')
    })

    const $btnEdit = document.getElementById('btnEdit');
    $btnEdit.addEventListener('click', () => {
        if(roleId === "2"){
            NavigateTo('/dashboard/flights/edit');
            return
        }
        alert('No eres admin')
    });

    const $btnCreate = document.getElementById('btnCreate');
    $btnCreate.addEventListener('click', () => {
        if(roleId === "2"){
            NavigateTo('/dashboard/flights/create');
            return
        }
        alert('No eres admin')
    });

    const $btnFly = document.getElementById('btnFly');
    $btnFly.addEventListener('click', () => {
        NavigateTo('/dashboard')
    });
}