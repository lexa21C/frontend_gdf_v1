import { useEffect } from "react";
import React from 'react';
import {CategoryContext } from "../../context/category/categoryContext.js";
import { List } from "./ListRecord.js"
import { Card } from "./card.js"
import {Item} from "./item.js"
function RecordsUI(){
    
    // In your RecordsUI component
return (
  <>
    <Card>
      <List>
        <Item/>
      </List>
    </Card>
   
  </>
);

}

export { RecordsUI};
