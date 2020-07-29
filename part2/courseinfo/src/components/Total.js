import React from "react";

export const Total = ({ parts }) => (<p>Number of exercises {parts.reduce((accumulator, part) => (accumulator + part.exercises), 0)}</p>);