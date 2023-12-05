import axios from 'axios';
export const getLearningResults = async (competenceid) => {
    try {
      const { data } = await axios.get(`api/v1/learningResults/${competenceid}`);
      return data.results;
    } catch (error) {
      console.error('Error fetching learning results:', error);
      throw error; // Puedes lanzar el error nuevamente para que el componente que llame a esta función pueda manejarlo si es necesario
    }
  };

  export const deleteLearningResult = async (id) => {
    return (`api/v1/learningResults/${id}`);

  };
  