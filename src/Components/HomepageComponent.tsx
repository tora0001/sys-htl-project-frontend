import { useEffect } from 'react';

const HotelHomePage = () => {
    useEffect(() => {
        fetch('http://localhost:8080/room-types')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <h2>Welcome to HTL Hotel Homepage!</h2>
    );
}

export default HotelHomePage;
