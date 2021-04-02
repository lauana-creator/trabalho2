/* eslint no-use-before-define: 0 */
import React from 'react'
import logo from '../img/logo.png'
import './index.css';




function Title() {
  return (
    <div className='Header'>
      <img className='logo' src={logo} alt='logo dom lucca'/>   
    </div>
  )
}

export default Title