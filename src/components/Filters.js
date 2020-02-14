import React from 'react';
import FilterNumbers from './FilterNumbers';
import FilterName from './FilterName';
import FiltersActive from './FiltersActive';

const Filters = () => (
  <div>
    <h2>Nome:</h2>
    <FilterName />
    <h4>Filtros</h4>
    <FiltersActive />
    <FilterNumbers />
  </div>
);


export default Filters;
