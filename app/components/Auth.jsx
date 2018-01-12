import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import Protected from './Protected'
import Public from './Public'
import AuthButton from './AuthButton'
import Login from './Login'
import { fakeAuth } from '../fakeAuth'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route { ...rest } render={ props => (
    fakeAuth.isAuthenticated ? (
      <Component { ...props }/>
    ) : (
      <Redirect to={ {
        pathname: '/login',
        state: {from: props.location},
      } }/>
    )
  ) }/>
)
const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={ Public }/>
      <Route path="/login" component={ Login }/>
      <PrivateRoute path="/protected" component={ Protected }/>
    </div>
  </Router>
)
export default AuthExample