// recordsContext.js
import React, { createContext, useState, useEffect, useContext, useCallback} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecordsContext = createContext();

const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [typeProfile, setTypeProfile] = useState(null);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detail, setDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { program_id } = useParams();
  const user = JSON.parse(localStorage.getItem("User"));
  const user_id = user._id;
  const [PerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertCuestion, setAlertCuenstion] = useState(false);
  const [apiDeleteRecord, setapiDeleteRecord] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`api/v1/records`);
      setRecords(data.results);
    } catch (error) {
      // Manejar el error adecuadamente
      console.error('Error fetching data:', error);
    }
  }, [setRecords]);
  

  useEffect(() => {
    fetchData();
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile)
    setTypeProfile(json.type_profile.map((e) => e.type_profile));
  }, [fetchData, modal, showAlertCuestion, program_id]);


  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const Edit = useCallback((record) => {
    setSelectedRecord(record);
    setModal(true);
    setType(true);
  }, [setSelectedRecord, setModal, setType]);

  const destroy = useCallback(async (id) => {
    try {
      await setapiDeleteRecord(`api/v1/records/${id}`);
      setAlertCuenstion(true);
    } catch (error) {
      console.error('Error en setapiDeleteRecord:', error);
      // Puedes manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    }
  }, [setapiDeleteRecord, setAlertCuenstion]);
  
  const handleCloseAlert = useCallback(() => {
    setAlertCuenstion(false);
  }, [setAlertCuenstion]);
  
  const seeDetail = useCallback((record) => {
    console.log('detalle:', record);
    setRegistroSeleccionado(record);
  },[setRegistroSeleccionado]);

  const toggleShow = () => {

    setDetail(!detail);
    setType(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 
  const filteredRecords = records?.filter((record) =>
  (record.number_record && record.number_record.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
  (record.user && record.user.some(user => user.complete_names && user.complete_names.toLowerCase().includes(searchTerm.toLowerCase())))
);


  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;
  const totalCompetences = records?.length;

  const contextValue = {
    records,
    setRecords,
    modal,
    setModal,
    type,
    setType,
    selectedRecord,
    setSelectedRecord,
    typeProfile,
    registroSeleccionado,
    setRegistroSeleccionado,
    detail,
    setDetail,
    searchTerm,
    setSearchTerm,
    program_id,
    user_id,
    toggle,
    Edit,
    totalCompetences,
    PerPage,
    currentPage,
    setCurrentPage,
    lastIndex,
    firstIndex,
    showAlertCuestion,
    setAlertCuenstion,
    apiDeleteRecord,
    destroy,
    handleCloseAlert,
    seeDetail,
    toggleShow,
    handleInputChange,
    filteredRecords,
  };

  return (
    <RecordsContext.Provider value={contextValue}>
      {children}
    </RecordsContext.Provider>
  );
};

const useRecordsContext = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useRecordsContext must be used within a RecordsProvider');
  }
  return context;
};

export { RecordsProvider, useRecordsContext };
