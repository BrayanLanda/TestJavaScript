import { NavigateTo } from '../../../Router';
import { fetchApi } from '../../../helpers/fetch-api';
import styles from '../register/styles.scene.css';

export const LoginScene = function(){
    const root = document.getElementById("root");
  root.innerHTML = `
  <div class=${styles.container}>
    <div class="card" style="width: 18rem;">
    <form class='p-3'>
    <h3>Welcome</h3>
    <div class="mb-3">
    <label class="form-label">Email address</label>
    <input type="email" class="form-control" placeholder="Enter email" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" placeholder="Enter password" required>
    </div>
    <button type="submit" class="btn btn-outline-success">Login</button>
    </form>
    </div>
    </div>
    `;

    const $emailHtml = document.querySelector('input[type="email"]');
    const $passwordHtml = document.querySelector('input[type="password"]');
    const $form = document.getElementsByTagName('form')[0];

    $form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!$emailHtml.value || !$passwordHtml.value){
            alert('Llene todos los camposs')
        }

        const usersArry = await fetchApi(`http://localhost:3000/Users?email=${$emailHtml.value}`);
        const users = usersArry[0];
        console.log(users, usersArry);
        if(users.email !== $emailHtml.value || users.password !== $passwordHtml.value){
            alert('Datos invalidos');
            return;
        }
        if(users){
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem('token', token);
            localStorage.setItem('roleId', users.roleId);
            NavigateTo('/dashboard');
        }
    })
}