import { ReactNode, SetStateAction } from "react";
import styled from "styled-components";

interface DialogProps {
	children: ReactNode; // ReactNode type can accept any renderable content
	visible: boolean;
	name: string;
	phone: string;
	position: string;
	setName: (arg1: string) => void;
	setPhone: (arg1: string) => void;
	setPosition: (arg1: string) => void;
	saveEmployee: () => void;
	hideDialog: () => void;
	
	submitted: boolean;
}

export default function Dialog({
	visible,
	name,
	phone,
	position,
	setName,
	setPhone,
	setPosition,
	submitted,
	saveEmployee,
	hideDialog
}: DialogProps) {
	const Container = styled.div<{ $visible?: boolean }>`
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		background-color: white;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 1px 1px 20px #e7e7e7;
		border-radius: 12px;
		visibility: ${(props) => (props.$visible ? "visible" : "collapse")};
	`;

	const Small = styled.small`
		transform: translate(40px, 75px);
		color: #ff6584;
	`;

	const Title = styled.h1`
		font-size: 2.25em;
		text-align: center;
		color: #1a1660;
		margin: 0.5em;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
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

	const Horizontal = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 370px;
	`;

	
	const Button = styled.button<{ $secondary?: boolean }>`
		all: unset;
		background: ${(props) =>
			props.$secondary ? "#transparent" : "#ff6584;"};
		border: ${(props) => (props.$secondary ? "#ff6584" : "transparent")} 6px
			solid;
		border-radius: 9px;
		margin-top: 1em;
		margin-bottom: 1em;
		margin-left: 0.9em;
		font-weight: 300;
		color: ${(props) => (props.$secondary ? "#ff6584" : "white")};
		padding: 0 0.75em;
		cursor: pointer;
		margin-right: 0.75em;
		font-size: 2.5em;
		width: 140px;
		text-align: center;
	`;

	return (
		<Container $visible={visible}>
			<Title>Add employee</Title>
			<Label htmlFor="name" className="font-bold">
				Name
			</Label>
			{submitted && !name && (
				<Small className="p-error">Name is required</Small>
			)}
			<Input
				id="name"
				key="name"
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
				key="position"
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
				key="phone"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				required
			></Input>
			<Horizontal>
				<Button onClick={saveEmployee}>
					<Image
						src="arrow.svg"
						width={50}
						height={20}
						alt="add employee"
					/>
				</Button>
				<Button $secondary onClick={hideDialog}>
					<strong>×</strong>
				</Button>
			</Horizontal>
		</Container>
	);
}
