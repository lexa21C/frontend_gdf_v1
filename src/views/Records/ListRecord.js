import * as Reactstrap from "reactstrap";
import Header from "../../components/Headers/HEAD";
import PaginationData from "../../components/Pagination/pagination.js";
import Search from "../../components/Search/search";
import Modal from "./modal.js";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import routes from "../../routes.js";
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'
import ModalDetail from '../Records/ModalDetail.js'
import { useRecordsContext } from '../../context/records/recordsContext.js';



const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find(route => route.name === routeName);

  if (!matchingRoute) {
    return null;
  }

  const { path, layout, icon, name: routeDisplayName } = matchingRoute;

  const getModifiedPath = (path, data, name) => {
    let modifiedPath = path;

    if (data !== null) {
      const dataStartIndex = path.indexOf('=/:');
      const dataEndIndex = path.indexOf('/&');
      modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(dataEndIndex)}`;
    }

    if (name !== undefined && name !== null) { // Verifica si name no es undefined
      const nameStartIndex = modifiedPath.indexOf('&/:');
      modifiedPath = `${modifiedPath.slice(0, nameStartIndex)}&/${name}`;
    }

    return modifiedPath;
  };

  const modifiedPath = getModifiedPath(path, data, name);

  return (
    <>
      <Reactstrap.Button
        color="primary"
        type="button"
        className="btn-neutral btn-sm"
        onClick={(e) => {
          e.preventDefault();
        }}
        id={`tooltip${data + path.length}`}
      >
        <NavLink
          to={`${layout}${modifiedPath}`}
          tag={NavLinkRRD}
          activeClassName="active"
          className="p-0"
        >
          <i className={icon} />
        </NavLink>
      </Reactstrap.Button>
      <Reactstrap.UncontrolledTooltip
        delay={0}
        target={`tooltip${data + path.length}`}
      >
        {routeDisplayName}
      </Reactstrap.UncontrolledTooltip>
    </>
  );
};

function List({children}) {
  return (
    <>
              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Ficha</th>
                    <th scope="col">Fecha Inicial</th>
                    <th scope="col">Fecha final</th>
                    <th scope="col">Instructor</th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {children}
                </tbody>
              </Reactstrap.Table>

    </>
  );
}
export {List}