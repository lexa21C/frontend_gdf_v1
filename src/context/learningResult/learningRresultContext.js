// learningContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  getLearningResults
} from '../../services/learningResult/learningResultService.js'

import { useParams } from 'react-router-dom';
const LearningContext = createContext();

const useLearningResultContext = () => {
  return useContext(LearningContext);
};
const LearningResultProvider = ({ children }) => {
  const getTypeProfileFromLocalStorage = () => {
    const storedTypeProfile = localStorage.getItem('User');
    const json = storedTypeProfile ? JSON.parse(storedTypeProfile) : null;
    return json?.type_profile.map((e) => e.type_profile) || null;
  };
  
  const [typeProfile, setTypeProfile] = useState(() => getTypeProfileFromLocalStorage());
  
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detail, setDetail] = useState(false);
  const [showAlertCuestion, setAlertCuenstion] = useState(false);
  const [apiDeleteLearningResult, setapiDeleteLearningResult] = useState('');
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = PerPage * currentPage;
  const firstIndex = lastIndex - PerPage;
  const { competenceid } = useParams();
  const { nameCompetence } = useParams();
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const Edit = (learning_r) => {
    setSelectedResult(learning_r);
    setModal(true);
    setType(true);
  };

  const destroy = (id) => {
    setapiDeleteLearningResult(`api/v1/learningResults/${id}`);
    setAlertCuenstion(true);
  };

  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  const seeDetail = (learningResult) => {
    setRegistroSeleccionado(learningResult);
  };

  const toggleShow = () => {
    setDetail(!detail);
    setType(false);
  };

  const totalResults = results?.length;

  const fetchData = async () => {
    try {
      const results = await getLearningResults(competenceid);
      setResults(results);
    } catch (error) {
      console.log(error);
      // Manejar el error aquí si es necesario
    }
  };
  useEffect(() => {
    fetchData();  
  }, [modal, showAlertCuestion, searchTerm, competenceid]);

  return (
    <LearningContext.Provider
      value={{
        typeProfile,
        results,
        searchTerm,
        handleInputChange,
        PerPage,
        currentPage,
        setCurrentPage,
        selectedResult,
        modal,
        type,
        showAlertCuestion,
        apiDeleteLearningResult,
        toggle,
        Edit,
        destroy,
        handleCloseAlert,
        seeDetail,
        toggleShow,
        totalResults,
        nameCompetence,
        firstIndex,
        lastIndex,
        registroSeleccionado,
        setRegistroSeleccionado
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export {useLearningResultContext, LearningResultProvider}