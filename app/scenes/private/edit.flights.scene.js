import { NavigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
import styles from '../public/register/styles.scene.css';

export function EditFlyScene() {
  const pageContent = `
    <div class="${styles.container}">
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
          <button id='updateFly' type="submit" class="btn btn-outline-success">Update</button>
        </form>
      </div>
    </div>
  `;

  const logic = async () => {
    const searchParams = window.location.search;
    console.log("searchParams:", searchParams);  // Depuración
    const paramsTransformed = new URLSearchParams(searchParams);
    const flightId = paramsTransformed.get("flightId");

    console.log("flightId from URL:", flightId);  // Depuración

    if (!flightId) {
      console.error("No flightId found in URL");
      alert("No flight ID found. Redirecting to dashboard.");
      NavigateTo("/dashboard");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/Flight/${flightId}`);
      console.log("Fetch response status:", response.status);  // Depuración
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedFlight = await response.json();
      console.log("Fetched flight data:", fetchedFlight);  // Depuración

      const $number = document.getElementById("number");
      const $origin = document.getElementById('origin');
      const $destination = document.getElementById('destination');
      const $departure = document.getElementById("departure");
      const $arrival = document.getElementById("arrival");

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      $number.value = fetchedFlight.number;
      $origin.value = fetchedFlight.origin;
      $destination.value = fetchedFlight.destination;
      $departure.value = formatDate(fetchedFlight.departure);
      $arrival.value = formatDate(fetchedFlight.arrival);

      const $form = document.querySelector("form");

      $form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedNumber = $number.value;
        const updatedOrigin = $origin.value;
        const updatedDestination = $destination.value;
        const updatedDeparture = $departure.value;
        const updatedArrival = $arrival.value;

        const isNumberModified = updatedNumber !== fetchedFlight.number;
        const isOriginModified = updatedOrigin !== fetchedFlight.origin;
        const isDestinationModified = updatedDestination !== fetchedFlight.destination;
        const isDepartureModified = updatedDeparture !== formatDate(fetchedFlight.departure);
        const isArrivalModified = updatedArrival !== formatDate(fetchedFlight.arrival);

        const isAllModified = isNumberModified && isOriginModified && isDestinationModified && isDepartureModified && isArrivalModified;

        const method = isAllModified ? "PUT" : "PATCH";
        try {
          const updateResponse = await fetchApi(`http://localhost:3000/Flight/${flightId}`, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: updatedNumber,
              origin: updatedOrigin,
              destination: updatedDestination,
              departure: updatedDeparture,
              arrival: updatedArrival,
              capacity: 100,
            }),
          });

          if (updateResponse) {
            alert("Vuelo actualizado con éxito");
            NavigateTo("/dashboard");
          } else {
            console.log("Error al actualizar el vuelo");
          }
        } catch (error) {
          console.error("Error updating flight data:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  return {
    pageContent,
    logic,
  };
}
