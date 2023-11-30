import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import Select from "react-select";
import axios from 'axios';

const CreateProgramModal = ({ isOpen, toggle, handleSaveClick, setPrograms, updatePrograms }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [programCode, setProgramCode] = useState("");
    const [programLevel, setProgramLevel] = useState("");
    const [totalDuration, setTotalDuration] = useState("");
    const [programVersion, setProgramVersion] = useState("");
    const [programStartDate, setProgramStartDate] = useState("");
    const [programEndDate, setProgramEndDate] = useState("");
    const [programData, setProgramData] = useState([]);
    const [thematicLine, setThematicLine] = useState(""); // Agrega esta línea para la temática
  
    const handleSelectChange = (selectedOption) => {
      setSelectedOption(selectedOption);
    };
  
    const handleProgramCodeChange = (e) => {
      setProgramCode(e.target.value);
    };
  
    const handleProgramLevelChange = (e) => {
      setProgramLevel(e.target.value);
    };
  
    const handleTotalDurationChange = (e) => {
      setTotalDuration(e.target.value);
    };
  
    const handleProgramVersionChange = (e) => {
      setProgramVersion(e.target.value);
    };
  
    const handleProgramStartDateChange = (e) => {
      setProgramStartDate(e.target.value);
    };
  
    const handleProgramEndDateChange = (e) => {
      setProgramEndDate(e.target.value);
    };
  
    const handleThematicLineChange = (e) => {
      setThematicLine(e.target.value);
    };
  
    const isFormValid = () => {
      const isProgramCodeValid = programCode.length >= 6;
      const isTotalDurationValid = totalDuration.length > 0;
      const isProgramLevelValid = programLevel.length > 0;
      const isProgramVersionValid = programVersion.length > 0;
      const areDatesValid = programStartDate && programEndDate && programStartDate <= programEndDate;
  
      return (
        isProgramCodeValid &&
        isTotalDurationValid &&
        isProgramLevelValid &&
        isProgramVersionValid &&
        areDatesValid
      );
    };
  
    const handleSave = async () => {
        try {
          const selectedProgram = programData.find((program) => program._id === selectedOption.value);
      
          const newProgram = {
            _id: selectedProgram._id,
            program_name: selectedOption.label,
            program_code: programCode,
            program_level: programLevel,
            total_duration: totalDuration,
            Program_version: programVersion,
            program_start_date: programStartDate,
            program_end_date: programEndDate,
            competence: selectedProgram.competence || [],
            competence: selectedProgram.competence || [],
            thematic_line: selectedProgram.thematic_line || "",
          };
      
          // Actualizar la lista de programas en el estado local de List
          setPrograms((prevPrograms) => [...prevPrograms, newProgram]);
      
          console.log("Registro exitoso:", newProgram);
      
          // Limpiar el estado del formulario
          setSelectedOption(null);
          setProgramCode("");
          setProgramLevel("");
          setTotalDuration("");
          setProgramVersion("");
          setProgramStartDate("");
          setProgramEndDate("");
          setThematicLine("");
      
          // Cerrar el modal u realizar otras acciones según tus necesidades
          toggle();
        } catch (error) {
          console.error("Error al guardar el registro:", error);
        }
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
        <Label for="input-programLevel">Nivel de Programa</Label>
        <Input
          type="text"
          id="input-programLevel"
          placeholder="Ejemplo:Tecnologo"
          onChange={handleProgramLevelChange}
          value={programLevel}
          required
        />
        <Label for="input-total_duration">Duración Total</Label>
        <Input
          type="text"
          id="input-total_duration"
          placeholder="Ejemplo: meses-años"
          onChange={handleTotalDurationChange}
          value={totalDuration}
          required
        />
        <Label for="input-programVersion">Versión del Programa</Label>
        <Input
          type="text"
          id="input-programVersion"
          placeholder="Ejemplo: 1.0"
          onChange={handleProgramVersionChange}
          value={programVersion}
          required
        />
        <Label for="input-programStartDate">Fecha de Inicio del Programa</Label>
        <Input
          type="date"
          id="input-programStartDate"
          onChange={handleProgramStartDateChange}
          value={programStartDate}
        />
        <Label for="input-programEndDate">Fecha de Fin del Programa</Label>
        <Input
          type="date"
          id="input-programEndDate"
          onChange={handleProgramEndDateChange}
          value={programEndDate}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
          disabled={!isFormValid()}
        >
          Registrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateProgramModal;
