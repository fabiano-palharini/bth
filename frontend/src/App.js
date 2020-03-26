// import React, {useState} from 'react';
import React from 'react';
// import Header from './Header';
// import Logon from './pages/Logon';
import './global.css';
import Routes from './routes';

function App() {
  // let [counter, setCounter] = useState(0);

  // function increment(){
  //   setCounter(counter + 1);
  //   console.log(counter);
  // }

  return (
    <Routes />
    // <Logon />
    // <div>
    // <Header title="Page title">Children</Header>
    // <Header title="Page title">{counter}</Header>
    // <button onClick={increment}>Incrementar</button>
    // </div>
  );
}

export default App;
