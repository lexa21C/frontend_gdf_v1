import { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import { useParams } from 'react-router-dom';
import axios from "axios";

import Modal from "./modal.js"
import ModalQuarter from "./modalQuarter";

import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import routes from "../../routes.js";
import AlertModal from '../../components/Alert/ALertModalCuestion.js';
import Header from "components/Headers/HEAD.js";


const Container = ({ leftContent, rightContent }) => {

    return (
      <>
        <Reactstrap.Container className="mt--7" fluid>
          <Reactstrap.Row>
            <Reactstrap.Col className="mb-5 mb-xl-0" xl="8">
            {leftContent}
            </Reactstrap.Col>

            <Reactstrap.Col xl="4">
                {rightContent}
            </Reactstrap.Col>
          </Reactstrap.Row>
        </Reactstrap.Container>
      </>
    );
};

export {Container};
