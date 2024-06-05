import { NavigateTo } from '../../../Router';
import { emailValidator } from '../../../helpers/email-validator';
import { fetchApi } from '../../../helpers/fetch-api';
import styles from './styles.scene.css'

export const RegisterLoginScene = function () {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div class=${styles.container}>
    <div class="card" style="width: 18rem;">
    <form class='p-3'>
    <h3>Register</h3>
    <div class="mb-3">
    <label class="form-label">Name</label>
    <input type="text" class="form-control"placeholder="Enter name" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Birthdate</label>
    <input type="date" class="form-control" >
    </div>
    <div class="mb-3">
    <label class="form-label">Email address</label>
    <input type="email" class="form-control" placeholder="Enter email" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" placeholder="Enter password" required>
    </div>
    <button type="submit" class="btn btn-outline-success">Register</button>
    </form>
    </div>
    </div>
    `;

    const $textHtml = document.querySelector('input[type="text"]');
    const $emailHtml = document.querySelector('input[type="email"]');
    const $datelHtml = document.querySelector('input[type="date"]');
    const $passwordHtml = document.querySelector('input[type="password"]');
    const $form = document.getElementsByTagName('form')[0];

    $form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!$textHtml.value || !$emailHtml.value || !$passwordHtml.value){
            alert('Llena todos los campos');
            return;
        }
         if(!emailValidator($emailHtml.value)){
            alert('Email no correcto')
            return;
         }
        const userCreate = await fetchApi('http://localhost:3000/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: $textHtml.value,
                birthdate: Date($datelHtml.value),
                email: $emailHtml.value,
                password: $passwordHtml.value,
                roleId: "1"
            })
        });
        if(userCreate){
            alert('Welcome')
            NavigateTo('/login')
        }

    })

};
