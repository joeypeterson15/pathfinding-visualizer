const DIRECTIONS = [[1, 0], [-1, 0], [0, -1], [0, 1]]

export function bidirectional (startNode, endNode, grid) {
    startNode.distance = 0
    endNode.distance = 0
    startNode.isStartChildNode = true
    endNode.isEndChildNode = true
    // let grid1 = grid
    // let grid2 = grid
    const visitedNodesInOrder = {'startPath' : [], 'endPath' : []}
    let unvisitedNodes = getAllNodes(grid)
    // let unvisitedNodes2 = getAllNodes(grid2, false, endNode.row, endNode.col)

    const visited1 = new Set()
    const visited2 = new Set()
    // visited1.add((startNode.row, startNode.col))
    // visited2.add((endNode.row, endNode.col))

    while (!!unvisitedNodes.length) {

        sortNodesByDistance(unvisitedNodes)
        // sortNodesByDistance(unvisitedNodes2)

        let currNode = unvisitedNodes.shift()
        // let currEndNode = unvisitedNodes2.shift()


        // let d1 = currStartNode.distance
        // let d2 = currEndNode.distance
        if (currNode.isStartChildNode) {

            visited1.add((currNode.row, currNode.col))
            visitedNodesInOrder['startPath'].push(currNode)
        } else {
            visited2.add((currNode.row, currNode.col))
             visitedNodesInOrder['endPath'].push(currNode)
        }

        // currNode.isVisited = true

        // visitedNodesInOrder.push(currNode)

        if ((currNode.isStartChildNode && visited2.has((currNode.row, currNode.col)) )|| (currNode.isEndChildNode && visited1.has((currNode.row, currNode.col)))) {
            return {
                'visitedNodesInOrder' : visitedNodesInOrder,
                'lastEndPathItem' : visitedNodesInOrder['endPath'][visitedNodesInOrder['endPath'].length - 1],
                'lastStartPathItem' : visitedNodesInOrder['startPath'][visitedNodesInOrder['startPath'].length - 1],
            }
        }
        updateNeighbors(currNode, grid, visited1, visited2)
        // updateNeighbors(currEndNode, grid2, visited2)



    }
}



function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

function updateNeighbors (node, grid, visited1, visited2) {

    let neighbors = getNeighbors(node, grid, visited1, visited2)

    for (let neighbor of neighbors) {
        neighbor.previousNode = node
        neighbor.distance = node.distance + 1
        if (node.isStartChildNode) {
            neighbor.isStartChildNode = true
        }
        if (node.isEndChildNode) {
            neighbor.isEndChildNode = true
        }
    }
}

function getNeighbors(node, grid, visited1, visited2) {
    let neighbors = []
    const {row, col} = node
    for (let i = 0; i < DIRECTIONS.length - 1; i++){
        let dr =  DIRECTIONS[i][0]
        let dc = DIRECTIONS[i][1]
        let r = row + dr
        let c = col + dc
        if (r >= 0 && r <= grid.length - 1 && c >= 0 && c <= grid[0].length - 1) {
            if (node.isStartChildNode && !visited1.has((grid[r][c].row, grid[r][c].col)))
            neighbors.push(grid[r][c])
        }   if (node.isEndChildNode && !visited2.has((grid[r][c].row, grid[r][c].col))) {
            neighbors.push(grid[r][c])
        }

    }
    return neighbors;
}


function getAllNodes(grid, isStart, r, c) {
    let list = []
    for (const row of grid) {
        for (let node of row) {

            // if (isStart) {
            //     if (node.isStart) {
            //         node.distance = 0
            //     }
            // } else {
            //     if (node.isFinish) {
            //         node.distance = 0
            //     }
            // }

            // if (node.row === r && node.col === c) {
            //     let temp = node
            //     temp.distance = 0
            //     node = temp
            // }
            list.push(node)
        }
    }
    return list
}


export function getNodesInShortestPath(item1, item2) {
    const nodesInShortestPathOrder = [];
    let curr1 = item1;
    let curr2 = item2;
    while (curr1 !== null) {
      nodesInShortestPathOrder.unshift(curr1);
      curr1 = curr1.previousNode;
    }
    while (curr2 !== null) {
        nodesInShortestPathOrder.push(curr2)
        curr2 = curr2.previousNode
    }
    return nodesInShortestPathOrder;
  }
