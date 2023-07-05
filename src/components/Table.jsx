import React, { useContext } from 'react';
import Context from '../context/Context';
import Filters from './Filters';

function Table() {
  const { tbColumns } = useContext(Context);
  const { data } = useContext(Context);

  return (
    <div className="containerTable">
      <Filters />
      <div>
        <table className="rTable">
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
