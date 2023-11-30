import { RecordsUI } from "./recordsUI";
import { RecordsProvider, useRecordsContext } from '../../context/records/recordsContext.js';
function ListRecord() {
    return (
      <RecordsProvider>
        <RecordsUI />
      </RecordsProvider>
    );
  }

export { ListRecord}