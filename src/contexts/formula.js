
const operatorToFunction = {
    "+": (num1, num2) => +num1 + +num2,
    "-": (num1, num2) => +num1 - +num2,
    "*": (num1, num2) => +num1 * +num2,
    "/": (num1, num2) => +num1 / +num2
}

//----------Immediate Execution Logic--------------
/*
const searchExp = (arr) => {
    if (arr.length === 1) {
        return arr
    } else {

        let val;

        for (let i = 0; i < arr.length; i++) {

            if (arr[i] === '/') {
                val = operatorToFunction[arr[i]](arr[i - 1], arr[i + 1])
                arr.splice(i - 1, 3, val)
                break
            }

            if (arr[i] === '*') {
                val = operatorToFunction[arr[i]](arr[i - 1], arr[i + 1])
                arr.splice(i - 1, 3, val)
                break
            }

            if (arr[i] === '+') {
                val = operatorToFunction[arr[i]](arr[i - 1], arr[i + 1])
                arr.splice(i - 1, 3, val)
                break
            }

            if (arr[i] === '-') {
                val = operatorToFunction[arr[i]](arr[i - 1], arr[i + 1])
                arr.splice(i - 1, 3, val)
                break
            }
        }
        return searchExp(arr)
    }
}
*/
//----------Formula/Expression Logic---------------
//-------------------------ver. 1----------------------------------------(actualy doesn`t work .cause performs the action in the order specified in the array below)
export const seekAndDestroy = (arr, operand) => {
    let operandIndex = arr.indexOf(operand)
    let val = operatorToFunction[operand](arr[operandIndex - 1], arr[operandIndex + 1])
    arr.splice(operandIndex - 1, 3, val)
    return arr
}

export const calculate = (arr, operands = ["*", "/", "-", "+"]) => {
    if (operands.length === 0) {
        return +arr
    } else {
        for (let i = 0; i < operands.length; i++) {
            arr[arr.length - 1] === operands[i] && arr.pop()

            if (arr.indexOf(operands[i]) > 0) {

                seekAndDestroy(arr, operands[i])
                return calculate(arr, operands)
            } else {
                operands.shift()
                return calculate(arr, operands)
            }
        }

    }
}
//-------------------ver. 2-------------------------------

export const countExpression = (arr) => {
    if (/[*/+-]$/.test(arr[arr.length - 1])) {
        return countExpression(arr.slice(0, -1))
    }
    if (arr.includes('/') || arr.includes('*')) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '/') {
                arr.splice(i - 1, 3, operatorToFunction[arr[i]](arr[i - 1], arr[i + 1]))
                break
            }
            if (arr[i] === '*') {
                arr.splice(i - 1, 3, operatorToFunction[arr[i]](arr[i - 1], arr[i + 1]))
                break
            }
        }
        return countExpression(arr)
    } else {
        if (arr.includes('+') || arr.includes('-')) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === '+') {
                    arr.splice(i - 1, 3, operatorToFunction[arr[i]](arr[i - 1], arr[i + 1]))
                    break
                }
                if (arr[i] === '-') {
                    arr.splice(i - 1, 3, operatorToFunction[arr[i]](arr[i - 1], arr[i + 1]))
                    break
                }
            }
            return countExpression(arr)
        } else {
            return +arr
        }

    }
}







// console.log(eval(["2", "/", "5", "*", "2", "*", '-3'].join('')))
// console.log(countExpression(["2", "/", "5", "*", "2", "*", '-3', '-', '-', '+', '/', '/', '/']))
// console.log(searchExp(['3', '+', '5', '*', '6', '-', '2', '/', '4']))


////------------------------------------------doesn`t works as well
// const findOperator = (arr) => {
//     const operator = arr.filter((ch) => ["+", "-", "*", "/"].includes(ch))
//     const newArr = []
//     for (let i = 0; i < operator.length; i++) {
//         for (let k = 0; k < arr.length; k++) {
//             if (operator[i] === arr[i]) {

//             }

//         }
//     }
//     return operator;
// }

// console.log(findOperator(["6", "5", "5", "+", "6", "2", "2", "6", "3", "+", "2", "5", "*", "2", "5", "5", "6"]))
// console.log(["6", "5", "5", "+", "6", "2", "2", "6", "3", "+", "2", "5", "*", "2", "5", "5", "6", "*"].join('').replace(/[, ]+/g, '').split(' '))