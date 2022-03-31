import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";

const This = styled.div`
    width:calc(100vw - 30px);
    max-width: 600px;
    height: 600px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 98;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .close1 {
        position: absolute;
        right: 24px;
        top: 20px;
        width: 10px;
        height: 10px;
        object-fit: contain;
        cursor: pointer;
    }

    .label0 {
        display: inline-block;
        flex-direction: row;
        align-items: center;
        text-align: center;

        margin-left: auto;
        margin-right: auto;
    }

    .label1 {
        font-size: 20px;
        margin-top: 60px;
        margin-bottom: 48px;
    }

`;

const Comp = (props: any) => {
    const { children } = props;

    return (
        <This
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div className="container0 container1 border-trbl">
                <div
                    className="close1"
                    onClick={() => {
                        props.setBoolPopup1(false);
                    }}
                >
                    <span className="icon-Group-1795"></span>
                </div>
                <div className="text0 ">{children}</div>
            </div>
        </This>
    );
};

export default Comp;
