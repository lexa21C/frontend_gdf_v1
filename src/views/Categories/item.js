
import * as Reactstrap from 'reactstrap';
function Item(props) {
  return (
    <tr key={props.index}>
                      <th>{1 + props.index}</th>
                      <th scope="row">
                        <Reactstrap.Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            {
                            props.name}
                          </span>
                        </Reactstrap.Media>
                      </th>
                      <td>
                        <Reactstrap.Button
                          color="primary"
                          type="button"
                          className="btn-neutral btn-sm"
                          id={`Catego${
                            props._id}`}
                        
                        >
                          <i className="fa-solid fa-edit"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                          delay={0}
                          target={`Catego${
                            props._id}`}
                        >
                          Editar
                        </Reactstrap.UncontrolledTooltip>
                        <Reactstrap.Button
                          color="primary"
                          type="button"
                          className="btn-neutral btn-sm"
                          
                          id={`icon2${
                            props.borrar}`}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                          delay={0}
                          target={`icon2${
                            props.borrar}`}
                        >
                          Eliminar
                        </Reactstrap.UncontrolledTooltip>
                      </td>
                    </tr>
  );
}

export { Item };