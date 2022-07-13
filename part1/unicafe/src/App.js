import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button> 
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = good / all * 100
  if (all == 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticsLine stat="good" value={good}/>
        <StatisticsLine stat="neutral" value={neutral}/>
        <StatisticsLine stat="bad" value={bad}/>
        <StatisticsLine stat="all" value={all}/>
        <StatisticsLine stat="average" value={avg}/>
        <StatisticsLine stat="positive" value={pos + ' %'} />
      </table>
    </>
  )
}

const StatisticsLine = ({stat, value}) => (
  <tr>
    <td>{stat}</td>
    <td>{value}</td>
  </tr>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
