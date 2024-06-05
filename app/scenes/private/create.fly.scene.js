

import { NavigateTo } from '../../Router';
import { fetchApi } from '../../helpers/fetch-api';
import styles from '../public/register/styles.scene.css'

//Creando Vuelo
export const CreateFlyScene = function(){
    const pageContent = `
    <div class=${styles.container}>
    <div class="card" style="width: 18rem;">
    <form class='p-3'>
    <h3>Create Fly</h3>
    <div class="mb-3">
    <label class="form-label">Fly Number</label>
    <input id='number' type="text" class="form-control" maxlength="20" required placeholder="Enter number fly">
    </div>
    <div class="mb-3">
    <label class="form-label">Origin</label>
    <input id='origin' type="text" class="form-control" maxlength="50" placeholder="Enter origin" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Destination</label>
    <input id='destination' type="text" class="form-control" maxlength="50" placeholder="Enter destination" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Departure</label>
    <input id='departure' type="date" class="form-control" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Arrival</label>
    <input id='arrival' type="date" class="form-control" required>
    </div>
    <button id='createFly' type="submit" class="btn btn-outline-success">Create</button>
    </form>
    </div>
    </div>
    `;

//Logic
    const logic = () => {
        const $createFly = document.getElementById('createFly');
        $createFly.addEventListener('click', async (e) => {
            e.preventDefault();

            const $numberFly = document.getElementById('number').value;
            const $origin = document.getElementById('origin').value;
            const $destination = document.getElementById('destination').value;
            const $departure = document.getElementById('departure').value;
            const $arrival = document.getElementById('arrival').value;

            const createFly = await fetchApi('http://localhost:3000/Flight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: $numberFly,
                    origin: $origin,
                    destination: $destination,
                    departure: Date($departure),
                    arrival: $arrival,
                    capacity: "100"
                })
            });
            if(createFly){
                alert('Creado')
                NavigateTo('/dashboard')
            }
        })
    }

    return {
        pageContent,
        logic
    }
}