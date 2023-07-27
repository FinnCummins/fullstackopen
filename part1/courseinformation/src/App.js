const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.title} {props.numOfExercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part title={props.titles[0]} numOfExercises={props.exercises[0]}/>
      <Part title={props.titles[1]} numOfExercises={props.exercises[1]}/>
      <Part title={props.titles[2]} numOfExercises={props.exercises[2]}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content titles={[parts[0].name, parts[1].name, parts[2].name]} exercises={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
      <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises}/>
    </div>
  )
}

export default App;
