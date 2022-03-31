import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';


const This = styled.div`
  width: 101vw;
  height: 101vh;
  opacity : 0.4;
  background-color : #000;
  position: fixed;
  z-index: 91;
  max-width: 600px;
`;


const Comp = (props: any) => {
  const { children } = props;

  useEffect(() => {
  }, [])

  return (
    <This 
    {...props}
    >
      {children}
    </This>
  );
};

export default Comp;
