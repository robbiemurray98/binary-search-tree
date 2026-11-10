import { Tree } from "./app-two.js";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const build = new Tree(arr)

const buildRoot = build.root

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}



function logValue(val){
    console.log(val)
}

console.log(build.levelOrderForEach(logValue))
console.log(build.inOrderForEach(logValue))
console.log(build.preOrderForEach(logValue))
console.log(build.postOrderForEach(logValue))

build.insert(101)
build.insert(102)
build.insert(103)
build.insert(104)
build.insert(105)

console.log(build.isBalanced())
build.rebalance()

const newBuildRoot = build.root

prettyPrint(buildRoot)
console.log(build.isBalanced())
prettyPrint(newBuildRoot)

console.log(build.levelOrderForEach(logValue))
console.log(build.inOrderForEach(logValue))
console.log(build.preOrderForEach(logValue))
console.log(build.postOrderForEach(logValue))




