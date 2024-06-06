import { fetchApi } from "../../helpers/fetch-api";

export const BookingScene = function(){
    const pageContent = `
    <div class="card m-3" id='card1' style="width: 18rem;">
    </div>
    `;

    const logic = async () => {
        const booking = await fetchApi('http://localhost:3000/Booking');
        const $bookingInfo = document.getElementById('card1');
        $bookingInfo.innerHTML = `
        ${booking.map(flight => `
        <div class="card-body">
        <h4 class="card-title">Booking</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">Id Booking: ${flight.id}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">flight Number: ${flight.flightId}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">User Id: ${flight.userId}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Date Booking: ${flight.bookingDate}</h6>
        <hr>
        </div>
        ` ).join('')}
        `;
    }

    return{
        pageContent,
        logic
    }
}