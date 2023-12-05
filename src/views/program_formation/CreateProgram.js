import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

const CreateProgramModal = ({ isOpen, toggle, updatePrograms }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [programCode, setProgramCode] = useState("");
  const [programName, setProgramName] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [programVersion, setProgramVersion] = useState("");
  const [programStartDate, setProgramStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [programEndDate, setProgramEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [programData, setProgramData] = useState([]);
  const [thematicLinesOptions, setThematicLinesOptions] = useState([]);
  const [LevelOptions,setLevelOptions] = useState([]);
  const [thematicLine, setThematicLine] = useState("");
  const [Level, setLevel] = useState("");
  const [dateError, setDateError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  // Define the formatDate function
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSelectChangel = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
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
    const startDate = e.target.value;
    setProgramStartDate(startDate);
    if (programEndDate) {
      setDateError(startDate > programEndDate);
    }
  };

  const handleProgramEndDateChange = (e) => {
    const endDate = e.target.value;
    setProgramEndDate(endDate);
    setDateError(programStartDate > endDate);
  };

  const handleThematicLineChange = (e) => {
    setThematicLine(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const isFormValid = () => {
    return (
      programName &&
      programCode.length >= 6 &&
      totalDuration.length > 0 &&
      programVersion.length > 0 &&
      selectedOption &&
      selectedOption.value &&
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


      const newProgram = {
        program_name: programName,
        program_code: programCode,
        total_duration: totalDuration,
        program_level: selectedOption.label,
        Program_version: programVersion,
        thematic_line: selectedOption.label,
        program_start_date: formatDate(programStartDate),
        program_end_date: formatDate(programEndDate),
      
      }

      // Guarda el nuevo programa
      const response = await axios.post('/api/v1/formation_programs', newProgram);

      console.log('Programa guardado correctamente:', response.data);

      // Verifica si updatePrograms es una función antes de llamarla
      if (typeof updatePrograms === 'function') {
        updatePrograms();
      }

      setSelectedOption(null);
      setSelectedOption(null);
      setProgramCode("");
      setTotalDuration("");
      setProgramVersion("");
      setProgramStartDate(new Date().toISOString().split('T')[0]);
      setProgramEndDate(new Date().toISOString().split('T')[0]);
      setThematicLine("");
      setCodeError(false);
      setDateError(false);

      toggle();
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  };


  useEffect(() => {
    const fetchThematicLines = async () => {
      try {
        const response = await axios.get('/api/v1/thematics');
        const thematicLines = response.data.results.map((thematic) => ({
          value: thematic._id,
          label: thematic.thematic_line,
        }));
        setThematicLinesOptions(thematicLines);
      } catch (error) {
        console.error('Error fetching thematic lines:', error);
      }
    };

    const fetchLevel = async () => {
      try {
        const response = await axios.get('/api/v1/programlevels');
        const programLevels = response.data.results.map((programlevels) => ({
          value: programlevels._id,
          label: programlevels.Programs_level,
        }));
        setThematicLinesOptions(programLevels);
      } catch (error) {
        console.error('Error fetching thematic lines:', error);
      }
    };

    fetchLevel();
    fetchThematicLines();
  }, []);

  const options = thematicLinesOptions.concat(
    programData.map((program) => ({
      value: program._id,
      label: program.thematic_line,
    }))
  );

  const optionsl = LevelOptions.concat(
    programData.map((program) => ({
      value: program._id,
      label: program.Programs_level,
    }))
  );



  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Registrar Programa</ModalHeader>
      <ModalBody>
        <Label htmlFor="input-programName">Programa</Label>
        <Input
          type="text"
          id="input-programName"
          placeholder="Ejemplo: OPERACIÓN DE EQUIPOS "
          onChange={handleProgramNameChange}
          value={programName}
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
        <Label htmlFor="select-tematica">Nivel de Programa</Label>
        <Select
          id="select-tematica"
          options={optionsl}
          value={selectedOption}
          onChange={handleSelectChange}
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
          type="number"
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
