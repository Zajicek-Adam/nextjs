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
					employees.filter(
						(employee) => employee.id !== deletedemployee.id
					)
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
		setName("");
		setPhone("");
		setPosition("");
	};

	const deletion = (id: string | null) => {
		if (id != null) {
			deleteEmployee(id);
		}
	};

	const Heading = styled.h1`
		font-size: 2.75em;
		text-align: left;
		color: #1a1660;
		margin: 0.5em;
		margin-left: 0em;
		font-weight: 700;
	`;

	const CustomTable = styled.table`
		border-collapse: collapse;
		width: 1280px;
		margin: 2em;
    margin-top: 0.5em;
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

	const Center = styled.div<{ $column?: boolean }>`
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: ${(props) => (props.$column ? "column" : "row")};
	`;

	const SpaceBetween = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 1280px;
	`;

	const AddButton = styled.button`
		all: unset;
		background-color: #ff6584;
		border-radius: 19px;
		font-weight: 500;
		color: white;
		padding: 1em 1.5em;
		cursor: pointer;
		font-size: 1.3em;
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
					<Navbar />

					<div className="m-3">
						<Center>
							{isLoading ? (
								<></>
							) : employees.length > 0 ? (
								<Center $column>
									<SpaceBetween>
										<Heading>Employees</Heading>
										<AddButton onClick={openNew}>
											Add
										</AddButton>
									</SpaceBetween>
									<CustomTable>
										<thead>
											<tr>
												<TableHeader>Name</TableHeader>
												<TableHeader>
													Position
												</TableHeader>
												<TableHeader>Phone</TableHeader>
												<TableHeader>
													Action
												</TableHeader>
											</tr>
										</thead>
										<tbody>
											{employees.map((employee) => (
												<TableRow key={employee.id}>
													<TableCell>
														{employee.name}
													</TableCell>
													<TableCell>
														{employee.position}
													</TableCell>
													<TableCell>
														{employee.phone}
													</TableCell>
													<TableCell>
														<DeleteButton
															onClick={() =>
																deletion(
																	employee.id
																)
															}
														>
															Delete
														</DeleteButton>
													</TableCell>
												</TableRow>
											))}
										</tbody>
									</CustomTable>
								</Center>
							) : (
								<Center $column>
									<Heading>No employees here yet.</Heading>
                  <AddButton onClick={openNew}>
											Add
										</AddButton>
									<Image
										src="man.svg"
										alt="man siting on a desk"
										width={478}
										height={451}
									></Image>
								</Center>
							)}
						</Center>
						<Dialog
							visible={employeeDialog}
							name={name}
							setName={setName}
							position={position}
							setPosition={setPosition}
							phone={phone}
							setPhone={setPhone}
							submitted={submitted}
							hideDialog={hideDialog}
							saveEmployee={saveEmployee}
						>
						</Dialog>
					</div>
				</>
			)}
		</>
	);
}
