import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const DiaryItem = ({
  rowData,
  columnDefs,
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
  onRowClicked,
}) => {
  return (
    <div className="ag-theme-quartz mt-[10px]" style={{ height: "310px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default DiaryItem;
