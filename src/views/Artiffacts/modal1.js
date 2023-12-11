import { useState, useEffect } from "react";
import Modal from "./modal.js"
import ModalQuarter from "./modalQuarter";

import AlertModal from "../../components/Alert/ALertModalCuestion.js";
import Header from "../../components/Headers/HEAD.js";
import { useArtiffactsContext} from '../../context/artiffacts/artiffactsContext.js'
const ModalOpen = () => {
  const {
    artiffacts,
    artiffactOne,
    modal,
    type,
    quarter,
    typeQuarter,
    modalQuarter,
    showAlert,  
    deleteItemId,
    deleteApi,
    competence,
    toggle,
    toggle2,
    setDeleteItemId,
    setShowAlert,deletes

  } =  useArtiffactsContext()
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

export { ModalOpen};
