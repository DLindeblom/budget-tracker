import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";  
import { Button, Card, Container, Row } from 'react-bootstrap';

export default function LoginButton() {

  const { loginWithRedirect } = useAuth0();
  return (
    <div className="d-flex vh-100" style={{background: "linear-gradient(to right, rgba(106, 133, 182, 0.5), rgba(186, 200, 224, 0.5)"}}>
      <Row className="m-auto align-self-center">
        <Card style={{ width: '25rem' }} className="text-center shadow p-3 mb-5 bg-body rounded">
          <Card.Body className="">
            <Card.Title>
              This is the Title
            </Card.Title>
            <Card.Text>
              welcome to the app!
            </Card.Text>

            <Button variant='secondary' onClick={() => loginWithRedirect()}>Log In</Button>
            <div>Or</div>
            <Button variant="secondary" onClick={() => loginWithRedirect({screen_hint: 'signup'})}>Sign Up</Button>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );

}
