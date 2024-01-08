"use client";
import React, { useState, useEffect, useRef } from "react";
import Employee from "./models/Employee";
import Navbar from "./components/Navbar";
import Dialog from "./components/Dialog";

export default function Home() {
	let emptyEmployee: Employee = {
		id: null,
		name: "",
		phone: 0,
		position: "",
	};

	const [employees, setEmployees] = useState<Employee[]>([]);
	const [employeeDialog, setEmployeeDialog] = useState<boolean>(false);
	const [deleteEmployeeDialog, setDeleteEmployeeDialog] =
		useState<boolean>(false);
	const [employee, setEmployee] = useState<Employee>(emptyEmployee);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("/api/employees")
			.then((response) => response.json())
			.then((data) => {
				setEmployees(data);
				setIsLoading(false);
				console.log(employees)
			});
	}, []);

	const confirmDeleteEmployee = (employee: Employee) => {
		setEmployee(employee);
		setDeleteEmployeeDialog(true);
	};

	const hideDeleteEmployeeDialog = () => {
		setDeleteEmployeeDialog(false);
	};

	const deleteEmployee = () => {
		setIsLoading(true);
		let status = 200;
		fetch(`/api/employees`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: employee.id }),
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

		if (!employee.name) {
			setIsLoading(false);
			return;
		}

		fetch("/api/employees", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: employee.name,
				position: employee.position,
				phone: employee.phone,
			}),
		})
			.then((response) => response.json())
			.then((createdemployee) => {
				setEmployees([...employees, createdemployee]);
				setEmployee({ id: "", name: "", position: "", phone: 0 });
				fetch("/api/employees")
					.then((response) => response.json())
					.then((data) => {
						setEmployees(data);
						setIsLoading(false);
					});
				hideDialog();
			});
	};

	const hideDialog = () => {
		setSubmitted(false);
		setEmployeeDialog(false);
	};

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) => {
		const val = (e.target && e.target.value) || "";
		let _employee = { ...employee };

		// @ts-ignore
		_employee[`${name}`] = val;

		setEmployee(_employee);
	};

	return (
		<>
			<Navbar open={openNew} />
			<div className="m-3">
				<h1>Employees</h1>
				<div className="card">
					{isLoading ? (
						<img src="loading.svg"></img>
					) : (
						<>
							{employees.map((item) => {
								<p>{item.name}</p>
							})}
						</>
					)}
				</div>
				<Dialog visible={employeeDialog} onHide={hideDialog}>
					<div className="field">
						<label htmlFor="name" className="font-bold">
							Name
						</label>
						{submitted && !employee.name && (
							<small className="p-error">Name is required</small>
						)}
						<input
							id="name"
							value={employee.name}
							onChange={(e) => onInputChange(e, "name")}
							required
						></input>

						<br></br>
						<label htmlFor="position" className="font-bold">
							Position
						</label>
						{submitted && !employee.position && (
							<small className="p-error">
								Position is required
							</small>
						)}
						<input
							id="position"
							value={employee.position}
							onChange={(e) => onInputChange(e, "position")}
							required
						></input>

						<label htmlFor="phone" className="font-bold">
							Phone
						</label>
						{submitted && !employee.phone && (
							<small className="p-error">Phone is required</small>
						)}
						<input
							id="phone"
							value={employee.phone}
							onChange={(e) => onInputChange(e, "phone")}
							required
						></input>
					</div>
					<button onClick={saveEmployee}>Add</button>
				</Dialog>
				<Dialog visible={deleteEmployeeDialog} onHide={hideDialog}>
					<div>
						{employee && (
							<span>
								Are you sure you want to delete{" "}
								<b>{employee.name}</b>?
							</span>
						)}
					</div>
				</Dialog>
			</div>
		</>
	);
}
