import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as Reactstrap from "reactstrap";
import { NavLink as NavLinkRRD } from "react-router-dom";
import Header from "components/Headers/HEAD.js";
import PaginationData from "../../components/Pagination/pagination.js";
import routes from "../../routes.js";
import Search from "../../components/Search/search";
import Loading from "../../components/loader/loader.js";
import ALertModalCuestion from "../../components/Alert/ALertModalCuestion.js";
import AlertModal from "../../components/Alert/AlertModal.js";
import Select from "react-select";
import Modal from "./CreateResults.js"; // Asegúrate de ajustar la ruta correcta

const Butonn = (routeName, data, name) => {
  const matchingRoute = routes.find((route) => route.name === routeName);

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

    if (name !== null) {
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
        <Reactstrap.NavLink
          to={`${layout}${modifiedPath}`}
          tag={NavLinkRRD}
          activeClassName="active"
          className="p-0"
        >
          <i className={icon} />
        </Reactstrap.NavLink>
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

export default function List() {
  const [competences, setCompetences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Alertas
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // Eliminar alerta
  const [showAlertCuestion, setShowAlertCuestion] = useState(false);

  // Búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Eliminar
  const [apiDeleteRecord, setApiDeleteRecord] = useState("");

  // Pagination data
  const totalCompetences = competences.length;
  const [perPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = perPage * currentPage;
  const firstIndex = lastIndex - perPage;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setShowAlertCuestion(false);
  };

  const generateRandomCode = () => {
    const randomCode = Math.floor(100000000 + Math.random() * 900000000); // Genera un número aleatorio de 9 dígitos
    return randomCode.toString(); // Convierte el número en una cadena de texto
  };

  const handleSaveClick = (newCompetence) => {
    setCompetences([newCompetence, ...competences]);
    localStorage.setItem("competences", JSON.stringify([newCompetence, ...competences]));
    setShowAlert(true);
    setModalOpen(false);
    setCurrentPage(1);
  };
  const openModal = (op, id, name) => {
    setId(id);
    setName(name);
    setOperation(op);

    if (op === 1) {
      setTitle("Registrar Competencia");
    } else if (op === 2) {
      setTitle("Editar Competencia");
    }

    setModalOpen(true);
  };

  const getData = useCallback(() => {
    try {
      axios.get(`api/v1/competences/${id}`).then((res) => {
        setCompetences(res.data.results);
        setIsLoading(false);
      });
    } catch (error) {
      setAlertType(error.status);
      setAlertMessage(error.message);
      setShowAlert(true);
      console.log(error);
    }
  }, [id]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteConfirmation = () => {
    axios
      .delete(apiDeleteRecord)
      .then((response) => {
        // Verifica si la solicitud de eliminación fue exitosa
        if (response.status === 200) {
          // La competencia se eliminó con éxito, ahora actualiza el estado para reflejar la eliminación
          const updatedCompetences = competences.filter((competence) => competence._id !== id);
          setCompetences(updatedCompetences);
          setShowAlertCuestion(false); // Cierra la alerta de confirmación
        } else {
          // Maneja cualquier otro resultado (por ejemplo, un error en la eliminación)
          console.error("Error en la eliminación de la competencia:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud de eliminación:", error);
      });
  };

  const destroy = (id) => {
    setApiDeleteRecord(`api/v1/competences/${id}`);
    setShowAlertCuestion(true);
  };

  useEffect(() => {
    const storedCompetences = localStorage.getItem("competences");
    if (storedCompetences) {
      setCompetences(JSON.parse(storedCompetences));
      setIsLoading(false);
    } else {
      // Realiza la solicitud inicial para obtener los datos si no hay datos en localStorage
      getData();
    }
  }, [getData]);

  return (
    <>
      {isLoading && <Loading />}
      <Header title1="Gestionar Competencias" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                <Reactstrap.Button
                  color="primary"
                  className="btn-circle btn-neutral"
                  onClick={() => openModal(1, "", "")}
                  type="button"
                >
                  <i className="ni ni-fat-add"></i>
                </Reactstrap.Button>
                {/* Utilizar el componente SearchBar */}
                <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Competencia"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Competencias</th>
                    <th scope="col">Version</th>
                    <th scope="col">acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {competences
                    .filter((competence) =>
                      Object.values(competence)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .slice(firstIndex, lastIndex)
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{data.labor_competence_code}</td>
                          <th scope="row">
                            <Reactstrap.Media className="align-items-center">
                              <div className="ml-10 text-sm " id={`t2${data._id}`}>
                                <Reactstrap.UncontrolledTooltip target={`t2${data._id}`}>
                                  {data.labor_competition}
                                </Reactstrap.UncontrolledTooltip>
                                {data.labor_competition.length > 95
                                  ? data.labor_competition.slice(0, 95) + "..."
                                  : data.labor_competition}
                              </div>
                            </Reactstrap.Media>
                          </th>
                          <td>{data.labor_competition_version}</td>
                          <td>
                            <Reactstrap.UncontrolledDropdown>
                              {Butonn("Resultados de aprendizaje", data._id, data.labor_competition)}
                            </Reactstrap.UncontrolledDropdown>
                            <Reactstrap.Button
                              color="primary"
                              type="button"
                              className="btn-neutral btn-sm"
                              onClick={() => destroy(data._id)}
                              id={`icon2${data._id}`}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Reactstrap.Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Reactstrap.Table>
              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={perPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalCompetences}
                  />
                </nav>
              </Reactstrap.CardFooter>

              
            </Reactstrap.Card>
          </div>
        </Reactstrap.Row>
      </Reactstrap.Container>
      {showAlert && (
        <AlertModal type={alertType} message={alertMessage} onClose={handleCloseAlert} />
      )}
      {showAlertCuestion && (
        <ALertModalCuestion
          api={apiDeleteRecord}
          onClose={handleCloseAlert}
          onConfirm={handleDeleteConfirmation} // Llama a la función de eliminación
        />
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal} competences={competences} />
    </>
  );
}
