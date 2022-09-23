import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export default function ProtectedRoute({ component }) {

  const Component = withAuthenticationRequired(component, {
      onRedirecting: () => <div>Loading...</div>
})

  return <Component />
   
 
}