import './Node.css'

function Node ({isStart, isFinish, row, col, index, isWall, createNewGrid}) {

    const extraClass = isFinish ? 'finish' : isStart ? 'start' : isWall ? 'node-wall' : ''


    return (
        <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown = {(col, row) => createNewGrid(col, row)}
        >
        </div>
    )
}

export default Node
