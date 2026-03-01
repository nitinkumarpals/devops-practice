import { useState } from 'react'
import './App.css'

function App() {

  const [data,setData] = useState("")

  const callBackend = async () => {

    try{

      const res = await fetch("/api")

      const text = await res.text()

      setData(text)

    }catch(err){

      setData("Backend not reachable")

    }

  }

  return (

    <div style={{textAlign:"center",marginTop:"50px"}}>

      <h1>React + Node + Mongo + Redis</h1>

      <button onClick={callBackend}>
        Test Backend
      </button>

      <h2>{data}</h2>

    </div>

  )

}

export default App