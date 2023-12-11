import { ArtiffactsUI } from './artiffacts/artiffactsUI.js';
import { Container } from './container.js';
import { QuaterUI } from './quarter/quaterUI.js';
import { ArtiffactsUI as ArtiffactsUIComponent } from './artiffacts/artiffactsUI.js'; // Rename to avoid conflicts
import { ModalOpen } from './modal1.js';

function ArtiffactsQuaterUI() {
  return (
    <>
      <ModalOpen />
      <Container
        leftContent={<QuaterUI />}
        rightContent={<ArtiffactsUIComponent />}
      />
    </>
  );
}

export { ArtiffactsQuaterUI };
