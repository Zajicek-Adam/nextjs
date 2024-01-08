import styled from "styled-components";

export default function Navbar() {
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

	return (
		<Container>
			<Title>Alune</Title>
		</Container>
	);
}
