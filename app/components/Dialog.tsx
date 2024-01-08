import { ReactNode } from "react";
import styled from "styled-components";

interface DialogProps {
    children: ReactNode; // ReactNode type can accept any renderable content
    visible: boolean;
    onHide: () => void;
  }

export default function Dialog({children, visible, onHide} : DialogProps) {
	const Title = styled.h1`
		font-size: 2.25em;
		text-align: left;
		color: #1a1660;
        margin: 0;
        font-weight: 700;
	`;

	const Container = styled.div<{$visible?: boolean;}>`
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;	
		background-color: white;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
        visibility: ${props => props.$visible? "visible" : "collapse"};
	`;

	return (
		<Container $visible={visible}>
			{children}
		</Container>
	);
}
