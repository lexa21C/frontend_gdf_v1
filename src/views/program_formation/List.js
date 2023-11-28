import * as Reactstrap from "reactstrap";
// core components
import Head from "../../components/Headers/HEAD";
import axios from "axios";
import PaginationData from "../../components/Pagination/pagination.js";
import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from "react-router-dom";
import routes from "../../routes.js";
import Search from "../../components/Search/search"
import Loading from "../../components/loader/loader.js"
import CreateProgramModal from "../program_formation/CreateProgram";

const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find((route) => route.name === routeName);

  if (!matchingRoute) {
    return null;
  }

  const { path, layout, icon, name: routeDisplayName } = matchingRoute;

  const getModifiedPath = (path, data, name) => {
    let modifiedPath = path;

    if (data !== null) {
      const dataStartIndex = path.indexOf("=/:");
      const dataEndIndex = path.indexOf("/&");
      modifiedPath = `${path.slice(0, dataStartIndex)}=/${data}${path.slice(
        dataEndIndex
      )}`;
    }

    if (name !== null) {
      const nameStartIndex = modifiedPath.indexOf("&/:");
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

async function getData(_id) {
  const { data } = await axios.get(`api/v1/formation_programs/${_id}`);
  return data.results;
}

export default function List() {
  const [program, setProgram] = useState([]);
  const [programs, setPrograms] = useState([]);


  const [toggleModal, setmodalt] = useState();
  //bucador
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState(false)

  //select para editar 
  const [selectedResult, setSelectedResult] = useState(null);
  // pagination data
  const totalProgram = program?.length;
  const [PerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;

  const user =JSON.parse(localStorage.getItem("User"));

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    async function fetchData() {
      const results = await getData(user._id);
      setProgram(results);
      setTimeout(()=>{
        setIsLoading(false)
      },500)
    }
    fetchData();
  }, [searchTerm]);

  return (
    <>
         {isLoading && <Loading  />}
      <Head title1="Programa Formacion" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
              <Reactstrap.Button
                  color="primary"
                  type="button"
                  className="btn-circle btn-neutral "
                  onClick={toggle}
                >
                  <i className="ni ni-fat-add" />
                </Reactstrap.Button>
                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Programa Formación"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Versión</th>
                    <th scope="col">Duración </th>
                    <th scope="col">Nivel de programa </th>
                    <th scope="col">Acciones </th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {program?.filter((programs) =>
                    Object.values(programs)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).slice(firstIndex, lastIndex)
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">
                              <span className="mb-0 text-sm">
                                {data.program_code}
                              </span>
                            </Reactstrap.Media>
                          </th>
                          <td>{data.program_name}</td>
                          <td>{data.program_version}</td>
                          <td>{data.total_duration}</td>
                          <td>{data.program_level.program_level}</td>
                          <td>
                            <Reactstrap.UncontrolledDropdown className="mr-2">
                              {Butonn('Fichas', data._id, data.program_name)}
                            </Reactstrap.UncontrolledDropdown>


                            <Reactstrap.UncontrolledDropdown>
                              {Butonn('Artefactos', data._id, data.program_name)}
                            </Reactstrap.UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Reactstrap.Table>

              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalProgram}
                  />
                </nav>
              </Reactstrap.CardFooter>
              <CreateProgramModal
                isOpen={modalOpen}
                toggle={toggle}
                programs={programs}
                handleSaveClick={() => {
                  // Lógica para guardar el nuevo programa
                  // Puedes implementar esta lógica según tus necesidades
                }}
              />
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
    </>
  );
}