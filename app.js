class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}



class Tree{
    constructor(arr){
        this.root = buildTree(arr);
    }
}





const mergeSort = (arr) => {
    if(arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))

    return merge(left, right)
}



function merge(left, right){
    const result = []

    let i = 0
    let j = 0


    while(i < left.length && j < right.length){
        if(left[i] <= right[j]){
            result.push(left[i]);
            i++
        } else {
            result.push(right[j])
            j++
        }
    }


    return result.concat(left.slice(i)).concat(right.slice(j))
}



const removeDuplicates = (arr) => {
    const newArr = arr
    for(let i = 0; i < newArr.length; i++){
        const current = newArr[i]
        let j
        for(j = 1; j < newArr.length; j++){
            if(current === newArr[j]){
                if(i != j){
                    newArr.splice(j, 1)

                }
            }
        }

    }


    return newArr
}






// class bBSearchTree{
//     constructor(arr){
//         this.arr = arr
//     }

    function buildTree(arr){
    // sort and remove duplicates
        const originalArr = removeDuplicates(arr)
        const sortedArr = mergeSort(originalArr)

        const middleIndex = Math.floor(sortedArr.length / 2)
        const middleValue = sortedArr[middleIndex]
        const rootNode = new Node(middleValue)

        const leftArr = sortedArr.slice(0, middleIndex)
        const rightArr = sortedArr.slice(middleIndex + 1)

        function createLeftBranch(arr){
            let current = rootNode
            while(arr.length !== 0){
                if(arr[2] === undefined){
                    const newNode = new Node(arr[0])
                    current.left = newNode
                    arr.splice(0, 1)
                } else {
                    l = arr.length
                    const newNodeOne = new Node(arr[l - 1])
                    const newNodeTwo = new Node(arr[l - 2])

                    current.left = newNodeTwo
                    current = newNodeTwo
                    current.right = newNodeOne

                    arr.splice(-2, 2)
                }
            
            }
        }

        function createRightBranch(arr){
            let current = rootNode
            while(arr.length !== 0){
                if(arr.length === 1){
                    const newNode = new Node(arr[0])
                    current.right = newNode
                    arr.splice(0, 1)
                }

                const newNodeOne = new Node(arr[0])
                const newNodeTwo = new Node(arr[1])

                current.right = newNodeTwo
                current = newNodeTwo
                current.left = newNodeOne

                arr.splice(0, 2)
            }
        }

        createLeftBranch(leftArr)
        createRightBranch(rightArr)
        return rootNode
    }


    function includesValue(val, tree) {
        const root = tree.root
        let current = root;
        while(current != null){
            // console.log('test')

            if(current.value === val){
                return true
            }

            if(current.value > val){
                current = current.left
            } else {
                current = current.right;
            }

        }

        return false
        
    }

    function insert(val, tree){
        const root = tree.root
        let current = root
        let leftNode
        let rightNode

        while(current != null){
            leftNode = current.left
            rightNode = current.right

            if(current.val === val){
                return
            }

            if(val > current.value && rightNode === null){
                const newNode = new Node(val)
                current.right = newNode
            }else if(val > current.value && val < rightNode.value){
                current = rightNode
                if(current.leftNode === null){
                    const newNode = new Node(val)
                    current.left = newNode;
                }
            } else if(val < current.value && leftNode === null){
                const newNode = new Node(val)
                current.left = newNode
            } else if(val < current.value && val > leftNode.value){
                current = leftNode
                if(leftNode.right === null){
                    const newNode = new Node(val)
                    leftNode.right = newNode;
                }

            }

            if(current.value > val){
                current = current.left
            } else {
                current = current.right
            }
        }
    }




function deleteItem(val, root){ 

    if(root === null){
        return null
    }

    if(val < root.value){
        root.left = deleteItem(val, root.left)
        return root
    } else if(val > root.value){
        root.right = deleteItem(val, root.right)
        return root
    }


    if(root.right === null && root.left === null){
        return null
    } else if((root.right != null && root.left === null) || (root.right === null && root.left != null)){
        if(root.right != null){
            return root.right
        } else if(root.left != null){
            return root.left
        }
    } else if(root.right && root.left){
        let successor = root.right
        while(successor.left != null){
            successor = successor.left
        }

        root.value = successor.value

        root.right = deleteItem(root.value, root.right)
        return root

    }

}

function levelOrderForEach(root, callback){

    if(!callback){
        throw new Error('Callback required')
    }


    // how do we traverse through the tree
    function traverse(queue){
        if(queue.length === 0) return

        const current = queue.shift()

        callback(current.value)

        if(current.left) queue.push(current.left)
        if(current.right) queue.push(current.right)

        traverse(queue)
    }

    traverse([root])

}


function inOrderForEach(root, callback){
    if(!callback){
        throw new Error('Callback required')
    }

    if(root == null){
        return
    }

    inOrderForEach(root.left, callback)
    callback(root.value)
    inOrderForEach(root.right, callback)

}

function preOrderForEach(root, callback){
    if(!callback){
        throw new Error('Callback required')
    }

    if(root === null){
        return
    }

    callback(root.value)
    preOrderForEach(root.left, callback)
    preOrderForEach(root.right, callback)

}

function postOrderForEach(root, callback){
    if(!callback){
        throw new Error('Callback required')
    }

    if(root === null){
        return
    }

    postOrderForEach(root.left, callback)
    postOrderForEach(root.right, callback)
    callback(root.value)

}



function height(root, val){

    function findNode(root, val){

        if(root === null){
            return undefined
        }

        if(val > root.value){
            return findNode(root.right, val)
        } else if(val < root.value){
            return findNode(root.left, val)
        }

        if(val === root.value){
            return root
        }
    }

    function findHeight(node){
        if(node === null) return -1

        return 1 + Math.max(findHeight(node.left), findHeight(node.right))
    }

    const foundNode = findNode(root, val)

    if(foundNode === undefined){
        return undefined
    }

    return findHeight(foundNode)

}

function depth(root, val){
    // step down towards val
    // every time you step down num = num++

    let num = 0
    let current = root

    while(current != null){
        if(current.value === val){
            return num
        }
        if(val > current.value){
            current = current.right
            num++
        } else if(val < current.value){
            current = current.left
            num++
        }
    }

    return undefined

}

function isBalanced(root){

    function findHeight(node){
        if(node === null) return -1
        let leftHeight = findHeight(node.left)
        let rightHeight = findHeight(node.right)

        if(leftHeight === null || rightHeight === null){
            return null
        }

        let heightDiff = Math.abs(leftHeight - rightHeight)


        if(heightDiff > 1){
            return null
        } else {
            return 1 + Math.max(leftHeight, rightHeight)
        }

    }

    if(findHeight(root) === null){
        return false
    } else {
        return true
    }

}

function rebalance(root){
    // create array from tree using in order traversal
    // write callback that pushes to an array

    const treeArr = []

    function callback(val){
        treeArr.push(val)
    }

    inOrderForEach(root, callback)

    const newBuild = new Tree(treeArr)
    const newRoot = newBuild.root
    return newRoot
}

const arr = [11, 3, 9, 5, 7, 1, 11]

const build = new Tree(arr)
const root = build.root



insert(13, build)

insert(14, build)

insert(15, build)

insert(16, build)


// deleteItem(5, root)

function logValue(val){
    console.log(val)
}

// levelOrderForEach(root, logValue)

// inOrderForEach(root, logValue)

// console.log(arr[-1])



// preOrderForEach(root, logValue)

// postOrderForEach(root, logValue)

// console.log(height(root, 5))

// console.log(depth(root, 15))

// console.log(root.right)

// console.log(isBalanced(root))

const rebalancedBuild = rebalance(root)

// const arrTest = [1, 2, 3, 4, 5]

// arrTest.splice(0, 1)

// console.log(arrTest[0])


// const left = root.left

// console.log(build.root.right)



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// prettyPrint(root)
prettyPrint(rebalancedBuild)


// console.log(includesValue(2, build))

// console.log(build)

