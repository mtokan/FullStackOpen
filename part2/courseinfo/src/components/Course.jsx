const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </>
    )
}

const Total = ({parts}) => {
    return (
        <h4>
            total of {parts.reduce((acc, v) => acc + v.exercises, 0)} exercises
        </h4>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course