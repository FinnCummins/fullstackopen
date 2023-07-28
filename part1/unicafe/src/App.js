import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      </>
    )
  }
  return (
    <>
      <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
    </>
  )
}

const Statistics = (props) => {

  if ((props.good + props.neutral + props.bad) === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="average" value={(props.good + props.bad*-1)/(props.good+props.neutral+props.bad)} />
          <StatisticLine text="positive" value={(props.good/(props.good+props.bad+props.neutral))*100} />
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {

  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App