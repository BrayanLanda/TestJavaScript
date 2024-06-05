import styles from '../public/register/styles.scene.css'

//Validacion sin es admin
export const NotAdmin = function(){
    const root = document.querySelector('root');
    root.innerHTML = `
    <div class=${styles.container}>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">Not Admin</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Search your Page</h6>
    </div>
    </div>
    </div>`;
}