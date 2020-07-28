import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [upVote, setUpVote] = useState({});

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const handleSelectedAnecdote = () => {
    const { length } = props.anecdotes;
    const index = getRandomInt(length);
    setSelected(index)
  }

  const vote = () => {
    const anecdoteVotes = {
      ...upVote
    };
    anecdoteVotes[selected] = ++anecdoteVotes[selected] || 1
    setUpVote(anecdoteVotes)
  }

  const anecdoteWithMostVotes = () => {
    return Object.keys(upVote).length > 0 ? Object.keys(upVote).reduce((a, b) => upVote[a] > upVote[b] ? a : b) : false;
  }
  return (
    <div>
      {props.anecdotes[selected]} <br />
      has {upVote[selected] ? upVote[selected] : 0} votes <br />
      <button onClick={vote}>vote</button>
      <button onClick={handleSelectedAnecdote}>next anecdote</button>
      {anecdoteWithMostVotes() &&
        <div>
          <h2>anecdotes with the most votes</h2>
          {props.anecdotes[anecdoteWithMostVotes()]}
        </div>
      }

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)