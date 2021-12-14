import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import useUser from "../config/UseUser";
import getUsers from "../services/getUsers";
import { InputText } from "primereact/inputtext";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ENDPOINT } from "../config/ENPOINT";

// import './DataTableDemo.css';

const AdminDashboard = () => {
  //SET AUTH
  const { isLogged } = useUser();
  const [users, setUsers] = useState("");
  const token = window.sessionStorage.getItem("token");
  useEffect(() => {
    getUsers(token).then((value) => {
      setUsers(value.users);
    });
  }, [token]);

  //FILTERS
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    validated: { value: null, matchMode: FilterMatchMode.EQUALS },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue2, setGlobalFilterValue2] = useState(null);

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const [selectedUser, setSelectedUser] = useState();

  //SEARCH BAR HEADER
  const renderHeader2 = () => {
    return (
      <div className="p-d-flex p-jc-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header2 = renderHeader2();

  // COLUMN TEMPLATES

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.validated,
          "false-icon pi-times-circle": !rowData.validated,
        })}
      ></i>
    );
  };

  const verifiedRowFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const photo1BodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Image
          alt="flag"
          src={rowData.urlDni1}
          onError={(e) =>
            (e.target.src =
              "https://tecno-soluciones.net/wp-content/uploads/2019/08/36797a633bf2483c419df0c1368582ca-1.png")
          }
          className={`flag flag-${rowData.urlDni1}`}
          width={50}
          preview
        />
      </React.Fragment>
    );
  };

  const photo2BodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Image
          alt="flag"
          src={rowData.urlDni2}
          onError={(e) =>
            (e.target.src =
              "https://tecno-soluciones.net/wp-content/uploads/2019/08/36797a633bf2483c419df0c1368582ca-1.png")
          }
          className={`flag flag-${rowData.urlDni2}`}
          width={50}
          preview
        />
      </React.Fragment>
    );
  };

  // VERIFIED USER
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {};
  console.log(selectedUser);
  const cancelRef = React.useRef();

  const verifyUser = () => {
    fetch(`${ENDPOINT}/panel/validate/${selectedUser.username}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: {
        validated: true,
      },
    }).then((res) => {
      const value = res;
      getUsers(token).then((value) => {
        setUsers(value.users);
      });
      setIsOpen(false);
      return value;
    });
  };
  const setVerfiedUser = (rowData) => {
    return (
      <>
        {rowData.validated ? (
          <Button colorScheme="gray" disabled>
            Validated
          </Button>
        ) : selectedUser.username === rowData.username ? (
          <Button colorScheme="green" onClick={() => setIsOpen(true)}>
            Verify
          </Button>
        ) : (
          <Button colorScheme="gray" disabled>
            Verify
          </Button>
        )}

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Verify user {rowData.fullname}
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>

                <Button colorScheme="green" onClick={verifyUser} ml={3}>
                  Verify
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  return (
    <Flex p={10} align="center" justify="center">
      <DataTable
        value={users}
        paginator
        className="p-datatable-customers"
        rows={10}
        dataKey="id"
        filters={filters2}
        filterDisplay="row"
        responsiveLayout="scroll"
        globalFilterFields={["fullname", "validated", "email", "username"]}
        header={header2}
        emptyMessage="No users found."
        onSelectionChange={(e) => setSelectedUser(e.value)}
        selection={selectedUser}
        selectionMode="simple"
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>

        <Column
          field="validated"
          header="Verified"
          dataType="boolean"
          style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
          filter
          filterElement={verifiedRowFilterTemplate}
        />

        <Column
          field="fullname"
          header="Fullname"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="username"
          header="Identity Document"
          filter
          filterPlaceholder="Search by document"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search by email"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="DNI 1"
          filterField="urlDni1"
          style={{ minWidth: "12rem" }}
          body={photo1BodyTemplate}
        />
        <Column
          header="DNI 2"
          filterField="urlDni2"
          style={{ minWidth: "12rem" }}
          body={photo2BodyTemplate}
        />
        <Column
          header="Verified User"
          style={{ minWidth: "12rem" }}
          body={setVerfiedUser}
        />
      </DataTable>
    </Flex>
  );
};

export default AdminDashboard;
