import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(10)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz"

    if(number){
      str += "01234567890"
    }
    if(character){
      str += "!@#$%&?"
    }

    for (let i = 1; i <= length; i++) {
      let generatedPassword = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(generatedPassword)
    }
    setPassword(pass)

  },[length, number, character, setPassword])

  useEffect(() =>{passwordGenerator()},[length, number, character, passwordGenerator])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[[password]])
  
  const passwordRef = useRef(null)

  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-blue-300'>
        <h1 className=' font-extrabold text-center mb-2'>Password Generator &#128272;</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" className='outline-none w-full py-1 px-3' value={password} placeholder='Password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900' onClick={copyPassword}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" className='cursor-pointer' min={8} max={40} value={length} onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='font-bold'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={number} id="numberInput" onChange={() => { setNumber((prev) => !prev); }}/>
            <label className='font-bold' htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={character} id="characterInput" onChange={() => { setCharacter((prev) => !prev )}}/>
            <label className='font-bold' htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
