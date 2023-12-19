import { useState } from 'react'
import './App.css'
import phoneimg from "./assets/phoneimg.png"

import DashBoard from "./views/Dashboard"

function App() {

  return (
    <>
      <div id='APP' 
        style={{width: "375px", height: "640px"}}
        // style={{ height: "640px", backgroundImage: `url(${phoneimg})`, backgroundSize: "100% 100%" , backgroundRepeat: "no-repeat"}}
        >

    <DashBoard />
        </div>
    </>
  )
}

export default App
