import { useEffect } from "react";
import React from 'react';
import {CategoryContext } from "../../context/category/categoryContext.js";
import { List } from "./list.js"
import { Item } from "./item.js"
import { Card } from "./card.js"
function CategoryUI(){
    const { categories, getCategories} =  React.useContext(CategoryContext);

    useEffect(() => {
        getCategories();
        console.log('jgjjgngngn')
        console.log("categorias",categories)
    },[])
    // In your CategoryUI component
return (
  <>
    <Card>

      <List>
        {categories && categories.map((category, index) => (
        <Item key={index} index={index} name={category.name} />
      ))}
      </List>
    </Card>
      
   
  </>
);

}

export { CategoryUI};
