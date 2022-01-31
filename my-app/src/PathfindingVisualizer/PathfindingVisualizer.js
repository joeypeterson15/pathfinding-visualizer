import { useState, useEffect } from 'react'
import Node from './Node/Node.js'
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';


import './PathfindingVisualizer.css'


function PathfindingVisualizer () {

    const [grid, setGrid] = useState([])

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
                    isVisited: false,
                    distance: Infinity,
                    isWall: false,
                    previousNode: null,
                }
                currentRow.push(currentNode)
            }
            setup.push(currentRow)
        }
        setGrid(setup)
    }, [])



    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }

      function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }

      function visualizeDijkstra() {
        // const {grid} = this.state;
        // const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const startNode = grid[10][5];
        const finishNode = grid[10][45];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }

      function createNewGrid(col, row) {
        const newGrid = [...grid]
        const node = grid[row][col]
        const newNode = {
            ...node,
            isWall: !grid[row][col].isWall
        }
        newGrid[row][col] = newNode
        setGrid(newGrid)
      }






    return (
        <>
            <button id="visualize-button" onClick={() => visualizeDijkstra()}>
                Visualize
            </button>
            <div className="grid">
                {grid.map((row) => (
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
                                    isWall = {node.isWall}
                                    createNewGrid = {createNewGrid}
                                />
                            )
                            })}
                    </div>
                ))}
            </div>

        </>
    )
}

export default PathfindingVisualizer
