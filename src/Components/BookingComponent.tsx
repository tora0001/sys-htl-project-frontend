import { useEffect, useState } from 'react';

// Define TypeScript interfaces for the room data
interface RoomType {
    roomPrice: number;
    roomDesc: string;
    roomTypeID: number;
    beds: number;
}

interface Room {
    roomID: number;
    roomType: RoomType;
}

const BookRoom = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/rooms')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Check if the data is an array and has the expected structure
                if (Array.isArray(data) && data.every(room => 'roomID' in room && 'roomType' in room)) {
                    setRooms(data);
                } else {
                    throw new Error('Unexpected data format');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <div>
            <h2>Here you can book a room</h2>
            <div>
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <div key={room.roomID} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                            <h3>{room.roomType.roomDesc}</h3>
                            <p>Price: ${room.roomType.roomPrice}</p>
                            <p>Beds: {room.roomType.beds}</p>
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p>
                )}
            </div>
        </div>
    );
}

export default BookRoom;
