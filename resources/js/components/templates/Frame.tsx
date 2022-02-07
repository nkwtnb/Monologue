import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
// Components
import Header from '../organisms/Header';
const Fluid = styled.div`

background-color: #4d4b4b;
position: fixed;
height: 70px;
top: 0;
`;

const Main = styled.div`
margin-top: 100px;
`
export default () => {

    return (
        <>
            <Fluid className='container-fluid'>
                <Header />
            </Fluid>
            <Main className='container'>
                <Outlet />
            </Main>
        </>
    );
}
