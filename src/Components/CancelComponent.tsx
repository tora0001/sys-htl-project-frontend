import { useEffect, useState } from 'react';

interface Booking {
    bookingID: number;
    numberOfGuests: number;
    roomID: number;
    arrivalDate: string;
    departureDate: string;
    email: string;
    name: string;
}

const CancelReservation = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:8080/bookings')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Check if the data is an array and has the expected structure
                if (Array.isArray(data) && data.every(booking => 'bookingID' in booking && 'email' in booking)) {
                    setBookings(data);
                } else {
                    throw new Error('Unexpected data format');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const handleDeleteBooking = () => {
        const booking = bookings.find(b => b.email === email);
        if (booking) {
            fetch(`http://localhost:8080/bookings/${booking.bookingID}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    setMessage('Booking deleted successfully');
                    setBookings(bookings.filter(b => b.bookingID !== booking.bookingID)); // Remove deleted booking from state
                })
                .catch(error => {
                    console.error('There was a problem with the delete operation:', error);
                    setMessage('Error deleting booking');
                })
                .finally(() => {
                    setIsPopupOpen(false);
                });
        } else {
            setMessage('No booking found with that email');
            setIsPopupOpen(false);
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
        setMessage(''); // Clear message when opening popup
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setEmail('');
    };

    const handlePopupDelete = () => {
        handleDeleteBooking();
    };

    return (
        <div>
            <h2>Here you can cancel your booking using your email</h2>
            <button onClick={openPopup}>Cancel Booking</button>

            {isPopupOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'black', padding: '20px', borderRadius: '5px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid white'
                    }}>
                        <h3>Enter your email to cancel your booking</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter booking email"
                            style={{ margin: '10px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <button onClick={handlePopupDelete} style={{ marginRight: '10px' }}>Cancel Booking</button>
                            <button onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
}

export default CancelReservation;
