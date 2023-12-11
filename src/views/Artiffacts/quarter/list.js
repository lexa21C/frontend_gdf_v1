import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";



const List = ({children}) => {

  
    return (
      
                                            <Reactstrap.Table className="align-items-center table-flush bg-white shadow" responsive>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">N°</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Descripcion</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {children}
                                                </tbody>
                                            </Reactstrap.Table>

    );
};

export  {List};
