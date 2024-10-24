import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const loginImage = "https://firebasestorage.googleapis.com/v0/b/capstone-project-fac0a.appspot.com/o/profileImages%2Fmani2.jpg?alt=media&token=315f1582-9dc0-4b0b-b930-480823e4476c";
    const url = "https://a12b55ed-b54f-4496-a865-aa7375890cf8-00-28d47vlf86lh.sisko.replit.dev"

    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/main");
        }
    }, [authToken, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            if (res.data && res.data.user_id && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Signup was successful, token saved");
                // Save user_id in localStorage
                localStorage.setItem("user_id", res.data.user_id);
            }
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);//save token to local storage
                console.log("Login was successful, token saved");
                localStorage.setItem("user_id", res.data.user_id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setModalShow(null);

    return (
        <Row style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Col md={9} style={{ height: '100vh', overflow: 'hidden' }} className="p-0">
                <Image
                    src={loginImage}
                    fluid style={{
                        height: '100%',
                        objectFit: 'cover',
                        width: '100%',
                        overflow: 'hidden'
                    }}
                />
            </Col>
            <Col md={3} className="p-4" style={{ backgroundColor: '	#FFFF8F', boxSizing: 'border-box', margin: '0', padding: '0' }}>
                <div style={{ padding: '16px' }}>
                    <h7 className="d-flex justify-content-left" style={{ textAlign: "right" }}><strong style={{ color: '#C21E56' }}>W</strong>O<strong style={{ color: '#C21E56' }}>M</strong>ANICURE</h7>

                    <Row className="mt-3">
                        <Col md={6} style={{ width: '100%' }}>
                            <h3 className="mt-5">Let us take care of your nails!</h3>
                            <p className="mt-0 mb-5">We don&apos;t care if you&apos;re a <strong style={{ color: '#C21E56' }}>m</strong>an or <strong style={{ color: '#C21E56' }}>w</strong>oman</p>
                        </Col>

                        <Col md={8} style={{ width: '100%' }}>
                            <Row className="d-flex flex-column align-items-center gap-2 mt-5" style={{ flex: '8', textAlign: "center" }}>
                                <Button className="mt-5" variant="outline-dark" style={{ width: '300px', borderRadius: '10px', backgroundColor: '#F5F5DC' }}>
                                    <i className="bi bi-google"></i> Sign up with Google
                                </Button>
                                <Button variant="outline-dark" style={{ width: '300px', borderRadius: '10px', backgroundColor: '#F5F5DC' }}>
                                    <i className="bi bi-apple"></i> Sign up with Apple
                                </Button>
                                <p style={{ textAlign: "center" }}>or</p>
                                <Button onClick={handleShowSignUp} style={{ width: '300px', backgroundColor: '#C21E56', border: 'none', borderRadius: '10px' }}>
                                    <strong>Create an account</strong>
                                </Button>
                                <p style={{ fontSize: "12px", width: '320px', textAlign: "left" }}>
                                    By signing up, you agree to the Terms of Service and Privcy Policy including Cookie Use
                                </p>

                                <p className="mt-5" style={{ fontWeight: "bold" }}>
                                    Already have an account?
                                </p>
                                <Button onClick={handleShowLogin} style={{ width: '300px', color: '#800020', backgroundColor: '#FAA0A0', border: 'none', borderRadius: '10px' }}>
                                    <strong>Sign In</strong>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>


                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body style={{ backgroundColor: '#FAA0A0' }}>
                        <h2 className="mb-4" style={{ fontWeight: 'bold', textAlign: 'center', color: '#800020' }}>
                            {modalShow === "SignUp"
                                ? "Create an account"
                                : "Login to your account"}
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            {modalShow === "SignUp" && (
                                <p style={{ fontSize: "12px" }}>
                                    By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use. Womanicure may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                                </p>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button className="mt-3 mb-3" type="submit" style={{ backgroundColor: '#800020', border: 'none', width: '180px', borderRadius: '10px' }}>
                                    {modalShow === "SignUp" ? "Sign up" : "Log in"}
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}