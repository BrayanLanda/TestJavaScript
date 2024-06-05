import styles from '../public/register/styles.scene.css'
import { fetchApi } from "../../helpers/fetch-api";


//Validacion 
export const CurrentFlights = function(){
    const roleId = localStorage.getItem('roleId');
    const pageContent = `
    <div class="card m-3" id='card1' style="width: 18rem;">
    </div>
    `;

    const logic = async() => {
        const flights = await fetchApi('http://localhost:3000/Flight');

        const $flightsInfo = document.getElementById('card1');
        console.log($flightsInfo)
        $flightsInfo.innerHTML = `
        
        ${flights.map(flight => `
        <div class="card-body">
        <h4 class="card-title">Flights</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">Number Flights ${flight.number}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Origin: ${flight.origin}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Destination: ${flight.destination}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Capacity Fly: ${flight.capacity}</h6>
        <button data-id="${flight.id}" id="btnDelete" class="delete-class btn btn-outline-danger me-2" type="button">Elimiar</button>
        <button data-id="${flight.id}" id="btnReserve" class="reserve-class btn btn-outline-info me-2" type="button">Reservar</button>
        <button data-id="${flight.id}" id="btnEdit" class="edit-class btn btn-outline-dark me-2 mt-2" type="button">Editar</button>
        <hr>
        </div>
        ` ).join('')}
        `;

        //Validacion Role
        if(roleId === '1'){
            const $deleteBtns = document.querySelectorAll('.delete-class');
            const $editBtns = document.querySelectorAll('.edit-class');
            const deleteBtnArray = [...$deleteBtns];
            deleteBtnArray.forEach($deleteBtn => {
                $deleteBtn.style.display = 'none';
            });
            const $editBtnArray = [...$editBtns];
            $editBtnArray.forEach($editsBtn => {
                $editsBtn.style.display = 'none';
            })
        }

        //Btn-Eliminar
        const $deleteBtns = document.getElementsByClassName('delete-class');
        const deleteBtnArray = [...$deleteBtns];
        deleteBtnArray.forEach($deleteBtn => {
            $deleteBtn.addEventListener('click', () => {
                const flyId = $deleteBtn.getAttribute('data-id');
                console.log(flyId);
                deleteFly(flyId);
            })
        });

        //Logica Eliminar
        const deleteFly = async (flyId) => {
            const confirmation = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
            if (confirmation) {
                try {
                    const response = await fetchApi(`http://localhost:3000/Flight/${flyId}`, {
                        method: "DELETE"
                    })
                    if (response) {
                        console.log("Se eliminó el vuelo correctamente");
                        
                    } else {
                        console.log("Error al eliminar el vuelo");
                    }

                } catch (error) {
                    console.log("ERROR", error);
                }
            } else {
                console.log("El usuario canceló la eliminación");
            }
        }

        const addReserve = async function(idFly){
            const reserverAdd = await fetchApi("http://localhost:3000/Booking",{
                method: "POST",
                header:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    flightId: idFly,
                    userId: roleId,
                    bookingDate: new Date()
                })
            })
            if(!reserverAdd){
                console.log({message:"Error reserve flight"})
                return;
            }
            console.log({message: "Reserved flight..."});
        }

        const $buttonReserve = document.querySelectorAll('.reserve-class');
        //const idFly = $buttonReserve.getAttribute('data-id');
        $buttonReserve.forEach(button=>{
            button.addEventListener("click",async()=>{
                const confirmReserve = confirm("Do you want confirm the reserve?");
                if(confirmReserve){
                    console.log("Loading...")
                    const date = new Date();
                    await addReserve(date);
                }
            })
        })
        console.log($buttonReserve)
    };

    return {
        pageContent,
        logic
    }
}