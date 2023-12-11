import { ArtiffactsQuaterUI} from "./indexUI.js";

import{useArtiffactsContext, ArtiffactsProvider} from '../../context/artiffacts/artiffactsContext.js';
function Artiffacts() {
    return (
      <ArtiffactsProvider>
        <ArtiffactsQuaterUI/>
      </ArtiffactsProvider>
    );
  }

export default Artiffacts