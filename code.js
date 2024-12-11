function tsp_ls(distance_matrix) {
    var path = Array.from(Array(distance_matrix.length).keys())
    path = path.reduce(
        (acc, _, i) => {
            random = Math.floor(Math.random() * (acc.length - i)) + i;
            [acc[i], acc[random]] = [acc[random], acc[i]]; 
            return acc;
        },
        [...path]
    );
    var current_distance = Infinity
    var best_distance = costOfPath(distance_matrix,path)
    do{ improvementMade = false //have to run through the first iteration
        for(let i = 1; i < path.length-2; i++){ 
            for(let j = i+1; j < path.length-1; j++){ //based on the observations made in https://en.wikipedia.org/wiki/2-opt
                path = TwoOptSwap(path, i, j)
                //console.log(path + " " + i + " " + j)
                current_distance = costOfPath(distance_matrix,path)
                if(current_distance < best_distance){ //stopping criteria, no improvement, no need to keep going
                    best_distance = current_distance
                    improvementMade = true;
                    break;
                }
            }
            if(improvementMade) break; //really wish I could just use goto
        }
        //console.log(improvementMade)
    }while(improvementMade)
    return best_distance;
}

function costOfPath(distance_matrix, path){
    var cost = 0
    for (let i = 0; i< path.length-1; i++){
        cost += distance_matrix[path[i]][path[i+1]]
    }
    return cost
}

function TwoOptSwap(path, i, k){ //ran into some issue where swapping was perfomring improperly, think I got it fixed for the most part
    //console.log(path)
    beginning = path.slice(0,i)
    //console.log(beginning)
    middle = path.slice(i,k+1)
    //console.log(middle)
    middle.reverse()
    end = path.slice(k+1)
    //console.log(end)
    newPath = [].concat(beginning).concat(middle).concat(end)
    //console.log(newPath)
    return newPath
}


dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
console.log(tsp_ls(dm))

/* Beats out the recursive total cost algorithm at https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/
function totalCost(mask, pos, n, cost) {

    // Base case: if all cities are visited, return the cost
    // to return to the starting city (0)
    if (mask === (1 << n) - 1) {
        return cost[pos][0];
    }

    let ans
        = Number.MAX_VALUE;  

    // Try visiting every city that has not been visited yet
    for (let i = 0; i < n; i++) {
        if ((mask & (1 << i))
            === 0) { 
            
            // If city i is not visited, visit it and update
            // the mask
            ans = Math.min(ans,
                           cost[pos][i]
                               + totalCost(mask | (1 << i),
                                           i, n, cost));
        }
    }

    return ans;
}
 
function tsp(cost) {
    const n = cost.length;
    
    // Start from city 0, and only city
   // 0 is visited initially (mask = 1)
    return totalCost(
        1, 0, n, cost);  
}

console.log(tsp(dm))*/