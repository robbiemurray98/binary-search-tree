class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}



export class Tree{
    constructor(arr){
        this.root = this.#buildTree(arr);
    }


    #mergeSort = (arr) => {
        if(arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.#mergeSort(arr.slice(0, mid))
        const right = this.#mergeSort(arr.slice(mid))

        return this.#merge(left, right)
    }   


    #merge(left, right){
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



    #removeDuplicates = (arr) => {
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


    #buildTree(arr){
        const originalArr = this.#removeDuplicates(arr)
        const sortedArr = this.#mergeSort(originalArr)

        function build(sortedArr, start, end){
            if(start > end){
                return null
            }
            const middleIndex = Math.floor((start + end) / 2)
        
            const root = new Node(sortedArr[middleIndex])

            root.left = build(sortedArr, start, middleIndex - 1)
            root.right = build(sortedArr, middleIndex + 1, end)
            return root

        }

        return build(sortedArr, 0, sortedArr.length - 1)

    }



    includesValue(val) {
        const root = this.root
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

    insert(val){
        const root = this.root
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


    deleteItem(val){ 
        const root = this.root

        if(root === null){
            return null
        }

        if(val < root.value){
            root.left = this.deleteItem(val, root.left)
            return root
        } else if(val > root.value){
            root.right = this.deleteItem(val, root.right)
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

            root.right = this.deleteItem(root.value, root.right)
            return root

        }

    }

    levelOrderForEach(callback){
        const root = this.root
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

        return this
    }


    inOrderForEach(callback){
        const root = this.root
        if(!callback){
            throw new Error('Callback required')
        }

        function traverse(node){
            if(node === null) return
            traverse(node.left)
            callback(node.value)
            traverse(node.right)
        }

        traverse(root)
        return this

    }


    preOrderForEach(callback){
        const root = this.root
        if(!callback){
            throw new Error('Callback required')
        }

        // if(root === null){
        //     return
        // }

        // callback(root.value)
        // this.preOrderForEach(root.left, callback)
        // this.preOrderForEach(root.right, callback)

        function traverse(node){
            if(node === null) return
            callback(node.value)
            traverse(node.left)
            traverse(node.right)
        }

        traverse(root)
        return this

    }


    postOrderForEach(callback){
        const root = this.root
        if(!callback){
            throw new Error('Callback required')
        }

        function traverse(node){
            if(node === null) return
            traverse(node.left)
            traverse(node.right)
            callback(node.value)
        }    
        traverse(root)
        return this

    }


    height(val){
        const root = this.root
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

    depth(val){
        // step down towards val
        // every time you step down num = num++

        let num = 0
        let current = this.root

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

    isBalanced(){
        const root = this.root

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

    rebalance(){
        // create array from tree using in order traversal
        // write callback that pushes to an array

        const treeArr = []

        function callback(val){
            treeArr.push(val)
        }

        this.inOrderForEach(callback)

        const newBuild = new Tree(treeArr)
        const newRoot = newBuild.root
        // return newRoot
        this.root = newRoot
        return this
    }

    
}

