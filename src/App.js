import React from 'react';
import { Provider } from './context/PlanetsContext.js';
import Table from './components/Table';
import Filters from './components/Filters';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
