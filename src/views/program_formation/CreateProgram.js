import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import Select from "react-select";
import axios from 'axios';

const CreateProgramModal = ({ isOpen, toggle, handleSaveClick }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [programCode, setProgramCode] = useState("");
  const [duration, setDuration] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [programData, setProgramData] = useState([]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleProgramCodeChange = (e) => {
    setProgramCode(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleProgramLevelChange = (e) => {
    setProgramLevel(e.target.value);
  };

  const isFormValid = () => {
    const isProgramCodeValid = programCode.length >= 6;
    const isDurationValid = duration.length > 0;
    const isProgramLevelValid = programLevel.length > 0;

    return isProgramCodeValid && isDurationValid && isProgramLevelValid;
  };

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get('/api/v1/formation_programs');
        setProgramData(response.data.results);
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    fetchProgramData();
  }, []);

  const options = programData.map((program) => ({
    value: program._id,
    label: program.program_name,
  }));

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Registrar Programa</ModalHeader>
      <ModalBody>
        <Label htmlFor="input-formation_programs">Programa</Label>
        <Select
          id="select-programs"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />
        <Label for="input-programCode">Código del Programa (más de 6 dígitos)</Label>
         <Input
          type="number"
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
        <Label for="input-programLevel">Nivel de Programa</Label>
        <Input
          type="text"
          id="input-programLevel"
          placeholder="Ejemplo:Tecnologo"
          onChange={handleProgramLevelChange}
          value={programLevel}
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
        <Button
          color="primary"
          onClick={() => handleSaveClick(selectedOption)}
          disabled={!isFormValid()}
        >
          Registrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateProgramModal;
