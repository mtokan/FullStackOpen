import {useState} from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.name}</button>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const [good, neutral, bad] = props.stateArray;
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = `${(good * 100) / all} %`;

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                <StatisticLine text={'good'} value={good}/>
                <StatisticLine text={'neutral'} value={neutral}/>
                <StatisticLine text={'bad'} value={bad}/>
                <StatisticLine text={'all'} value={all}/>
                <StatisticLine text={'average'} value={average}/>
                <StatisticLine text={'positive'} value={positive}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleIncrease = ([state, setState]) => () => {
        setState(state + 1);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button
                onClick={handleIncrease([good, setGood])}
                name={'good'}
            />
            <Button
                onClick={handleIncrease([neutral, setNeutral])}
                name={'neutral'}
            />
            <Button
                onClick={handleIncrease([bad, setBad])}
                name={'bad'}
            />
            <Statistics stateArray={[good, neutral, bad]}/>
        </div>
    )
}

export default App