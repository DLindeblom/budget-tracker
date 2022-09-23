import React from 'react'
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


export default function LogoutButton() {

  const { logout } = useAuth0();

  return (
    <Button variant="danger" onClick={() => logout({ returnTo: 'http://localhost:3000/login'}) }>
      Log Out
    </Button>
  )
}
