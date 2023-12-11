// artfContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArtiffactsContext = createContext();

const useArtiffactsContext = () => {
  return useContext(ArtiffactsContext);
};

const ArtiffactsProvider = ({ children }) => {
  let { formation_program } = useParams();

  const [artiffacts, setArtiffacts] = useState([]);
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [artiffactOne, setArtiffactOne] = useState([]);
  const [data, setData] = useState([]);
  const [quarterId, setQuarterId] = useState(null);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [ddelete, setDeleter] = useState(false);
  const [quarter, setQuarter] = useState([]);
  const [typeQuarter, setTypeQuarter] = useState(false);
  const [modalQuarter, setModalQuarter] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [records, setRecords] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteApi, setDeleteApi] = useState(null);

  const competence = data?.map((e) => {
    return e.competences;
  });

  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const toggle2 = () => {
    setModalQuarter(!modalQuarter);
    setTypeQuarter(false);
  };

  const toggle3 = () => {
    setMostrarBoton(!mostrarBoton);
  };

  const Edit = (r) => {
    setQuarter(r);
    setModalQuarter(!modalQuarter);
    setTypeQuarter(true);
  };

  const Edit2 = (item) => {
    setArtiffactOne(item);
    setModal(!modal);
    setType(true);
  };

  const deletes = async (id) => {
    // Configura showAlert a true para mostrar la alerta
    setShowAlert(true);
    setDeleteItemId(id);
    setDeleteApi('quarter');
  };

  const deletes1 = async (id) => {
    setShowAlert(true);
    console.log(id);
    setDeleteItemId(id);
    setDeleteApi('artiffacts');
  };

  useEffect(() => {
    setQuarterId(quarter?._id);
    async function fetchData() {
      const { data } = await axios.get(`api/v1/quarter/${formation_program}`);
      setData(data.results);

      const records = await axios.get(`api/v1/records/${formation_program}`);
      setRecords(records.data.results);
      if (quarterId != null) {
        await axios.get(`api/v1/artifacts/quarter/${quarterId}`).then(({ data }) => {
          setArtiffacts(data.results);
          console.log(artiffacts);
        });
      }
    }
    fetchData();
  }, [modalQuarter, quarter, quarterId, modal, showAlert, ddelete]);

  const contextValue = {
    artiffacts,
    mostrarBoton,
    artiffactOne,
    data,
    quarterId,
    modal,
    type,
    ddelete,
    quarter,
    typeQuarter,
    modalQuarter,
    showAlert,
    records,
    modalDelete,
    deleteItemId,
    deleteApi,
    competence,
    toggle,
    toggle2,
    toggle3,
    Edit,
    Edit2,
    deletes,
    deletes1,
    setQuarter,
    deletes,
    toggle3,
    setDeleteItemId,
    setShowAlert
  };

  return (
    <ArtiffactsContext.Provider value={contextValue}>
      {children}
    </ArtiffactsContext.Provider>
  );
};

export { useArtiffactsContext, ArtiffactsProvider };
