import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <div className="containerPage">
      <Provider>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
// teste
