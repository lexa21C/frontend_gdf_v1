import React from "react";
import * as Reactstrap from "reactstrap";
import { useArtiffactsContext } from '../../../context/artiffacts/artiffactsContext.js';

const Item = () => {
    const {
        artiffacts,
        Edit2, // Replace with the actual implementation
        deletes1, // Replace with the actual implementation
    } = useArtiffactsContext();

    return (
        <>
            {artiffacts && artiffacts.artiffacts && artiffacts.artiffacts.map((item, index) => (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th scope="row text-white"><p color="primary">{item.name}</p></th>
                    <td>{item.description}</td>
                    <td>
                        <Reactstrap.Button
                            color="primary"
                            type="button"
                            className="btn-neutral  btn-sm m-0"
                            onClick={() => Edit2(item)}
                            id={`icon1${item._id}`}
                        >
                            <i className="fa-solid fa-pencil"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                            delay={0}
                            target={`icon1${item._id}`}
                        >
                            Editar
                        </Reactstrap.UncontrolledTooltip>
                        <Reactstrap.Button
                            color="primary"
                            type="button"
                            className="btn-neutral  btn-sm m-3"
                            onClick={() => deletes1(item._id)}
                            id={`icon1${item.borrar}`}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </Reactstrap.Button>
                        <Reactstrap.UncontrolledTooltip
                            delay={0}
                            target={`icon1${item.borrar}`}
                        >
                            Eliminar
                        </Reactstrap.UncontrolledTooltip>
                    </td>
                </tr>
            ))}
        </>
    );
};

export { Item };
