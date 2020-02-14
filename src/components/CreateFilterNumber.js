import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from '../context/PlanetsContext.js';

const renderSelectFilter = (changeColumn, hideFilters) => (
  <select data-testid="select" onChange={(e) => changeColumn(e.target.value)}>
    <option value="" />
    {hideFilters.includes('population') || <option value="population">População</option>}
    {hideFilters.includes('orbital_period') || <option value="orbital_period">Duração da Orbita</option>}
    {hideFilters.includes('diameter') || <option value="diameter">Diametro</option>}
    {hideFilters.includes('rotation_period') || <option value="rotation_period">Duração da Rotação</option>}
    {hideFilters.includes('surface_water') || <option value="surface_water">Superficie de Água</option>}
  </select>
);

const renderRadioButton = (value, changeComparison) => (
  <div>
    <input
      data-testid="radio-comparison-maior"
      type="radio"
      checked={value === 'Maior que'}
      name="comparison"
      value="Maior que"
      onClick={(e) => changeComparison(e.target.value)}
    />
    Maior que
    <input
      data-testid="radio-comparison-menor"
      type="radio"
      checked={value === 'Menor que'}
      name="comparison"
      value="Menor que"
      onClick={(e) => changeComparison(e.target.value)}
    />
    Menor que
    <input
      data-testid="radio-comparison-igual"
      type="radio"
      checked={value === 'Igual a'}
      name="comparison"
      value="Igual a"
      onClick={(e) => changeComparison(e.target.value)}
    />
    Igual a
    </div>
);

const renderInputNumber = (value, changeValue) => (
  <div>
    <label htmlFor="inputNumber">
      Números:
    <input
      data-testid="input-value"
      id="inputNumber"
      value={value}
      type="number"
      onChange={(e) => changeValue(e.target.value)}
    />
    </label>
  </div>
);

const renderButtonAdd = (sendValues) => (
  <input
    data-testid="input-button-add"
    id="inputNumber"
    type="button"
    value="Adicionar Filtro"
    onClick={() => sendValues()}
  />
);


const CreateFilterNumber = ({
  comparison,
  value,
  changeValue,
  changeComparison,
  changeColumn,
  sendValues,
}) => {
  const { filters } = useContext(PlanetsContext);
  if (filters.length === 5) return (<div><h2>Todos os Filtros já foram selecionados</h2></div>);
  const hideFilters = filters.map((filter) => filter.column);
  return (
    <div>
      <div>
        {renderSelectFilter(changeColumn, hideFilters)}
        {renderRadioButton(comparison, changeComparison)}
        {renderInputNumber(value, changeValue)}
        {renderButtonAdd(sendValues)}
      </div>
    </div>
  );
};

CreateFilterNumber.propTypes = {
  value: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  changeColumn: PropTypes.func.isRequired,
  changeComparison: PropTypes.func.isRequired,
  sendValues: PropTypes.func.isRequired,
};

export default CreateFilterNumber;
