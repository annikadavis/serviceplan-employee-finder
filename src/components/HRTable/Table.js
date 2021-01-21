import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import AddBox from "@material-ui/icons/AddBox";
import { FormatAlignCenter } from "@material-ui/icons";

function Table({ tableData, onAdd, onDelete, onUpdate }) {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  const tableIcons = {
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  };
  return (
    <div style={{ maxWidth: "1000px", maxHeight: "200px", margin: "auto" }}>
      <MaterialTable
        icons={tableIcons}
        options={{ searchFieldAlignment: "left" }}
        columns={[
          { title: "Name", field: "name" },
          { title: "E-mail", field: "email" },
          { title: "Position", field: "position" },
          { title: "Education", field: "education" },
          { title: "Former Employers", field: "former_employers" },
          {
            title: "Experience in field",
            field: "experience_in_the_trade",
          },
          { title: "Special Knowledge", field: "special_knowledge" },
          { title: "Hobbies", field: "hobbies" },
          { title: "Network Connections", field: "" },
          { title: "Special Skills", field: "skills" },
          { title: "Languages", field: "languages" },
          { title: "Software Skills", field: "software_skills" },
          { title: "Talents", field: "talents" },
          { title: "Customers", field: "customers" },
          { title: "Projects", field: "projects" },
          { title: "Further Training", field: "further_training" },
        ]}
        data={data}
        // actions={[
        //   {
        //     icon: "save",
        //     tooltip: "Save User",
        //     onClick: (event, rowData) => {
        //       // Do save operation
        //       console.log(event, rowData);
        //       onAdd();
        //     },
        //   },
        // ]}
        editable={{
          onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
          onRowUpdateCancelled: (rowData) =>
            console.log("Row editing cancelled"),
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                /* setData([...data, newData]); */

                onAdd(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                console.log(dataUpdate);
                setData(dataUpdate);
                onUpdate(dataUpdate[index].id, newData);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...tableData];
                const index = oldData.tableData.id;
                console.log(oldData);
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                onDelete(oldData.id);
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}

export default Table;
