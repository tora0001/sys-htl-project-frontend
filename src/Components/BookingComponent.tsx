import React, { useEffect, useState } from "react";
import CreateBooking from "./CreateBookingComponent"; // Adjust the import path as necessary

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

const BookRoom: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/rooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.every((room) => "roomID" in room && "roomType" in room)) {
          setRooms(data);
        } else {
          throw new Error("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleBookingSubmit = (booking: any) => {
    fetch("http://localhost:8080/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Booking created successfully:", data);
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleBooking = (room: Room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  return (
    <div>
      <h2>Here you can book a room</h2>
      <div>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomID} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
              <h3>{room.roomType.roomDesc}</h3>
              <p>Price: ${room.roomType.roomPrice}</p>
              <p>Beds: {room.roomType.beds}</p>
              <button onClick={() => handleBooking(room)}>Book Room</button>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
      {selectedRoom && <CreateBooking open={dialogOpen} handleClose={() => setDialogOpen(false)} handleBookingSubmit={handleBookingSubmit} roomID={selectedRoom.roomID} roomType={selectedRoom.roomType} />}
    </div>
  );
};

export default BookRoom;
