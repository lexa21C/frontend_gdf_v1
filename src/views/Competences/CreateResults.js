import React, { useState } from 'react';
import * as Reactstrap from 'reactstrap';
import Select from "react-select";

export default function Modal({ isOpen, toggle, competences }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [programCode, setProgramCode] = useState("");
    const [duration, setDuration] = useState("");
    const [trimester, setTrimester] = useState("");

    const options = competences.map((competence, index) => ({
        value: competence._id,
        label: `${index + 1}.${competence.labor_competition}`,
    }));

    const handleSelectChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    const handleProgramCodeChange = (e) => {
        setProgramCode(e.target.value);
    };
    const handleSaveClick = () => {}

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleTrimesterChange = (e) => {
        setTrimester(e.target.value);
    };

    const isFormValid = () => {
        // Validar las restricciones
        const isProgramCodeValid = programCode.length >= 15;
        const isDurationValid = duration.length >= 15;
        const isTrimesterValid = !isNaN(trimester);

        return isProgramCodeValid && isDurationValid && isTrimesterValid;
    };

    return (
        <Reactstrap.Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
            toggle={toggle}
        >
            <div className="modal-body p-0">
                <Reactstrap.Card className="bg-secondary shadow border-0">
                    <Reactstrap.CardHeader className="bg-transparent pb-1">
                        <Reactstrap.ModalHeader toggle={toggle}>
                            <h4>Registrar Competencia</h4>
                        </Reactstrap.ModalHeader>
                    </Reactstrap.CardHeader>
                    <Reactstrap.CardBody className="px-lg-5 py-lg-5">
                        <Reactstrap.Form>
                            <Reactstrap.FormGroup className="mb-3">
                                <label
                                    className="form-control-label"
                                    htmlFor="input-competences"
                                >
                                    Competencias
                                </label>
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    isMulti
                                    onChange={handleSelectChange}
                                />
                            </Reactstrap.FormGroup>
                            <Reactstrap.FormGroup>
                                <label htmlFor="input-programCode">Código del Programa</label>
                                <Reactstrap.Input
                                    type="text"
                                    id="input-programCode"
                                    placeholder="Ejemplo: 147837"
                                    onChange={handleProgramCodeChange}
                                    value={programCode}
                                    required
                                />
                            </Reactstrap.FormGroup>
                            <Reactstrap.FormGroup>
                                <label htmlFor="input-duration">Duración</label>
                                <Reactstrap.Input
                                    type="text"
                                    id="input-duration"
                                    placeholder="Ejemplo: meses-años"
                                    onChange={handleDurationChange}
                                    value={duration}
                                    required
                                />
                            </Reactstrap.FormGroup>
                            <Reactstrap.FormGroup>
                                <label htmlFor="input-trimester">Trimestre</label>
                                <Reactstrap.Input
                                    type="number"
                                    placeholder="Ejemplo: 1-2-3"
                                    id="input-trimester"
                                    onChange={handleTrimesterChange}
                                    value={trimester}
                                    required
                                />
                            </Reactstrap.FormGroup>
                            <div className="text-center">
                                <Reactstrap.Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={toggle}
                                >
                                    Cerrar
                                </Reactstrap.Button>
                                <Reactstrap.Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={handleSaveClick}
                                    disabled={!isFormValid()}
                                >
                                    Registrar
                                </Reactstrap.Button>
                            </div>
                        </Reactstrap.Form>
                    </Reactstrap.CardBody>
                </Reactstrap.Card>
            </div>
        </Reactstrap.Modal>
    );
}
