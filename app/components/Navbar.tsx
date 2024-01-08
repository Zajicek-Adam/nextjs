import styled from "styled-components";

interface NavbarProps {
    open: () => void;
  }

export default function Navbar({open} : NavbarProps) {
	const Title = styled.h1`
		font-size: 2.75em;
		text-align: center;
		color: #1a1660;
		text-transform: uppercase;
        font-weight: 500;
		margin-left: 0.75em;
	`;

	const Container = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
        background-color: white;
	`;

    const Button = styled.button`
        all: unset;
		background-color: #FF6584;
		border-radius: 19px;
		font-weight: 300;
		color: white;
		padding: 1em 1.5em;
		cursor: pointer;
		margin-right: 0.75em;
		font-size: 1.3em;
    `

	return (
		<Container>
			<Title>Alune</Title>
            <Button onClick={open}>Add</Button>
		</Container>
	);
}
