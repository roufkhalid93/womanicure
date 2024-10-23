import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
// import { Provider } from "react-redux";
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
import { saveBookings } from '../features/bookingsSlice';
import { useDispatch } from 'react-redux';


// export default function AddBooking({ show, handleClose }) {
//     const [primaryService, setPrimaryService] = useState("");
//     const [secondaryService, setSecondaryService] = useState("");
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");
//     const [name, setName] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [specialRequest, setSpecialRequest] = useState("");


//     //handle post booking
//     const handleSave = () => {
//         //get stored JWT token
//         const token = localStorage.getItem("authToken");

//         //Decode the token to fetch the userid
//         const decode = jwtDecode(token);
//         const userId = decode.id

//         const data = {
//             primary_service: primaryService,
//             secondary_service: secondaryService,
//             date: date,
//             time: time,
//             name: name,
//             phone_number: phoneNumber,
//             special_request: specialRequest,
//             user_id: userId,
//         };

//         axios
//             .post("https://75f59249-f39e-45e2-bdbc-28aacda3df6a-00-1uz82hdu0wwx5.picard.replit.dev/booking", data)
//             .then((response) => {
//                 console.log("Success:", response.data);
//                 handleClose();
//             })
//             .catch((error) => {
//                 console.log("Error", error);
//             });
//     }

//test2.0
//new code - test    
export default function AddBooking({ show, handleClose }) {
    // console.log('User ID:', user_id);

    const [primaryService, setPrimaryService] = useState("");
    const [secondaryService, setSecondaryService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [specialRequest, setSpecialRequest] = useState("");
    const dispatch = useDispatch();

    // const handleSave = () => {
    //     dispatch(saveBookings({ primaryService, secondaryService, date, time, name, phoneNumber, specialRequest, user_id }));
    //     handleClose();
    //     setPrimaryService("");
    //     setSecondaryService("");
    //     setDate("");
    //     setTime("");
    //     setName("");
    //     setPhoneNumber("");
    //     setSpecialRequest("");
    // }

    const handleSave = () => {
        const userId = localStorage.getItem("user_id"); // Fetch the user_id from localStorage

        if (userId) {
            dispatch(saveBookings({
                primaryService,
                secondaryService,
                date,
                time,
                name,
                phoneNumber,
                specialRequest,
                user_id: userId  // Pass the user_id fetched from localStorage
            }));
            handleClose();
            setPrimaryService("");
            setSecondaryService("");
            setDate("");
            setTime("");
            setName("");
            setPhoneNumber("");
            setSpecialRequest("");
        } else {
            console.error("User ID not found in localStorage");
        }
    };



    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            // onClick={handleShow}
            >
                <Modal.Header style={{ backgroundColor: '#FFE5B4', color: '#900C3F' }} closeButton>
                    <Modal.Title><strong>Booking</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="primaryService">
                            <Form.Label>Primary Service</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setPrimaryService(e.target.value)}
                            >
                                <option></option>
                                <option value="Basic Manicure">Basic Manicure</option>
                                <option value="Gel Manicure">Gel Manicure</option>
                                <option value="Nail Art">Nail Art</option>
                                <option value="Acrylic">Acrylic</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="secondaryService">
                            <Form.Label>Secondary Service</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setSecondaryService(e.target.value)}
                            >
                                <option></option>
                                <option value="none">None</option>
                                <option value="Basic Pedicure">Basic Pedicure</option>
                                <option value="Gel Pedicure">Gel Pedicure</option>
                                <option value="Eyebrow Tinting">Eyebrow Tinting</option>
                                <option value="Spa Treatment">Spa Treatment</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option></option>
                                <option value="1000 - 1100">10 am - 11 pm</option>
                                <option value="1100 - 1200">11 am - 12 pm</option>
                                <option value="1200 - 1300">12 pm - 1 pm</option>
                                <option value="1300 - 1400">1 pm - 2 pm</option>
                                <option value="1400 - 1500">2 pm - 3 pm</option>
                                <option value="1500 - 1600">3 pm - 4 pm</option>
                                <option value="1600 - 1700">4 pm - 5 pm</option>
                                <option value="1700 - 1800">5 pm - 6 pm</option>
                                <option value="1800 - 1900">6 pm - 7 pm</option>
                                <option value="1900 - 2000">7 pm - 8 pm</option>
                                <option value="2000 - 2100">8 pm - 9 pm</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="specialRequest">
                            <Form.Label>Special request</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setSpecialRequest(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: '#FAA0A0', border: 'none', color: '#900C3F' }} onClick={handleClose}>
                        <strong>Close</strong>
                    </Button>
                    <Button style={{ backgroundColor: '#FFE5B4', border: 'none', color: '#900C3F' }} onClick={handleSave}>
                        <strong>Confirm Booking</strong>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
