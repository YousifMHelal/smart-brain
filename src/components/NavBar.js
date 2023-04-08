import React from 'react'

const NavBar = ({ onRouteChange, isSignedIn }) => { 
    if (isSignedIn) {
        return (
            <nav className='d-flex justify-content-end m-2'>
                <p role="button" className='fs-3 text-black-50 text-decoration-none' onClick={() => onRouteChange('signin')}>Sign out</p>
            </nav>
        )
    }
}

export default NavBar