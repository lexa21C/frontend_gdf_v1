import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";

const Card = ({children}) => {

    const [quarter, setQuarter] = useState([])
    const [typeQuarter, setTypeQuarter] = useState(false)
    const [modalQuarter, setModalQuarter] = useState(false)

    const toggle2 = () => {
        setModalQuarter(!modalQuarter)
        setTypeQuarter(false)

    };
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

export default Card;
