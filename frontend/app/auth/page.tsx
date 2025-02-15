import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function page() {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <Col md={4}>
          <div className="text-center">
            <h3>Login with Google</h3>
            <form action="/api/auth/google">
              <Button variant="primary" type="submit">
                Login with Google
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
