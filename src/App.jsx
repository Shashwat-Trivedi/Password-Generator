import { useCallback, useState , useEffect, useRef} from 'react'



function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
      
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numbersAllowed) {
      str += "1234567890";
    }

    if (charAllowed) {
      str += "!@#$%&*()-_=+[]{}/?";
    }

    let pass = "";

    for (let i = 1; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str[index];
      
    }
    setPassword (pass);
  },
  [length, numbersAllowed, charAllowed, setPassword ]
  )

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  } , [password])

useEffect(() => {passwordGenerator()}, [length, numbersAllowed, charAllowed, passwordGenerator])


  return  (
  <>
  <div className="min-w-225 w-fit m-auto my-5 text-center bg-gray-500 rounded-lg p-3">
    <h1 className="m-3 text-4xl text-red-300">Password Generator</h1>
    <p className='p-1 bg-gray-400 rounded-lg'>
      <input 
        className='min-w-190 bg-white rounded-lg m-2 text-lg p-1 w-fit' 
        type="text" 
        value={password} 
        readOnly 
        ref={passwordRef}/>
      <button 
        className="m-1 text-lg bg-red-600 p-1 rounded-lg min-w-20  shadow-gray-950 shadow  active:shadow-none"
        onClick={copyToClipboard}>
        Copy
       </button>
    </p>
    <div className="flex item-centre justify-start m-3">
      <div className="p-3">
          <input 
          type="range"
          min="6"
          max="100"
          value={length}
          onChange={(e) => {setLength(e.target.value)}}>

          </input>
        <label  className="m-1" >Length  {length}</label>
     </div>
     <div className="p-3">
        <input  
          className="m-1"
          type="checkbox" 
          defaultChecked={numbersAllowed}
          onChange={() => {setNumbersAllowed(!numbersAllowed)}}/>
          
        <label >Numbers</label>
     </div>
     <div className="p-3">
        <input 
          className="m-1" 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {setCharAllowed(!charAllowed)}} />
        <label >Symbols</label>
     </div>
   </div>
  </div>

  </>
  )
  
}

export default App
