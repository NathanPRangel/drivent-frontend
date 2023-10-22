import MuiButton from '@mui/material/Button';
import styled from 'styled-components';
import { AiFillGithub } from "react-icons/ai";

import useGithubGetCode from '../../hooks/api/useGithubGetCode';

export default function GithubButton({ variant = 'contained', children, ...props }) {
    const { githubGetCode } = useGithubGetCode();

    async function handleGithubSignIn() {
        try {
            githubGetCode();
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <StyledMuiButton variant={variant} {...props} onClick={() => handleGithubSignIn()}>
            <AiFillGithub size={30} />
            {children}
        </StyledMuiButton>
    );
}

const StyledMuiButton = styled(MuiButton)`
    margin-bottom: 10px !important;
    background-color: #000 !important;
`;
