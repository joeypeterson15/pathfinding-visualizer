import { useState, useEffect } from 'react'
import Node from './Node/Node.js'

import './PathfindingVisualizer.css'


function PathfindingVisualizer () {

    const [nodes, setNodes] = useState([])

    useEffect(() => {
        const setup = []
        for (let row = 0; row < 20; row++) {
            const currentRow = []
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    col,
                    row,
                    //this is a boolean we can pass into node
                    isStart: row === 10 && col === 5,
                    isFinish: row === 10 && col === 45,
                }
                currentRow.push(currentNode)
            }
            setup.push(currentRow)
        }
        setNodes(setup)
    })

    return (
        <div className="grid">
            {nodes.map((row) => (
                <div>
                    {row.map((node, nodeIndex) => {
                        const {isStart, isFinish} = node
                        return (
                            <Node
                                isStart = {isStart}
                                isFinish = {isFinish}
                                row = {node.row}
                                col = {node.col}
                                index = {nodeIndex}
                            />

                        )
                        })}
                </div>
            ))}
        </div>
    )
}

export default PathfindingVisualizer
