import React, { useState } from "react";
import Draggable from "react-draggable";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface BookingFormProps {
  open: boolean;
  handleClose: () => void;
  handleBookingSubmit: (booking: any) => void;
  roomID: string;
  roomType: string;
}

const CreateBooking = ({ open, handleClose, handleBookingSubmit, roomID, roomType }: BookingFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    const booking = {
      numberOfGuests,
      room: {
        roomID,
        roomType,
      },
      arrivalDate,
      departureDate,
      email,
      name,
    };
    handleBookingSubmit(booking);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Dialog open={open} onClose={handleClose} hideBackdrop>
          <div>
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Book a Room
            </DialogTitle>
            <DialogContent>
              <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField fullWidth label="Number of Guests" margin="normal" type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} />
              <DatePicker label="Check-in Date" value={arrivalDate} onChange={(date) => setArrivalDate(date)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
              <DatePicker label="Check-out Date" value={departureDate} onChange={(date) => setDepartureDate(date)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Book Now
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Draggable>
    </LocalizationProvider>
  );
};

export default CreateBooking;
