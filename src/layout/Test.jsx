import { useEffect, useState } from "react";


const Test = () => {
    // Initialize state
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);

    // Ensure no more than 6 guests in a room
    useEffect(() => {
        const maxGuestsPerRoom = 6;
        const roomsNeeded = Math.ceil(guests / maxGuestsPerRoom);
        setRooms(roomsNeeded);
    }, [guests]);

    // Increase or decrease the number of guests
    const handleGuestIncrement = () => {
        setGuests(guests + 1);
    };

    const handleGuestDecrement = () => {
        if (guests > 2) {
            setGuests(guests - 1);
        }
    };

    // Increase or decrease the number of rooms
    const handleRoomIncrement = () => {
        setRooms(rooms + 1);
    };

    const handleRoomDecrement = () => {
        if (rooms > 1) {
            setRooms(rooms - 1);
        }
    };
    return (
        <div className="text-2xl text-gray-50">
            <div>
                <h1>Hotel Booking</h1>
                <div>
                    <h2>Guests: {guests}</h2>
                    <button onClick={handleGuestDecrement}>-</button>
                    <button onClick={handleGuestIncrement}>+</button>
                </div>
                <div>
                    <h2>Rooms: {rooms}</h2>
                    <button onClick={handleRoomDecrement}>-</button>
                    <button onClick={handleRoomIncrement}>+</button>
                </div>
            </div>
        </div>
    );
};

export default Test;