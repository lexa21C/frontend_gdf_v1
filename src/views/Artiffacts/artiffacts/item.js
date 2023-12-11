import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import { useArtiffactsContext} from '../../../context/artiffacts/artiffactsContext.js'

const Item = () => {
   
  const {
    
    data,
    setQuarter,
    deletes,
    toggle3,
    Edit

  } =  useArtiffactsContext()


    return (
      <>
        {data?.map((e) =>
          e?.quarters.map((r, index) => (
            <tr key={r._id}>
              <th>{index + 1}</th>
              <td onClick={() => setQuarter(r)}>{r.number}</td>
              <td>
                <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-neutral  btn-sm m-0"
                  onClick={() => Edit(r)}
                  id={`icon1${r._id}`}
                >
                  <i className="fa-solid fa-pencil"></i>
                </Reactstrap.Button>
                <Reactstrap.UncontrolledTooltip
                  delay={0}
                  target={`icon1${r._id}`}
                >
                  Editar
                </Reactstrap.UncontrolledTooltip>
                <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-neutral  btn-sm m-3"
                  onClick={() => deletes(r._id)}
                  id={`icon1${r.borrar}`}
                >
                  <i className="fa-solid fa-trash"></i>
                </Reactstrap.Button>
                <Reactstrap.UncontrolledTooltip
                  delay={0}
                  target={`icon1${r.borrar}`}
                >
                  Eliminar
                </Reactstrap.UncontrolledTooltip>
                <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-neutral btn-sm m-0"
                  onClick={toggle3} // Asegúrate de que la función toggle3 controle el estado mostrarBoton
                >
                  <i className="fa-solid fa-desktop" id="iconoArtefactos" />
                </Reactstrap.Button>
                <Reactstrap.UncontrolledTooltip
                  target="iconoArtefactos"
                  placement="bottom"
                >
                  Artefactos
                </Reactstrap.UncontrolledTooltip>
              </td>
            </tr>
          ))
        )}
      </>
    );
};

export {Item};
