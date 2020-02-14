import React, { useContext, useState } from 'react';
import CreateFilterNumber from './CreateFilterNumber';
import { PlanetsContext } from '../context/PlanetsContext.js';

const FilterNumbers = () => {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('0');

  const { setFilters, filters } = useContext(PlanetsContext);

  const sendValues = () => {
    const allColumn = filters.map((filter) => filter.column);
    if (column !== '' && comparison !== ''
      && !allColumn.includes(column)) {
      const obj = { column, comparison, value };
      setFilters([...filters, obj]);
    }
  };

  return (
    <div>
      <CreateFilterNumber
        changeValue={(newValue) => setValue(newValue)}
        changeComparison={(newComparison) => setComparison(newComparison)}
        changeColumn={(newColumn) => setColumn(newColumn)}
        column={column}
        comparison={comparison}
        value={value}
        sendValues={() => sendValues()}
      />
    </div>
  );
};

export default FilterNumbers;
