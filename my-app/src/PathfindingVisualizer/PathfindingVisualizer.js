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
                    {row.map((node, nodeIndex) => <Node />)}
                </div>
            ))}
        </div>
    )
}

export default PathfindingVisualizer
