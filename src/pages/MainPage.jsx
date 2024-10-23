
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import AddBooking from "../components/AddBooking";
import BookingTable from "../components/BookingTable";
// import { Provider } from "react-redux";




export default function MainPage() {
    // console.log('User ID:', user_id);
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }


    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    const handleLogout = () => {
        setAuthToken(""); //clear token from localStorage 
    };

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    return (
        <>

            <Navbar expand="lg" style={{ backgroundColor: '#FFE5B4' }}>
                <Container>
                    <Navbar.Brand href="#home"> <strong style={{ color: '#C21E56' }}>W</strong>O<strong style={{ color: '#C21E56' }}>M</strong>ANICURE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link> */}
                            {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        </Nav>
                        <Button style={{ color: '#630330', backgroundColor: '#FAA0A0', border: 'none' }} className="justify-content-end" onClick={handleLogout}>
                            <strong>Log Out</strong>
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <Container>
                <div className="d-flex justify-content-end" style={{ padding: '30px 0' }}>
                    <Button style={{ backgroundColor: '#FBEC5D', border: 'none', color: '#900C3F', padding: '10px 20px' }} onClick={handleShow}> <strong>Add Booking</strong></Button>
                    <AddBooking show={show} handleClose={handleClose} />
                </div>
                <div className="table">
                    <h3 style={{ color: '#811331' }}>Booking List</h3>
                    <BookingTable />
                </div>
            </Container>
        </>
    );
}
