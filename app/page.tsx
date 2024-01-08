"use client";
// pages/index.tsx
import React, { useState, useEffect, useRef } from "react";
import Employee from "./models/Employee";
import Navbar from "./components/Navbar";
import Dialog from "./components/Dialog";
import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  let emptyEmployee: Employee = {
    id: null,
    name: "",
    phone: "",
    position: "",
  };

  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("");


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeDialog, setEmployeeDialog] = useState<boolean>(false);
  const [deleteEmployeeDialog, setDeleteEmployeeDialog] =
    useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>(emptyEmployee);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();
        setEmployees(data); // Update state with fetched data
        setIsLoading(false); // Set loading state to false after data fetch
        console.log(data); // Log the fetched data after updating state
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of an error
      }
    };

    fetchData();
  }, []);

  const confirmDeleteEmployee = (employee: Employee) => {
    setEmployee(employee);
    setDeleteEmployeeDialog(true);
  };

  const hideDeleteEmployeeDialog = () => {
    setDeleteEmployeeDialog(false);
  };

  const deleteEmployee = (idToDelete: string) => {
    setIsLoading(true);
    let status = 200;
    fetch(`/api/employees`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idToDelete }),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((deletedemployee) => {
        setEmployees(
          employees.filter((employee) => employee.id !== deletedemployee.id)
        );
        fetch("/api/employees")
          .then((response) => {
            status = response.status;
            return response.json();
          })
          .then((data) => {
            setEmployees(data);
            setIsLoading(false);
          });
        hideDeleteEmployeeDialog();
      });
  };

  const openNew = () => {
    setEmployee(emptyEmployee);
    setSubmitted(false);
    setEmployeeDialog(true);
  };

  const saveEmployee = () => {
    setSubmitted(true);
    setIsLoading(true);

    if (!name) {
      setIsLoading(false);
      return;
    }

    fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        position: position,
        phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((createdemployee) => {
        setEmployees([...employees, createdemployee]);
        setEmployee({ id: "", name: "", position: "", phone: "" });
        fetch("/api/employees")
          .then((response) => response.json())
          .then((data) => {
            setEmployees(data);
            console.log(data);
            setIsLoading(false);
          });
        hideDialog();
      });
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEmployeeDialog(false);
  };

  

  const deletion = (id: any) => {
    deleteEmployee(id);
  };

  const Title = styled.h1`
    font-size: 2.75em;
    text-align: left;
    width: 100%;
    color: #1a1660;
    margin: 0.5em;
    margin-left: 0.5em;
    font-weight: 700;
  `;

  const Input = styled.input`
    all: unset;
    font-size: 1.25em;
    margin: 0;
    padding: 0.75em;
    padding-top: 1em;
    box-shadow: 1px 1px 20px #e7e7e7;
    width: 275px;
    font-weight: 500;
    border-radius: 7.5px;
    margin-left: 1.75em;
  `;

  const Label = styled.label`
    color: #989898;
    font-weight: 500;
    margin-left: 2.2em;
    transform: translate(15px, 22.5px);
  `;

  const Button = styled.button<{ $secondary?: boolean }>`
    all: unset;
    background: ${(props) => (props.$secondary ? "#transparent" : "#ff6584;")};
    border: ${(props) => (props.$secondary ? "#ff6584" : "transparent")} 6px
      solid;
    border-radius: 9px;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0.9em;
    font-weight: 300;
    color: ${(props) => (props.$secondary ? "#ff6584" : "white")};
    padding: 0 .75em;
    cursor: pointer;
    margin-right: 0.75em;
    font-size: 2.5em;
    width: 140px;
    text-align: center;
  `;

  const Small = styled.small`
    transform: translate(40px, 75px);
    color: #ff6584;
  `;

  const Horizontal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 370px;
  `;

  const CustomTable = styled.table`
    border-collapse: collapse;
    width: 1280px;
	margin: 2em;
  `;

  const TableHeader = styled.th`
    padding: 0.9em;
    background-color: #6c63ff;
    color: white;
  `;

  const TableCell = styled.td`
    padding: 0.9em;
    &:last-child {
      text-align: center;
    }
  `;

  const TableRow = styled.tr`
    &:nth-child(even) {
      background-color: #f2f2f2;
    }
  `;

  const DeleteButton = styled.button`
    background-color: #6c63ff;
    color: white;
    font-size: 1em;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    padding: 0.75em;
	border-radius: 0.5em;
  `;

  const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <>
      {isLoading ? (
        <Image
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src="loading.svg"
		  width={200}
		  height={200}
		  alt="loading screen"
        ></Image>
      ) : (
        <>
          <Navbar open={openNew} />

          <div className="m-3">
            <Title>Employees</Title>
            <Center>
              {isLoading ? (
                <></>
              ) : employees.length > 0 ? (
                <CustomTable>
                  <thead>
                    <tr>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Position</TableHeader>
                      <TableHeader>Phone</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>
                          <DeleteButton onClick={() => deletion(employee.id)}>
                            Delete
                          </DeleteButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </CustomTable>
              ) : (
                <p>No employees found.</p> // Render a message if no employees are available
              )}
            </Center>
            <Dialog visible={employeeDialog} onHide={hideDialog}>
              <Title>Add employee</Title>
              <Label htmlFor="name" className="font-bold">
                Name
              </Label>
              {submitted && !name && (
                <Small className="p-error">Name is required</Small>
              )}
              <Input
                id="name"
                key={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Input>

              <br></br>
              <Label htmlFor="position" className="font-bold">
                Position
              </Label>
              {submitted && !position && (
                <Small className="p-error">Position is required</Small>
              )}
              <Input
                id="position"
                key={position}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              ></Input>

              <Label htmlFor="phone" className="font-bold">
                Phone
              </Label>
              {submitted && !phone && (
                <Small className="p-error">Phone is required</Small>
              )}
              <Input
                id="phone"
                key={phone}
                value={phone}
				onChange={(e) => setPhone(e.target.value)}
                required
              ></Input>
              <Horizontal>
                <Button onClick={saveEmployee}>→</Button>
                <Button $secondary onClick={hideDialog}>
                  ×
                </Button>
              </Horizontal>
            </Dialog>
            <Dialog visible={deleteEmployeeDialog} onHide={hideDialog}>
              <div>
                {employee && (
                  <span>
                    Are you sure you want to delete <b>{employee.name}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}
