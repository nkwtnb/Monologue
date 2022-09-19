declare var bootstrap: any;
declare var jQuery: any;
import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// Components
import Header from './Header';
import CommentModal from '../organisms/CommentModal';

const Fluid = styled.div`
background-color: #4d4b4b;
position: fixed;
height: 70px;
top: 0;
z-index: 100;
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
            <CommentModal />
            <Main className='container'>
                <Outlet />
            </Main>
        </>
    );
}
