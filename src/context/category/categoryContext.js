import { createContext, useContext, useState } from "react";
import { getCategoriesRequest } from "../../services/category/category.js";

const CategoryContext = createContext();

 const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("must be used within a CategoryProvider");
  return context;
};

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
 // modal 
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false)

  const getCategories = async () => {
    const res = await getCategoriesRequest();
    setCategories(res.data.results);
    
  };
  const toggleModal = () => {
    console.log('modal')
    setModal(!modal);
    setType(false);
  };
  return (
    <CategoryContext.Provider
      value={{
        setCategories,
        categories,
        getCategories,
        toggleModal,
        modal,
        setModal,
        type,
        setType,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
export { CategoryContext, CategoryProvider}