import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

const CreateProgramModal = ({ isOpen, toggle, updatePrograms }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [programCode, setProgramCode] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [programVersion, setProgramVersion] = useState("");
  const [programStartDate, setProgramStartDate] = useState("");
  const [programEndDate, setProgramEndDate] = useState("");
  const [programData, setProgramData] = useState([]);
  const [thematicLine, setThematicLine] = useState("");
  const [dateError, setDateError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleProgramCodeChange = (e) => {
    setProgramCode(e.target.value);
    setCodeError(e.target.value.length < 6);
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
    if (programEndDate) {
      setDateError(e.target.value > programEndDate);
    }
  };

  const handleProgramEndDateChange = (e) => {
    setProgramEndDate(e.target.value);
    setDateError(programStartDate > e.target.value);
  };

  const handleThematicLineChange = (e) => {
    setThematicLine(e.target.value);
  };

  const isFormValid = () => {
    return (
      programCode.length >= 6 &&
      totalDuration.length > 0 &&
      programVersion.length > 0 &&
      programStartDate &&
      programEndDate &&
      programStartDate <= programEndDate &&
      selectedOption &&
      selectedOption.value &&
      !dateError &&
      !codeError
    );
  };

  const handleSave = async (evento) => {
    evento.preventDefault();
    try {
      if (!isFormValid()) {
        console.error('Formulario no válido');
        return;
      }
  
      const selectedProgram = programData.find((program) => program._id === selectedOption.value);
  
      const newProgram = {
        program_name: selectedOption.label,
        program_code: programCode,
        total_duration: totalDuration,
        Program_version: programVersion,
        program_start_date: programStartDate,
        program_end_date: programEndDate,
        competence: selectedProgram.competence || [],
        program_level: programLevel || "",
        thematic_line: thematicLine || "",
      };
  
      // Guarda el nuevo programa
      const response = await axios.post('/api/v1/formation_programs', newProgram);
  
      console.log('Programa guardado correctamente:', response.data);
  
      // Verifica si updatePrograms es una función antes de llamarla
      if (typeof updatePrograms === 'function') {
        updatePrograms();
      }
  
      setSelectedOption(null);
      setProgramCode("");
      setTotalDuration("");
      setProgramVersion("");
      setProgramStartDate("");
      setProgramEndDate("");
      setThematicLine("");
      setCodeError(false);
      setDateError(false);
  
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
    label: program.thematic_line,
  }));

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Registrar Programa</ModalHeader>
      <ModalBody>
      <Label htmlFor="input-thematicLine">Programa</Label>
        <Input
          type="text"
          id="input-thematicLine"
          placeholder="Ejemplo: OPERACIÓN DE EQUIPOS "
          onChange={handleThematicLineChange}
          value={thematicLine}
        />
        <Label htmlFor="input-programCode">Código del Programa (más de 6 dígitos)</Label>
        <Input
          type="number"
          id="input-programCode"
          placeholder="Ejemplo: 147837"
          onChange={handleProgramCodeChange}
          value={programCode}
          required
        />
        {codeError && <p className="text-danger">El código debe tener al menos 6 dígitos.</p>}
        <Label htmlFor="input-programLevel">Nivel de Programa</Label>
        <Input
          type="text"
          id="input-programLevel"
          placeholder="Ejemplo: Tecnologo"
          onChange={handleProgramLevelChange}
          value={programLevel}
          required
        />
        <Label htmlFor="input-totalDuration">Duración Total</Label>
        <Input
          type="text"
          id="input-totalDuration"
          placeholder="Ejemplo: meses-años"
          onChange={handleTotalDurationChange}
          value={totalDuration}
          required
        />
        <Label htmlFor="input-programVersion">Versión del Programa</Label>
        <Input
          type="text"
          id="input-programVersion"
          placeholder="Ejemplo: 1.0"
          onChange={handleProgramVersionChange}
          value={programVersion}
          required
        />
        <Label htmlFor="select-tematica">Línea Temática</Label>
        <Select
  id="select-tematica"
  options={options}
  value={selectedOption}
  onChange={handleSelectChange}
/>
        <Label htmlFor="input-programStartDate">Fecha de Inicio del Programa</Label>
        <Input
          type="date"
          id="input-programStartDate"
          onChange={handleProgramStartDateChange}
          value={programStartDate}
        />
        <Label htmlFor="input-programEndDate">Fecha de Fin del Programa</Label>
        <Input
          type="date"
          id="input-programEndDate"
          onChange={handleProgramEndDateChange}
          value={programEndDate}
        />
        {dateError && <p className="text-danger">La fecha de fin debe ser mayor o igual a la fecha de inicio.</p>}
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
