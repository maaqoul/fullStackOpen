import React from "react";
import { Part } from "./Part";


export const Content = ({ parts }) => (
    parts.map(({ name, exercises, id }, index) => <Part key={id} name={name} exercise={exercises} />)
);