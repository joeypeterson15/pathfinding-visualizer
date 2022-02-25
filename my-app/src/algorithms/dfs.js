// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dfs(startNode, finishNode, grid) {

    const DIRECTIONS = [[1, 0], [-1, 0], [0, -1], [0, 1]]
    // const grid = getAllNodes(grid);
    // const ROWS = grid.length
    // const COLS = grid[0].length

    // q.push({'row' : startNode.row, 'col' : startNode.col})
    let visitedNodesInOrder = []
    let q = []
    q.push(startNode)
    let minimumPath = null
    let visitedPath = []
    while (!!q.length) {
        // let {row,col} = q.pop()
        let currNode = q.pop()
        if (currNode.isWall) continue
        currNode.isVisited = true
        visitedNodesInOrder.push(currNode)
        visitedPath.push(currNode)

        if (currNode.row === finishNode.row && currNode.col === finishNode.col) {
            minimumPath = (minimumPath === null || visitedPath.length < minimumPath.length) ? visitedPath : minimumPath
            for (let neighbor of visitedPath) {
                neighbor.previousNode = null
                // neighbor.isVisited = false
            }
            visitedPath = [...q]
            continue
        }
        let neighbors =  updateUnvisitedNeighbors(currNode, grid, q)
        q.push(...neighbors)

    }
    return {'visitedNodesInOrder' : visitedNodesInOrder, 'minimumPath' : minimumPath}
  }

//   function sortNodesByDistance(unvisitedNodes) {
//     unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
//   }

  function updateUnvisitedNeighbors(node, grid, q) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
      }
      return unvisitedNeighbors

  }

  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function DFSgetNodesInShortestPath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
