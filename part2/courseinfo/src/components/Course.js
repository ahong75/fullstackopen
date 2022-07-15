import React from 'react'

const Header = (props) => (
  <h2>
    {props.course}
  </h2>
)

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
    <Total parts={parts} />
  </div>
)

const Total = ({parts}) => {
  const sum = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return (
    <p><b>
      total of {sum} exercises
    </b></p>
  )
}

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course
