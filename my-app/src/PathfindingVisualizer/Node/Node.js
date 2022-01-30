import './Node.css'

function Node ({isStart, isFinish, row, col, index}) {

    const extraClass = isFinish ? 'finish' : isStart ? 'start' : ''

    return (
        <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}>

        </div>
    )
}

export default Node
