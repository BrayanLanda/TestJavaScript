import styles from '../public/register/styles.scene.css'

import { NavigateTo } from "../../Router";
import { fetchApi } from '../../helpers/fetch-api';

export function EditFlyScene() {
  const pageContent = `
  <div class=${styles.container}>
  <div class="card" style="width: 18rem;">
  <form class='p-3'>
  <h3>Edit Fly</h3>
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
  <button id='createFly' type="submit" class="btn btn-outline-success">Update</button>
  </form>
  </div>
  </div>
    `;

  const logic = async () => {
    const searchParams = window.location.search;
    const paramsTransformed = new URLSearchParams(searchParams);
    const flightId = paramsTransformed.get("flightId");

    const fetchedFlightId = await fetchApi(`http://localhost:3000/Flight/${flightId}`);

    const originalNumber = responseJson.number;
    const originalOrigin = responseJson.origin;
    const originalDestination = responseJson.destination;
    const originalDeparture = responseJson.departure;
    const originalArrival = responseJson.arrival;
    const originalCapacity = responseJson.capacity;

    // Get references to the form fields
    const $number = document.getElementById("number");
    const $origin = document.getElementById('origin');
    const $destination = document.getElementById('destination');
    const $departure = document.getElementById("departure");
    const $arrival = document.getElementById("arrival");

    // Populate the form fields with the original values
    $inputNumber.value = responseJson.number;
    $inputOrigin.value = responseJson.origin;
    $inputDestination.value = responseJson.destination;
    $inputDeparture.value = responseJson.departure;
    $inputArrival.value = responseJson.arrival;
    $inputCapacity.value = responseJson.capacity;

    // Get a reference to the form
    const $form = document.querySelector("form");

    // Add an event listener to the form submit event
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get the updated values from the form fields
      const updatedNumber = $inputNumber.value;
      const updatedOrigin = $inputOrigin.value;
      const updatedDestination = $inputDestination.value;
      const updatedDeparture = $inputDeparture.value;
      const updatedArrival = $inputArrival.value;
      const updatedCapacity = $inputCapacity.value;

      // Check if each field has been modified
      const isNumberModified = updatedNumber !== originalNumber;
      const isOriginModified = updatedOrigin !== originalOrigin;
      const isDestinationModified = updatedDestination !== originalDestination;
      const isDepartureModified = updatedDeparture !== originalDeparture;
      const isArrivalModified = updatedArrival !== originalArrival;
      const isCapacityModified = updatedCapacity !== originalCapacity;

      // Check if all fields have been modified
      const isAllModified =
        isNumberModified &&
        isOriginModified &&
        isDestinationModified &&
        isDepartureModified &&
        isArrivalModified &&
        isCapacityModified;
      // Determine the method to use based on whether all fields have been modified
      const method = isAllModified ? "PUT" : "PATCH";

      // Send a request to the API to update the flight
      const response = await fetchApi(`http://localhost:3000/Flight/${flightId}`,{
          method: method,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            number: updatedNumber,
            origin: updatedOrigin,
            destination: updatedDestination,
            departure: updatedDeparture,
            arrival: updatedArrival,
            capacity: 100,
          }),
        }
      );

      // Check the response and show a message to the user
      if (response) {
        alert("Vuelo actualizado con éxito");
        NavigateTo("/dashboard");
      } else {
        console.log("Error al actualizar el vuelo");
      }
    });
  };

  // Return the page content and logic
  return {
    pageContent,
    logic,
  };
}