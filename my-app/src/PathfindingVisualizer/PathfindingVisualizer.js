import { useState, useEffect } from 'react'
import GridNode from './Node/Node.js'
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import { bidirectional, getNodesInShortestPath } from '../algorithms/bidirectional.js';


import './PathfindingVisualizer.css'


function PathfindingVisualizer () {
    let isMouseDown = false
    const [grid, setGrid] = useState([])
    const [isStartMode, setIsStartMode] = useState(false)
    const [isWallMode, setIsWallMode] = useState(false)
    const [isFinishMode, setIsFinishMode] = useState(false)
    const [startNode, setStartNode] = useState({row: 12, col: 5})
    const [finishNode, setFinishNode] = useState({row: 10, col: 35})
    const [isWeightMode, setIsWeightMode] = useState(false)
    const [visualizationMode, setVisualizationMode] = useState('grid')

    useEffect(() => {
        const setup = []
        for (let row = 0; row < 20; row++) {
            const currentRow = []
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === startNode.row && col === startNode.col,
                    isFinish: row === finishNode.row && col === finishNode.col,
                    isVisited: false,
                    distance: Infinity,
                    isWall: false,
                    previousNode: null,
                    isWeight: false,
                    isStartChildNode: false,
                    isFinishChildNode: false,
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

      function visualizeBidirectional () {
        const beginNode = grid[startNode.row][startNode.col];
        const endNode = grid[finishNode.row][finishNode.col];
        // const {visitedNodesInOrder, lastEndPathItem, lastStartPathItem} = bidirectional(beginNode, endNode, grid)
        const res = bidirectional(beginNode, endNode, grid)
        const shortestPathNodes = getNodesInShortestPath(res[2], res[1]);
        animateDijkstra(res[0], shortestPathNodes)
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
        else if (isWeightMode) {
            const newNode = {
                ...node,
                isWeight: !node.isWeight
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
        setIsWeightMode(false)
        setIsStartMode(true)
      }
      function handleFinish() {
        setIsStartMode(false)
        setIsWallMode(false)
        setIsWeightMode(false)
        setIsFinishMode(true)
      }
      function handleWalls() {
        setIsStartMode(false)
        setIsFinishMode(false)
        setIsWeightMode(false)
        setIsWallMode(true)
      }
      function handleWeight() {
        setIsStartMode(false)
        setIsFinishMode(false)
        setIsWallMode(false)
        setIsWeightMode(true)
      }

      function changeVisualizationMode () {
        if (visualizationMode == 'grid') {
          setVisualizationMode('tree')
        }
        else {
          setVisualizationMode('grid')
        }
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
              previousNode: null,
              isWeight: false,
              isStartChildNode: false,
              isFinishChildNode: false,
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






    if (visualizationMode == "grid") return (

        <>
            <button onClick={() => changeVisualizationMode()}>{visualizationMode == 'grid' ? "Tree" : "Grid"}</button>


            <div className="flex-buttons">
                <button className={isWallMode ? 'wall-mode' : 'button'} onClick={() => handleWalls()}>
                  Edit Walls
                </button>
                <button className={isStartMode ? 'start-mode' : 'button'} onClick={() => handleStart()}>
                  Edit Start Node
                </button>
                <button className={isFinishMode ? 'finish-mode' : 'button'} onClick={() => handleFinish()}>
                  Edit Finish Node
                </button>
                <button className={isWeightMode ? 'weight-mode' : 'button'} onClick={() => handleWeight()}>
                  Add Weight
                </button>
                <button className="button" onClick={resetGrid}>
                  Reset
                </button>
            </div>
                <button id="visualize-button" onClick={() => visualizeDijkstra()}>
                    Dijkstra
                </button>
                <button id="visualize-buttons" onClick={() => visualizeBidirectional()}>
                    Bidirectional
                </button>
            <div className="grid">
                {grid.map((row) => (
                    <div>
                        {row.map((node, nodeIndex) => {
                            const {isStart, isFinish} = node
                            return (
                                <GridNode
                                    isStart = {node.isStart}
                                    isFinish = {node.isFinish}
                                    row = {node.row}
                                    col = {node.col}
                                    index = {nodeIndex}
                                    isWall = {node.isWall}
                                    createNewGrid = {createNewGrid}
                                    stopNewGrid = {stopNewGrid}
                                    isWeight = {node.isWeight}
                                />
                            )
                            })}
                    </div>
                ))}
            </div>


        </>



    )
    else return (
      <>
      <div>
        <button onClick={() => changeVisualizationMode()}>{visualizationMode == 'grid' ? "Tree" : "Grid"}</button>


      </div>
        <canvas id="canvas" width="800" height="500"></canvas>
      </>
    )


}

export default PathfindingVisualizer
