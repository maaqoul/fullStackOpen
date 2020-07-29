import React from "react";
import { Header } from "./Header";
import { Content } from "./Content"
import { Total } from "./Total";

export const Course = ({course}) => {
    const {name, parts} = course;
    return (
        <>
            <Header name={name}/>
            <Content parts={parts}/>
            <Total parts={parts} />
        </>
    )
}