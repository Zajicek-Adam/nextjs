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
        margin-left: 0.75em;
        font-weight: 500;
	`;

	const Container = styled.div`
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
        background-color: white;
	`;

    const Button = styled.button`
        
    `

	return (
		<Container>
			<Title>Alune</Title>
            <Button onClick={open}>Add</Button>
		</Container>
	);
}
