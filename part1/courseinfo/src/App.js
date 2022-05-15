const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercise}</p>
    )
}
const Content = (props) => {
    return (
        <div>
          <Part name={props.part1} exercise={props.exercise1} />
          <Part name={props.part2} exercise={props.exercise2} />
          <Part name={props.part3} exercise={props.exercise3} />
        </div>  
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.one + props.two + props.three}</p>
    )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
      <Total one={exercises1} two={exercises2} three={exercises3} />
    </div>
  )
}

export default App