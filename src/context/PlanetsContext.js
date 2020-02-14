import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import getStarWarsPlanets from '../services/starWarsApi';

const PlanetsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState({ planets: [], sucess: false });
  const [filterName, setFilterName] = useState('');
  const [filters, setFilters] = useState([]);

  const fetchPlanets = () => {
    if (data.sucess) return;
    getStarWarsPlanets()
      .then((value) => {
        setData({ planets: value.results, sucess: true });
      });
  };

  const context = {
    data,
    setData,
    filterName,
    setFilterName,
    filters,
    setFilters,
    fetchPlanets,
  };

  return (
    <PlanetsContext.Provider value={context}>
      {children}
    </PlanetsContext.Provider>
  );
};

export { PlanetsContext, PlanetsProvider as Provider };

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
