import React from 'react';
import { render, fireEvent, waitForDomChange, cleanup } from '@testing-library/react';
import App from './App';


afterEach(cleanup);


test('Verify Title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('PLANETAS DO STAR WARS SHOW');
  expect(linkElement).toBeInTheDocument();
});

test('teste api', async () => {

  const { getByText, getByLabelText } = render(<App />);

  expect(getByText('CARREGANDO')).toBeInTheDocument();

  await waitForDomChange();

  const inputName = getByLabelText('Filtro name:');
  const planetDagobah = getByText('Dagobah');
  const planetHoth = getByText('Hoth');
  expect(planetDagobah).toBeInTheDocument();
  fireEvent.change(inputName, { target: { value: 'H' } })
  expect(planetDagobah).not.toBeInTheDocument();
  expect(planetHoth).toBeInTheDocument();
});

test('Adicionando o filtro numerico', async () => {
  const { getByText, getByTestId } = render(<App />);

  await waitForDomChange();

  const inputSelect = getByTestId('select');
  expect(inputSelect).toBeInTheDocument();

  const rdbEqual = getByTestId('radio-comparison-igual');
  expect(rdbEqual).toBeInTheDocument();

  const rdbLesser = getByTestId('radio-comparison-menor');
  expect(rdbLesser).toBeInTheDocument();

  const rdbGreater = getByTestId('radio-comparison-maior');
  expect(rdbGreater).toBeInTheDocument();

  const inputValue = getByTestId('input-value');
  expect(inputValue).toBeInTheDocument();

  const buttonAdd = getByTestId('input-button-add');
  expect(buttonAdd).toBeInTheDocument();

  const planetYavin = getByText('Yavin IV');
  expect(planetYavin).toBeInTheDocument();

  const planetAlderaan = getByText('Alderaan');
  expect(planetAlderaan).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  expect(planetAlderaan).not.toBeInTheDocument();
  expect(planetYavin).toBeInTheDocument();
});

test('Testando se filtro numerico aparece na tela', async () => {
  const { getByTestId, getByText, queryByText, getAllByTestId } = render(<App />);

  await waitForDomChange();

  const inputSelect = getByTestId('select');
  expect(inputSelect).toBeInTheDocument();

  const rdbEqual = getByTestId('radio-comparison-igual');
  expect(rdbEqual).toBeInTheDocument();

  const rdbLesser = getByTestId('radio-comparison-menor');
  expect(rdbLesser).toBeInTheDocument();

  const rdbGreater = getByTestId('radio-comparison-maior');
  expect(rdbGreater).toBeInTheDocument();

  const inputValue = getByTestId('input-value');
  expect(inputValue).toBeInTheDocument();

  const buttonAdd = getByTestId('input-button-add');
  expect(buttonAdd).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  expect(getByTestId('data-population')).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  expect(getAllByTestId('data-population').length).toBe(1);

  expect(getByTestId('data-population')).toBeInTheDocument();
  const planetYavin = getByText('Yavin IV');
  expect(planetYavin).toBeInTheDocument();

  expect(queryByText('Alderaan')).not.toBeInTheDocument();
});


test('Testando a filtragem com varios filtros', async () => {
  const { getByTestId, queryAllByTestId, queryByText, queryByTestId, getByText } = render(<App />);

  await waitForDomChange();

  const inputSelect = getByTestId('select');
  expect(inputSelect).toBeInTheDocument();

  const rdbEqual = getByTestId('radio-comparison-igual');
  expect(rdbEqual).toBeInTheDocument();

  const rdbLesser = getByTestId('radio-comparison-menor');
  expect(rdbLesser).toBeInTheDocument();

  const rdbGreater = getByTestId('radio-comparison-maior');
  expect(rdbGreater).toBeInTheDocument();

  const inputValue = getByTestId('input-value');
  expect(inputValue).toBeInTheDocument();

  const buttonAdd = getByTestId('input-button-add');
  expect(buttonAdd).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbGreater);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  expect(queryByText('Yavin IV')).not.toBeInTheDocument();
  expect(queryByText('Endor')).toBeInTheDocument();
  expect(getByTestId('data-population')).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'diameter' } });
  fireEvent.click(rdbEqual);
  fireEvent.change(inputValue, { target: { value: '4900' } });
  fireEvent.click(buttonAdd);

  expect(getByTestId('data-diameter')).toBeInTheDocument();
  expect(queryAllByTestId('remove-filter').length).toBe(2);
  expect(queryByText('Endor')).toBeInTheDocument();
  expect(queryByText('Bespin')).toBe(null);
  fireEvent.click(queryAllByTestId('remove-filter')[1]);
  expect(queryByTestId('data-diameter')).not.toBeInTheDocument();
  expect(queryAllByTestId('remove-filter').length).toBe(1);
  expect(getByText('Bespin')).toBeInTheDocument();

});

test('Testando caso nao encontre nenhum planeta', async () => {
  const { getByTestId, getByText, queryByText } = render(<App />);

  await waitForDomChange();

  const inputSelect = getByTestId('select');
  expect(inputSelect).toBeInTheDocument();

  const rdbEqual = getByTestId('radio-comparison-igual');
  expect(rdbEqual).toBeInTheDocument();

  const rdbLesser = getByTestId('radio-comparison-menor');
  expect(rdbLesser).toBeInTheDocument();

  const rdbGreater = getByTestId('radio-comparison-maior');
  expect(rdbGreater).toBeInTheDocument();

  const inputValue = getByTestId('input-value');
  expect(inputValue).toBeInTheDocument();

  const buttonAdd = getByTestId('input-button-add');
  expect(buttonAdd).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  fireEvent.change(inputSelect, { target: { value: 'diameter' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '0' } });
  fireEvent.click(buttonAdd);
  expect(queryByText('Alderaan')).not.toBeInTheDocument();
  expect(getByText('Planeta não encontrado')).toBeInTheDocument();
});

test('Testando mensagem caso digitem o maximo de filtros', async () => {
  const { getByTestId, getByText } = render(<App />);

  await waitForDomChange();

  const inputSelect = getByTestId('select');
  expect(inputSelect).toBeInTheDocument();

  const rdbEqual = getByTestId('radio-comparison-igual');
  expect(rdbEqual).toBeInTheDocument();

  const rdbLesser = getByTestId('radio-comparison-menor');
  expect(rdbLesser).toBeInTheDocument();

  const rdbGreater = getByTestId('radio-comparison-maior');
  expect(rdbGreater).toBeInTheDocument();

  const inputValue = getByTestId('input-value');
  expect(inputValue).toBeInTheDocument();

  const buttonAdd = getByTestId('input-button-add');
  expect(buttonAdd).toBeInTheDocument();

  fireEvent.change(inputSelect, { target: { value: 'population' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '3500' } });
  fireEvent.click(buttonAdd);

  fireEvent.change(inputSelect, { target: { value: 'diameter' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '0' } });
  fireEvent.click(buttonAdd);

  fireEvent.change(inputSelect, { target: { value: 'rotation_period' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '0' } });
  fireEvent.click(buttonAdd);

  fireEvent.change(inputSelect, { target: { value: 'surface_water' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '0' } });
  fireEvent.click(buttonAdd);

  fireEvent.change(inputSelect, { target: { value: 'orbital_period' } });
  fireEvent.click(rdbLesser);
  fireEvent.change(inputValue, { target: { value: '0' } });
  fireEvent.click(buttonAdd);

  expect(getByText('Todos os Filtros já foram selecionados')).toBeInTheDocument();
});
