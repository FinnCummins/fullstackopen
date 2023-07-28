const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
      parts.map(part => <Part key={part.id} part={part} />)
    }
  </>

const Course = (props) => {
  console.log(props.course)
  console.log("Hey", props.course.name)
  console.log(props.course.parts)

  const addNums = (parts) => {
    let initialValue = 0
    let total = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
          initialValue
      )
    
    return total
  }

  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total sum={addNums(props.course.parts)} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App