import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

const CombinedModal = ({ isOpen, toggle, competences, handleSaveClick }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [programCode, setProgramCode] = useState('');
  const [duration, setDuration] = useState('');
  const [trimester, setTrimester] = useState('');
  const [version, setVersion] = useState('');
  
  const options = competences.map((competence, index) => ({
    value: competence._id,
    label: `${index + 1}.${competence.labor_competition}`,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleProgramCodeChange = (e) => {
    setProgramCode(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTrimesterChange = (e) => {
    setTrimester(e.target.value);
  };

  const handleVersionChange = (e) => {
    setVersion(e.target.value);
  };


  
  const handleSave = async () => {
    try {
      const newCompetence = {
        labor_competition: selectedOption.label,
        programCode,
        duration,
        trimester,
        version,
      };
  
      const response = await axios.post('/api/v1/competences', newCompetence);
  
      if (response.status === 201 || response.status === 200) {
        console.log("Competencia registrada exitosamente:", newCompetence);
  
        // Llama a la función handleSaveClick pasada como una propiedad
        handleSaveClick(newCompetence);
  
        // Limpiar el estado del formulario
        setSelectedOption('');
        setProgramCode('');
        setDuration('');
        setTrimester('');
        setVersion('');
  
        // Cerrar el modal
        toggle();
      } else {
        console.error("Error al crear la competencia. Estado de respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  };

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get('/api/v1/formation_programs');
        // Hacer algo con los datos obtenidos si es necesario
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    fetchProgramData();
  }, [toggle]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Registrar Competencia</ModalHeader>
      <ModalBody>
        <Label htmlFor="input-competences">Competencias</Label>
        <Select options={options} value={selectedOption} onChange={handleSelectChange} />

        <Label for="input-programCode">Código del Programa</Label>
        <Input
          type="text"
          id="input-programCode"
          placeholder="Ejemplo: 147837"
          onChange={handleProgramCodeChange}
          value={programCode}
          required
        />

        <Label for="input-duration">Duración</Label>
        <Input
          type="text"
          id="input-duration"
          placeholder="Ejemplo: meses-años"
          onChange={handleDurationChange}
          value={duration}
          required
        />

        <Label for="input-trimester">Trimestre</Label>
        <Input
          type="number"
          placeholder="Ejemplo: 1-2-3"
          id="input-trimester"
          onChange={handleTrimesterChange}
          value={trimester}
          required
        />

        <Label for="input-version">Versión</Label>
        <Input
          type="text"
          placeholder="Ejemplo: 1.0"
          id="input-version"
          onChange={handleVersionChange}
          value={version}
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
        <Button color="primary" onClick={handleSave}>
          Registrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CombinedModal;
