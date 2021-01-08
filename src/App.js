import React from 'react';
import './sass/App.sass';


import Display from './components/Display'
import KeyBoard from './components/KeyBoard';
import { ActionContextProvider } from './contexts/ActionProvider';



function App() {


  return (
    <div className='App'>
      <div className='calculator'>
        <ActionContextProvider>
          <Display />
          <KeyBoard />
        </ActionContextProvider>
      </div>
    </div>
  );
}

export default App;
