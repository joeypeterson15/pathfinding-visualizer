import { useState, useEffect } from 'react'
import Node from './Node/Node.js'
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';


import './PathfindingVisualizer.css'


function PathfindingVisualizer () {

    const [grid, setGrid] = useState([])
    let isMouseDown = false
    const [isStartMode, setIsStartMode] = useState(false)
    const [isWallMode, setIsWallMode] = useState(false)
    const [isFinishMode, setIsFinishMode] = useState(false)
    const [startNode, setStartNode] = useState({row: 12, col: 5})
    const [finishNode, setFinishNode] = useState({row: 10, col: 35})

    useEffect(() => {
        const setup = []
        for (let row = 0; row < 20; row++) {
            const currentRow = []
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    col,
                    row,
                    //this is a boolean we can pass into node
                    isStart: row === startNode.row && col === startNode.col,
                    isFinish: row === finishNode.row && col === finishNode.col,
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
        const beginNode = grid[startNode.row][startNode.col];
        const endNode = grid[finishNode.row][finishNode.col];
        const visitedNodesInOrder = dijkstra(grid, beginNode, endNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }



      function createNewGrid(col, row) {
        isMouseDown = true
        const newGrid = [...grid]
        const node = newGrid[row][col]

        if (isWallMode) {
            const newNode = {
                ...node,
                isWall: !node.isWall
            }
            newGrid[row][col] = newNode
            setGrid(newGrid)
        }

        else if (isStartMode) {
          setStartNode({row, col})
          for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
              newGrid[row][col].isStart = (row === startNode?.row && col === startNode?.col)
            }
          }
          setGrid(newGrid)
        }

        else if (isFinishMode) {
          setFinishNode({row, col})
          for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
              newGrid[row][col].isFinish = (row === finishNode?.row && col === finishNode?.col)
            }
          }
          setGrid(newGrid)
        }
      }

      function stopNewGrid() {
          isMouseDown = false
      }

      function handleStart() {
        setIsFinishMode(false)
        setIsWallMode(false)
        setIsStartMode(true)
      }
      function handleFinish() {
        setIsStartMode(false)
        setIsWallMode(false)
        setIsFinishMode(true)
      }
      function handleWalls() {
        setIsStartMode(false)
        setIsFinishMode(false)
        setIsWallMode(true)
      }


      function resetGrid() {
        setIsStartMode(false)
        setIsWallMode(false)
        setIsFinishMode(false)
        const newGrid = []
        for (let row = 0; row < 20; row++) {
          let currentRow = []
          for (let col = 0; col < 50; col++) {
            const node = {
              row,
              col,
              isWall : false,
              isStart : col === startNode?.col && row === startNode?.row,
              isFinish : col === finishNode?.col && row === finishNode?.row,
              isVisited: false,
              distance: Infinity,
              previousNode: null
            }
            currentRow.push(node)
          }
          newGrid.push(currentRow)
        }
        setGrid(newGrid)

        for (let row = 0; row < 20; row++) {
          for (let col = 0; col < 50; col++) {
            document.getElementById(`node-${row}-${col}`).className ='node'
          }
        }



      }






    return (
        <>
            <button id="visualize-button" onClick={() => visualizeDijkstra()}>
                Visualize
            </button>
            <button className={isWallMode ? 'wall-mode' : ''} onClick={() => handleWalls()}>
              Edit Walls
            </button>
            <button className={isStartMode ? 'start-mode' : ''} onClick={() => handleStart()}>
              Edit Start Node
            </button>
            <button className={isFinishMode ? 'finish-mode' : ''} onClick={() => handleFinish()}>
              Edit Finish Node
            </button>
            <button onClick={resetGrid}>
              Reset
            </button>
            <div className="grid">
                {grid.map((row) => (
                    <div>
                        {row.map((node, nodeIndex) => {
                            const {isStart, isFinish} = node
                            return (
                                <Node
                                    isStart = {node.isStart}
                                    isFinish = {node.isFinish}
                                    row = {node.row}
                                    col = {node.col}
                                    index = {nodeIndex}
                                    isWall = {node.isWall}
                                    createNewGrid = {createNewGrid}
                                    stopNewGrid = {stopNewGrid}
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
