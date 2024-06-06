import { NotAdmin } from "./scenes/not-admin/not-admin.scene";
import { BookingScene } from "./scenes/private/booking.scene";
import { CreateFlyScene } from "./scenes/private/create.fly.scene";
import { CurrentFlights } from "./scenes/private/current-flights.scene";
import { EditFlyScene } from "./scenes/private/edit.flights.scene";
import { LoginScene } from "./scenes/public/login/login.scene";
import { RegisterLoginScene } from "./scenes/public/register/register.scene";

export const routes = {
    public: [
        {path: '/register', scene: RegisterLoginScene},
        {path: '/login', scene: LoginScene},
        {path: '/not-admin', scene: NotAdmin}
    ],
    private: [
        {path: '/dashboard', scene: CurrentFlights},
        {path: '/dashboard/booking', scene: BookingScene},
        {path: '/dashboard/flights/create', scene: CreateFlyScene, role: ['2'] },
        {path: '/dashboard/flights/edit', scene: EditFlyScene, role: ['2'] }
    ]
}