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
  const getCategories = async () => {
    const res = await getCategoriesRequest();
    console.log(res.data.results
        );
    setCategories(res.data.results
        );
    console.log('categorias')
    console.log(categories)
  };

  return (
    <CategoryContext.Provider
      value={{
        setCategories,
        categories,
        getCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
export { CategoryContext, CategoryProvider}