const DIRECTIONS = [[1, 0], [-1, 0], [0, -1], [0, 1]]

export function bidirectional (startNode, endNode, grid) {
    startNode.distance = 0
    endNode.distance = 0
    const visitedNodesInOrder = {'startPath' : [], 'endPath': []}
    let unvisitedNodes1 = getAllNodes(grid, startNode.row, startNode.col)
    let unvisitedNodes2 = getAllNodes(grid, endNode.row, endNode.col)
    // changeInitalDistance(unvisitedNodes1, true)
    // changeInitalDistance(unvisitedNodes2, false)
    const visited1 = new Set()
    const visited2 = new Set()
    visited1.add((startNode.row, startNode.col))
    visited2.add((endNode.row, endNode.col))

    while (!!unvisitedNodes1.length || !!unvisitedNodes2.length) {
        sortNodesByDistance(unvisitedNodes1)
        sortNodesByDistance(unvisitedNodes2)
        let currStartNode = unvisitedNodes1.shift()
        let currEndNode = unvisitedNodes2.shift()
        let d1 = currStartNode.distance
        let d2 = currEndNode.distance
        visited1.add((currStartNode.row, currStartNode.col))
        currStartNode.isVisited = true
        currEndNode.isVisited = true
        visited2.add((currEndNode.row, currEndNode.col))
        visitedNodesInOrder['startPath'].push(currStartNode)
        visitedNodesInOrder['endPath'].push(currEndNode)
        if (currEndNode.row === currStartNode.row && currEndNode.col === currStartNode.col) {
            return {
            'visitedNodesInOrder' : [...visitedNodesInOrder['startPath'], ...visitedNodesInOrder['endPath']],
            'lastStartPathItem' : visitedNodesInOrder['startPath'][visitedNodesInOrder['startPath'].length - 1],
            'lastEndPathItem' : visitedNodesInOrder['endPath'][visitedNodesInOrder['endPath'].length - 1],
            }
        }
        updateNeighbors(currStartNode, grid, visited1)
        updateNeighbors(currEndNode, grid, visited2)



    }
}



function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

function updateNeighbors (node, grid, visited) {
    let neighbors = getNeighbors(node, grid, visited)
    for (const neighbor in neighbors) {
        neighbor.previousNode = node
        neighbor.distance = node.distance + 1
    }
}

function getNeighbors(node, grid, visited) {
    let neighbors = []
    const {row, col} = node
    for (let i = 0; i < DIRECTIONS.length - 1; i++){
        let dr =  DIRECTIONS[i][0]
        let dc = DIRECTIONS[i][1]
        let r = row + dr
        let c = col + dc
        if (r >= 0 && r <= grid.length - 1 && c >= 0 && c <= grid[0].length - 1 && !visited.has((r,c))) {
            neighbors.push(grid[row][col])
        }

    }
    return neighbors;
}


function getAllNodes(grid, r, c) {
    let list = []
    for (const row of grid) {
        for (const node of row) {

            if (node.row = r && node.col == c) {
                node.distance = 0
            }
            list.push(node)
        }
    }
    return list
}


export function getNodesInShortestPathOrder(item1, item2) {
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
