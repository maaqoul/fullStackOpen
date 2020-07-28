import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (<h1>{course}</h1>);
const Part = ({ name, exercise }) => (<p>{name} {exercise}</p>);
const Content = ({ parts }) => (
  parts.map(({ name, exercises }, index) => <Part key={index} name={name} exercise={exercises} />)
);
const Total = ({ parts }) => (<p>Number of exercises {parts.reduce((accumulator, part) => (accumulator + part.exercises), 0)}</p>);
const App = () => {
  const courses = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const {name, parts} = courses;
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


