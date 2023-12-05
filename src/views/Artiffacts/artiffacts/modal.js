import { useState, useEffect } from "react";

import Modal from "./modal.js";
import ModalQuarter from "./modalQuarter";

import AlertModal from "../../components/Alert/ALertModalCuestion.js";
import Header from "components/Headers/HEAD.js";

const Index = () => {
  let [artiffacts, setArtiffacts] = useState([]);

  const [artiffactOne, setArtiffactOne] = useState([]);
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);

  const [quarter, setQuarter] = useState([]);
  const [typeQuarter, setTypeQuarter] = useState(false);
  const [modalQuarter, setModalQuarter] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const deletes = async (id) => {
    // Configura showAlert a true para mostrar la alerta
    setShowAlert(true);
    setDeleteItemId(id);
    setDeleteApi("quarter");
  };

  return (
    <>
      <Modal
        isOpen={modal}
        toggle={toggle}
        type={type}
        competences={artiffacts}
        quarterId={quarter._id}
        OneArtiffact={artiffactOne}
      />
      <Header />
      <ModalQuarter
        isOpen={modalQuarter}
        toggle={toggle2}
        type={typeQuarter}
        competences={competence}
        quarter={quarter}
        artiffactOne={artiffactOne}
      />
      {showAlert && (
        <AlertModal
          api={`api/v1/${deleteApi}/${deleteItemId}`} // Pasa la API correspondiente
          onClose={(confirmed) => {
            if (confirmed) {
              // Realiza la eliminación si el usuario confirmó
              deletes(deleteItemId);
            }
            setDeleteItemId(null); // Restablece el ID a null después de la confirmación o el cierre del modal
            // Configura showAlert a false para ocultar la alerta
            setShowAlert(false);
          }}
        />
      )}
    </>
  );
};

export default Index;
