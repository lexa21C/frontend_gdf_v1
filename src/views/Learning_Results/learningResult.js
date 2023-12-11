import { LearningResultUI } from "./learningUI.js";

import{useLearningResultContext, LearningResultProvider} from '../../context/learningResult/learningResultContext.js';
function LearningResults() {
    return (
      <LearningResultProvider>
        <LearningResultUI />
      </LearningResultProvider>
    );
  }

export default LearningResults