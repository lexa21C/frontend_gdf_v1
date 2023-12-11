import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import { useArtiffactsContext} from '../../../context/artiffacts/artiffactsContext.js'


const Card = ({children}) => {
    
    const {
 
        mostrarBoton,
  
        toggle
  
  
      } =  useArtiffactsContext()
    return (

            <Reactstrap.Card className="shadow">
                <Reactstrap.CardHeader className="bg-transparent">
                    <Reactstrap.Row className="align-items-center">
                        <div className="col">
                            {mostrarBoton && (
                                <Reactstrap.Button
                                    color="primary"
                                    type="button"
                                    className="btn-circle btn-neutral"
                                    onClick={toggle}
                                >
                                    <i className="ni ni-fat-add" />
                                </Reactstrap.Button>
                            )}
                        </div>
                    </Reactstrap.Row>
                </Reactstrap.CardHeader>
                <Reactstrap.CardBody>
                    {children}
                </Reactstrap.CardBody>
            </Reactstrap.Card>
                           
    );
};
export {Card};
