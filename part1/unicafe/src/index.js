import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { Statistics } from './components/Statistics'
import { Button } from './components/Button'
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  const total = () => {
    return good + bad + neutral
  }

  const average = () => {
    const sum = good - bad
    return sum ? (sum / total()) : 0
  }

  const positive = () => {
    return good ? (good * 100) / total() : 0
  }

  return (
    <div>
      <div className="feedback-buttons">
        <h1>give feedback</h1>
        <Button text="good" func={handleGood} />
        <Button text="Neutral" func={handleNeutral} />
        <Button text="Bad" func={handleBad} />
      </div>
      {
        (good || bad || neutral) ?
          <div className="statistics">
            <h1>Statistics</h1>
            <table>
              <tbody>
                <Statistics text='good' value={good} />
                <Statistics text='bad' value={bad} />
                <Statistics text='neutral' value={neutral} />
                <Statistics text='all' value={total()} />
                <Statistics text='average' value={average()} />
                <Statistics text='positive' value={positive()} />
              </tbody>
            </table>
          </div> :
          <div>
            <h1>No feedback given</h1>
          </div>
      }
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)