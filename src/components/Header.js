import React, { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/PlanetsContext.js';


const Header = () => {
  const { fetchPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchPlanets();
  });

  return (
    <h1>
      PLANETAS DO STAR WARS SHOW
      </h1>
  );
};


export default Header;
