import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
// Components
import Header from './organisms/Header';

export default () => {
    const Fluid = styled.div`
        background-color: #4d4b4b;
    `;

    return (
        <>
            <Fluid className='container-fluid'>
                <Header />
            </Fluid>
            <div className='container'>
                <Outlet />
            </div>
        </>
    );
}