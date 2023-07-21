import React, { useContext } from 'react';
import Context from '../context/Context';
import Filters from './Filters';
import '../styles/Table.css';

function Table() {
  const { tbColumns } = useContext(Context);
  const { data } = useContext(Context);

  return (
    <div className="container__table">
      <Filters />
      <div>
        <table className="table">
          <thead>
            <tr>
              { tbColumns.map((column) => (
                <th key={ column }>{ column }</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((planet) => (
              <tr data-testid="planet-name" key={ planet.name }>
                {
                  Object.entries(planet).map(([column, value]) => (
                    <td
                      data-th={ column }
                      key={ column }
                    >
                      {value}

                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
