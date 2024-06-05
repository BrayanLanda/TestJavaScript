import { NavigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
import styles from '../public/register/styles.scene.css'

export function EditFlyScene() {
  // Define the HTML content for the page
  const pageContent = `
    <div class=${styles.container}>
    <div class="card" style="width: 18rem;">
    <form class='p-3'>
    <h3>Edit Fly</h3>
    <div class="mb-3">
    <label class="form-label">Fly Number</label>
    <input id='number' type="text" class="form-control" maxlength="20"  required placeholder="Enter number fly">
    </div>
    <div class="mb-3">
    <label class="form-label">Origin</label>
    <input id='origin' type="text" class="form-control" maxlength="50"  placeholder="Enter origin" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Destination</label>
    <input id='destination' type="text" class="form-control"  maxlength="50" placeholder="Enter destination" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Departure</label>
    <input id='departure' type="date" class="form-control" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Arrival</label>
    <input id='arrival' type="date" class="form-control" required>
    </div>
    <button id='updateFly' type="submit" class="btn btn-outline-success">Update</button>
    </form>
    </div>
    </div>
    `;

  
  const logic = async () => {
    const searchParams = window.location.search;
    const paramsTransformed = new URLSearchParams(searchParams);
    const flightId = paramsTransformed.get("flightId");
    // console.log(flightId)
    // console.log(paramsTransformed);
    // console.log(searchParams)

    const response = await fetch(`http://localhost:3000/Flight/${flightId}`);
    console.log(response);
    const fetchedFlightId = await response.json();
    // Store the original values of the flight fields
    const originalNumber = fetchedFlightId.number;
    const originalOrigin = fetchedFlightId.origin;
    const originalDestination = fetchedFlightId.destination;
    const originalDeparture = fetchedFlightId.departure;
    const originalArrival = fetchedFlightId.arrival;

    const $number = document.getElementById("number");
    const $origin = document.getElementById('origin');
    const $destination = document.getElementById('destination');
    const $departure = document.getElementById("departure");
    const $arrival = document.getElementById("arrival");

    // Populate the form fields with the original values
    $number.value = fetchedFlightId.number;
    $origin.value = fetchedFlightId.origin;
    $destination.value = fetchedFlightId.destination;
    $departure.value = fetchedFlightId.departure;
    $arrival.value = fetchedFlightId.arrival;

    const $form = document.getElementsByTagName("form")[0];

    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get the updated values from the form fields
      const updatedNumber = $number.value;
      const updatedOrigin = $origin.value;
      const updatedDestination = $destination.value;
      const updatedDeparture = $departure.value;
      const updatedArrival = $arrival.value;

      // Check if each field has been modified
      const isNumberModified = updatedNumber !== originalNumber;
      const isOriginModified = updatedOrigin !== originalOrigin;
      const isDestinationModified = updatedDestination !== originalDestination;
      const isDepartureModified = updatedDeparture !== originalDeparture;
      const isArrivalModified = updatedArrival !== originalArrival;

      // Check if all fields have been modified
      const isAllModified =
        isNumberModified &&
        isOriginModified &&
        isDestinationModified &&
        isDepartureModified &&
        isArrivalModified

      const method = isAllModified ? "PUT" : "PATCH";
      const response = await fetchApi(`http://localhost:3000/Flight/${flightId}`,
        {
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