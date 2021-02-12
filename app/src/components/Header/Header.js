import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import auth from '../../utils/auth'
import './Header.sass'

class Header extends Component {

    handleLogOut = () => {
        auth.logOutUser()
        sessionStorage.clear()
        return this.props.history.push('/login')
    }

    render() {
        const { handleLogOut } = this

        return <header className="header">
        {/* <Link to="/home">Go Home</Link> */}
        <p onClick={handleLogOut}>Logout</p>
        </header>
    }
}

export default withRouter(Header)