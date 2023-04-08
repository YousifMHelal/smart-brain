import React from 'react'
import Tilt from 'react-parallax-tilt';
import logo from '../images/logo.png'

const Logo = () => {
    return (
        <div className='mx-5'>
            <Tilt className='tilt rounded-pill shadow'  glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius="20px">
                <img src={logo} alt='logo'/>
            </Tilt>
        </div>
    )
}

export default Logo