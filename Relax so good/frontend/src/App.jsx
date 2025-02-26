import { useState } from 'react'
import './App.css'
import '../styles/styles.css';


function App() {
  const [ageVerified, setAgeVerified] = useState(false);

  return (
    <>
      {!ageVerified && <AgeVerification onConfirm={() => setAgeVerified(true)} />}
      {ageVerified && <h1>Bienvenue sur le site !</h1>}
    </>
  );
}
export default App
