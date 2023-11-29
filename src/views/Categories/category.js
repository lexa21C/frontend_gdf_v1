import React from 'react';
import { CategoryProvider } from '../../context/category/categoryContext.js';
import { CategoryUI } from './categoryUI.js';

function  CategoryPage() {
  return (
    <CategoryProvider>
      <CategoryUI />
    </CategoryProvider>
  );
}

export default  CategoryPage;