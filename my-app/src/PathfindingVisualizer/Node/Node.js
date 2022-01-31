import './Node.css'

function Node ({isStart, isFinish, row, col, index, isWall, createNewGrid, stopNewGrid}) {

    const extraClass = isFinish ? 'finish' : isStart ? 'start' : isWall ? 'node-wall' : ''


    return (
        <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown = {() => createNewGrid(col, row)}
        onMouseUp = {() => stopNewGrid()}
        >
        </div>
    )
}

export default Node
