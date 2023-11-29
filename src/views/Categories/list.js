import * as Reactstrap from 'reactstrap';

function List({ children }) {
  return (
    <Reactstrap.Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categorías</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {children}
                </tbody>
              </Reactstrap.Table>
  );
}

export { List };

