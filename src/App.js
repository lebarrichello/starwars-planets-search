import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import AnimationSVG from './components/AnimationSVG';
import './styles/App.css';

function App() {
  return (
    <div className="containerPage">
      <Provider>
        <AnimationSVG />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
// teste
