import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import { useArtiffactsContext} from '../../../context/artiffacts/artiffactsContext.js'
function Card ({children}) {

    const {    
      quarter,
      toggle2

    } =  useArtiffactsContext()

    return (
      <Reactstrap.Card className="shadow">
        <Reactstrap.CardHeader className="bg-transparent">
          <Reactstrap.Row className="align-items-center col-12">
            <div className="col-6">
              <h2 className="mb-0">Trimestre :{quarter.number}</h2>
            </div>
            <div className="col-6">
              <Reactstrap.Button
                color="primary"
                type="button"
                className="btn-circle btn-neutral ml-8"
                onClick={toggle2}
              >
                <i className="ni ni-fat-add" />
              </Reactstrap.Button>
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
