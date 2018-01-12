import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { fakeAuth } from '../fakeAuth'

export class AuthButton extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)

  }

  render () {
    const {history} = this.props

    return (
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!
          <button onClick={ () => {
            fakeAuth.signout(() => history.push('/'))
          } }>Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    )
  }
}

export default withRouter(AuthButton)