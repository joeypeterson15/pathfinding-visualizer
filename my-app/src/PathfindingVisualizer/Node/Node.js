import './Node.css'

function GridNode ({isStart, isFinish, row, col, index, isWall, createNewGrid, stopNewGrid, isWeight}) {

    const extraClass = isFinish ? 'finish' : isStart ? 'start' : isWall ? 'node-wall' : isWeight ? 'weight-node' : ''


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

export default GridNode
