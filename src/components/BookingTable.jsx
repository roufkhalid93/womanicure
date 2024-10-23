import { Button, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';
import { Modal, Form } from 'react-bootstrap';



export default function BookingTable() {

    //Troubleshoot to extract user_id from authToken stored in localStorage
    // console.log(localStorage.getItem('authToken'));
    // const token = localStorage.getItem('authToken');

    // if (token) {
    //     const decoded = jwtDecode(token); // Make sure jwtDecode is imported
    //     console.log('Decoded Token:', decoded);

    //     const userId = decoded?.user_id; // Or whatever the key is for the user ID in the token
    //     console.log('Decoded User ID:', userId);
    // } else {
    //     console.error('No token found in localStorage');
    // }



    //display booking
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            const response = await fetch(`https://d983f4ac-fa45-4cd9-ad8f-72a9e77a4584-00-1b81doay5gvy8.pike.replit.dev/womanicure/user/${userId}`);
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    //update booking
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({});

    const handleEdit = (booking) => {
        setCurrentBooking(booking);
        setShowEditModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBooking({
            ...currentBooking,
            [name]: value
        });
    }

    const handleSaveChange = async () => {
        try {
            await axios.put(`https://d983f4ac-fa45-4cd9-ad8f-72a9e77a4584-00-1b81doay5gvy8.pike.replit.dev/womanicure/${currentBooking.id}`, currentBooking)
            setShowEditModal(false);
            const response = await axios.get(`https://d983f4ac-fa45-4cd9-ad8f-72a9e77a4584-00-1b81doay5gvy8.pike.replit.dev/womanicure`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error updating booking", error);
        }
    };

    //delete booking
    const handleDelete = async (bookingId) => {
        const token = localStorage.getItem("authToken")
        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            user_id: userId
        };

        try {
            await axios.delete(`https://d983f4ac-fa45-4cd9-ad8f-72a9e77a4584-00-1b81doay5gvy8.pike.replit.dev/womanicure/${bookingId}`, data)
            setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
        } catch (error) {
            console.log("Error", error);
        }
    };


    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                {loading && (<Spinner animation='border' className='ms-3 mt-3' style={{ color: '#8B4513' }} />)}
            </div>
            <h3>Your Booking</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ alignContent: 'center' }}>No.</th>
                        <th>Primary Service</th>
                        <th>Secondary Service</th>
                        <th style={{ alignContent: 'center' }}>Date</th>
                        <th style={{ alignContent: 'center' }}>Time</th>
                        <th style={{ alignContent: 'center' }}>Name</th>
                        <th>Phone No.</th>
                        <th>Special Request</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && bookings.length > 0 && bookings.map((booking, index) => (
                        <tr key={index}>
                            {/* <tr key={index}> */}
                            {/* <td>{index + 1}</td> */}
                            <td style={{ alignContent: 'center' }}>{index + 1}</td>
                            <td style={{ alignContent: 'center' }}>{booking.primary_service}</td>
                            <td style={{ alignContent: 'center' }}>{booking.secondary_service}</td>
                            <td style={{ alignContent: 'center' }}>{booking.date}</td>
                            <td style={{ alignContent: 'center' }}>{booking.time}</td>
                            <td style={{ alignContent: 'center' }}>{booking.name}</td>
                            <td style={{ alignContent: 'center' }}>{booking.phone_number}</td>
                            <td style={{ alignContent: 'center' }}>{booking.special_request}</td>
                            <td>
                                <Button
                                    variant='secondary'
                                    onClick={() => handleEdit(booking)}
                                    style={{ backgroundColor: '#FFE5B4', border: 'none', color: '#900C3F', width: '40px', marginRight: '3px' }}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button
                                    variant='danger'
                                    style={{ backgroundColor: '#FAA0A0', border: 'none', color: '#900C3F', width: '40px' }}
                                    onClick={() => handleDelete(booking.id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
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
                                // onChange={(e) => setPrimaryService(e.target.value)}
                                name='primary_service'
                                value={currentBooking.primary_service}
                                onChange={handleChange}
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
                                name='secondary_service'
                                value={currentBooking.secondary_service}
                                onChange={handleChange}
                            // onChange={(e) => setSecondaryService(e.target.value)}
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
                                // onChange={(e) => setDate(e.target.value)}
                                name='date'
                                value={currentBooking.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name='time'
                                value={currentBooking.time}
                                onChange={handleChange}
                            // onChange={(e) => setTime(e.target.value)}
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
                                name='name'
                                value={currentBooking.name}
                                onChange={handleChange}
                            // onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={currentBooking.phone_number}
                                onChange={handleChange}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="specialRequest">
                            <Form.Label>Special request</Form.Label>
                            <Form.Control
                                type="text"
                                name='special_request'
                                value={currentBooking.special_request}
                                onChange={handleChange}
                            // onChange={(e) => setSpecialRequest(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: '#FAA0A0', border: 'none', color: '#900C3F' }} onClick={() => setShowEditModal(false)}>
                        <strong>Close</strong>
                    </Button>
                    <Button style={{ backgroundColor: '#FFE5B4', border: 'none', color: '#900C3F' }} onClick={handleSaveChange}>
                        <strong>Save Changes</strong>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
