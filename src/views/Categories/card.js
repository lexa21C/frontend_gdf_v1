import React, { useEffect, useState } from 'react';
import * as Reactstrap from 'reactstrap';
import axios from 'axios';
import Header from '../../components/Headers/HEAD';
import AlertModal from '../../components/Alert/AlertModal.js'
import Search from "../../components/Search/search";
import PaginationData from "../../components/Pagination/pagination.js";
import ALertModalCuestion from '../../components/Alert/ALertModalCuestion.js'


 function Card({ children, toggleModal}) {
  const url = 'api/v1/categories';

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [category, setCategory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  //alertas
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  //alerta eliminar
  const [showAlertCuestion, setAlertCuenstion] = useState(false);

    //Buscador
  const [searchTerm, setSearchTerm] = useState("");

  // eliminar
  const [apiDeleteRecord, setapiDeleteRecord] = useState('');

  //paginación 
  const totalCompetences = category?.length;
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;

  //bucador
  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const openModal = (op, id, name) => {
  

    setModalOpen(true);
  };






    
  return (
    <>
      <Header title1="Gestionar Categorías" />
      <Reactstrap.Container className="mt--7" fluid>
        <Reactstrap.Row>
          <div className="col">
            <Reactstrap.Card className="shadow">
              <Reactstrap.CardHeader className="border-0">
                <Reactstrap.Button
                  color="primary"
                  className="btn-circle btn-neutral"
                  onClick={toggleModal}
                  type="button"
                >
                  <i className="ni ni-fat-add"></i> 
                </Reactstrap.Button>

                   {/* Utilizar el componente SearchBar */}
                   <Search
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Buscar Categoria"
                />
              </Reactstrap.CardHeader>
              <Reactstrap.CardBody>
                {children}
              </Reactstrap.CardBody>
              
              <Reactstrap.CardFooter className="py-4">
                <nav aria-label="...">
                  <PaginationData
                    PerPage={PerPage}
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
  
    </>
  );
}
export {Card}