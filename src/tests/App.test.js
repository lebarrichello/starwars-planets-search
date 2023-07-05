import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import PlanetsProvider from '../context/Provider';
import userEvent from '@testing-library/user-event';
import { compareBy, filterBy, sortBy } from '../services/helperFunctions';


describe('Testes para o componente Table', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('Verifica se o cabeçalho da tabela e os planetas são renderizados corretamente', async () => {
    const headersAPI = Object.keys(mockData.results[0]);
    const headers = await screen.findAllByRole('columnheader');
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(headersAPI[index]);
    })
  });
})

describe('Testes para o componente Filters', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('Verifica se o filtro por nome funciona corretamente', () => {
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'be');
    const rowsTable = screen.getAllByRole('row');
    expect(rowsTable.length).toBe(2);
  })

  it('Verifica se o filtro por valores funciona corretamente', () => {
    const selectColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'orbital_period');
    expect(selectColumn.value).toBe('orbital_period');
  
    const selectComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(selectComparison, 'menor que');

    const valueInput = screen.getByTestId('value-filter');
    userEvent.type(valueInput, '350');

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    const rowsTableOne = screen.getAllByRole('row');
    expect(rowsTableOne.length).toBe(4);

  
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(valueInput, '10000');
    userEvent.click(btnFilter);
    const rowsTableTwo = screen.getAllByRole('row');
    expect(rowsTableTwo.length).toBe(3);

   
    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(valueInput, '23');
    userEvent.click(btnFilter);
    const rowsTableThree = screen.getAllByRole('row');
    expect(rowsTableThree.length).toBe(2); 
  })

  it('Verifica se ao selecionar todos os filtros possíveis, o dropdown de colunas fica sem nenhuma option', () => {
    const btnFilter = screen.getByTestId('button-filter');
    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn.options.length).toBe(5);

    for (let index = 0; index < 5; index += 1) {
      userEvent.click(btnFilter);
    }
    expect(selectColumn.options.length).toBe(0);
  })


  describe('compareBy', () => {
    test('deve retornar true quando a é maior que b', () => {
      expect(compareBy['maior que'](2, 1)).toBe(true);
    });
  
    test('deve retornar true quando a é menor que b', () => {
      expect(compareBy['menor que'](1, 2)).toBe(true);
    });
  
    test('deve retornar true quando a é igual a b', () => {
      expect(compareBy['igual a'](2, 2)).toBe(true);
    });
  });
  
  describe('filterBy', () => {
    test('deve retornar true quando todas as comparações numéricas forem verdadeiras', () => {
      const numericFilters = [
        { column: 'population', comparison: 'maior que', value: '1000000' },
        { column: 'diameter', comparison: 'menor que', value: '5000' },
      ];
  
      const planet = {
        population: '1500000',
        diameter: '4000',
      };
  
      expect(filterBy.numeric(numericFilters, planet)).toBe(true);
    });
  
    test('deve retornar true quando o nome do planeta contiver o texto fornecido', () => {
      const name = 'Bespin';
  
      const planet = {
        name: 'Bespin',
      };
  
      expect(filterBy.name(name, planet)).toBe(true);
    });
  });
  
  describe('sortBy', () => {
    test('deve retornar -1 quando a é menor que b (ordem ascendente)', () => {
      expect(sortBy.ASC(1, 2)).toBe(-1);
    });
  
    test('deve retornar 1 quando a é maior que b (ordem ascendente)', () => {
      expect(sortBy.ASC(2, 1)).toBe(1);
    });
  
    test('deve retornar -1 quando a é maior que b (ordem descendente)', () => {
      expect(sortBy.DESC(2, 1)).toBe(-1);
    });
  
    test('deve retornar 1 quando a é menor que b (ordem descendente)', () => {
      expect(sortBy.DESC(1, 2)).toBe(1);
    });
  });
});