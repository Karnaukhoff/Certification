import { styled } from "styled-components";

export const User = styled.div`
    display: flex;
    background-color: #fff;
    border: 2px solid #000000;
    justify-content: space-between;
    &:hover {
        background-color: lightgrey;
    }
`;
export const MainInfo = styled.div`
    display: flex;
`;
export const Avatar = styled.img`
    width: 50px;
    height: 50px;
`;
export const Login = styled.div`
    margin-left: 10px;
`;
export const CountOfReps = styled.div``;