const DIRECTIONS = [[1, 0], [-1, 0], [0, -1], [0, 1]]

export function bidirectional (startNode, endNode, grid) {
    startNode.distance = 0
    endNode.distance = 0
    const unvisitedNodes1 = getAllNodes(grid)
    const unvisitedNodes2 = getAllNodes(grid)
    const visited1 = new Set()
    const visited2 = new Set()
    visited1.add((startNode.row, startNode.col))
    visited2.add((endNode.row, endNode.col))

    while (!!unvisitedNodes1.length || !!unvisitedNodes2.length) {
        sortNodesByDistance(unvisitedNodes1)
        sortNodesByDistance(unvisitedNodes2)
        let currStartNode = unvisitedNodes1.shift()
        let currEndNode = unvisitedNodes2.shift()

        if (currEndNode == currStartNode) {
            return [...visited1, ...visited2]
        }
        visited1.add((currStartNode.row, currStartNode.col))
        // currStartNode.isVisited = true
        // currEndNode.isVisited = true
        visited2.add((currEndNode.row, currEndNode.col))
        updateNeighbors(currStartNode, grid, visited1)
        updateNeighbors(currEndNode, grid, visited2)



    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

function updateNeighbors (node, grid, visited) {
    neighbors = getNeighbors(node, grid, visited)
    for (neighbor in neighbors) {
        neighbor.previousNode = node
        neighbor.distance = node.distance + 1
    }
}

function getNeighbors(node, grid, visited) {
    neighbors = []
    const {r, c} = node
    for (let i = 0; i < DIRECTIONS.length - 1; i++){
        let dr =  DIRECTIONS[i][0]
        let dc = DIRECTIONS[i][1]
        row = r + dr
        col = c + dc
        if (row >= 0 && row <= grid.length - 1 && col >= 0 && col <= grid[0].length - 1 && !visited.get((row,col))) {
            neighbors.push(grid[row][col])
        }

    }
    return neighbors;
}


function getAllNodes(grid) {
    list = []
    for (const row of grid) {
        for (const node of row) {
            list.append(node)
        }
    }
    return list
}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
