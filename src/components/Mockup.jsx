import React from 'react'
import '../devices.min.css'

const Mockup = () => {
  return (
    <div className="marvel-device iphone-x">
      <div className="notch">
        <div className="camera"></div>
        <div className="speaker"></div>
      </div>
      <div className="top-bar"></div>
      <div className="sleep"></div>
      <div className="bottom-bar"></div>
      <div className="volume"></div>
      <div className="overflow">
        <div className="shadow shadow--tr"></div>
        <div className="shadow shadow--tl"></div>
        <div className="shadow shadow--br"></div>
        <div className="shadow shadow--bl"></div>
      </div>
      <div className="inner-shadow"></div>
      <div className="screen">
        <h1 className="text-2xl font-bold text-center mt-4">Demo Content</h1>
      </div>
    </div>
  )
}

export default Mockup
