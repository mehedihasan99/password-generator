import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  // & useRef hook
  const passwordRef = useRef()
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) {
      str += '0123456789'
    }
    if (charAllowed) {
      str += '!@#$%^&*()_+'
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])
  const handlePasswordCopy = useCallback(() => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <section className="p-3">
        <div className="w-full max-w-md  md:mx-auto shadow-md rounded-lg  px-4 py-6 my-8 bg-gray-500  text-orange-400 ">
          <h1 className="text-center text-white mb-2">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              ref={passwordRef}
              value={password}
              className="w-full px-3 py-1"
              placeholder="Password"
              readOnly
            />
            <button
              onClick={handlePasswordCopy}
              className="
            outline-none bg-blue-700 px-2 py-1 text-white hover:bg-orange-400"
            >
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={numAllowed}
                id="numInput"
                onChange={(e) => setNumAllowed(e.target.checked)}
              />
              <label htmlFor="numInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={(e) => setCharAllowed(e.target.checked)}
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
