import { ReactNode } from "react";
import styled from "styled-components";

interface DialogProps {
    children: ReactNode; // ReactNode type can accept any renderable content
    visible: boolean;
  }

export default function Dialog({children, visible} : DialogProps) {
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
		box-shadow: 1px 1px 20px #e7e7e7;
		border-radius: 12px;
        visibility: ${props => props.$visible? "visible" : "collapse"};
	`;

	return (
		<Container $visible={visible}>
			{children}
		</Container>
	);
}
