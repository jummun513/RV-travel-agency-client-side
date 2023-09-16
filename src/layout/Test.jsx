import { useEffect, useState } from "react";


const Test = () => {
    const [state, setState] = useState({
        guest: 2,
        room: 1,
    });

    useEffect(() => {
        // Ensure that the 'guest' value is within the range of 1 to 6 guests per room
        const guestPerRoom = 6;
        const maxRooms = Math.ceil(state.guest / guestPerRoom);
        if (state.room !== maxRooms) {
            setState((prevState) => ({
                ...prevState,
                room: maxRooms,
            }));
        }
    }, [state.guest]);

    useEffect(() => {
        // Ensure that the 'room' value is at least 1
        if (state.room < 1) {
            setState((prevState) => ({
                ...prevState,
                room: 1,
            }));
        }
    }, [state.room]);

    const handleGuestIncrease = () => {
        setState((prevState) => ({
            ...prevState,
            guest: prevState.guest + 1,
        }));
    };

    const handleGuestDecrease = () => {
        setState((prevState) => ({
            ...prevState,
            guest: prevState.guest - 1,
        }));
    };

    const handleRoomIncrease = () => {
        setState((prevState) => ({
            ...prevState,
            room: prevState.room + 1,
        }));
    };

    const handleRoomDecrease = () => {
        setState((prevState) => ({
            ...prevState,
            room: prevState.room - 1,
        }));
    };



    return (
        <div className="text-9xl text-white">
            <div>
                <h2>Guests: {state.guest}</h2>
                <button onClick={handleGuestDecrease}>-</button>
                <button onClick={handleGuestIncrease}>+</button>
            </div>
            <div>
                <h2>Rooms: {state.room}</h2>
                <button onClick={handleRoomDecrease}>-</button>
                <button onClick={handleRoomIncrease}>+</button>
            </div>
        </div>
    );
};

export default Test;