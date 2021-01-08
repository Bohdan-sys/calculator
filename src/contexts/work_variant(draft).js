import React, { useState, useEffect } from "react";
import { buttons } from './Buttons'
import { calculate, countExpression } from './formula'

export const ActionContext = React.createContext();

export const ActionContextProvider = ({ children }) => {
    const [button, setButton] = useState(buttons)

    const [answer, setAnswer] = useState()

    const [arr, setArr] = useState([])

    const [count, setCount] = useState('0')

    const limitter = () => {
        setCount('Digit Limit Met')
        setTimeout(() => setCount(answer), 1000)
    }

    const formattedCount = (value) => {
        return value.toString().replace(/\.$/gm, '').replace(/^0+(?!\.)|(?:\.|(\..*?))0+$/gm, '$1').replace(/\-$/gm, '')
    }

    const formattedArray = (arr) => {
        return arr.flat().slice(0, -1).filter(Boolean)
    }
    const modArr = (arr) => {
        return arr.join().replace(/[, ]+/g, " ").split(' ')
    }


    // console.log(arr)
    // console.log(count)
    const addCount = (value) => {

        if (/^[-0-9.]/.test(value) && count.length <= 17 && !(/[a-zA-Z]/.test(count))) {
            setAnswer(count.substring(0, 18))

        }
        if (!(value === '.' && count.includes('.'))) {
            setCount(count + value)
            setArr([...modArr(arr), value])
        }

        if (count === '0' && value === '0') {
            setCount(value)
        }

        if (count === '0' && value !== '0') {
            setCount(value)
        }

        if (count === '0' && value === '.') {
            setCount(count + value)
        }

        if (!count && value === '.') {
            setCount('0' + value)
        }

        if (count === '-' && value === '.') {
            setCount(count + '0' + value)
        }


        //-----------------------------------------------------------------------------------
        if (count.length !== 0 && /[X/+-]/.test(value)) {
            count !== '-' && setArr([...modArr(arr), value.replace(/X/, '*')])
            setCount('')
        }


        if (!count) {
            setArr([...modArr(arr), value])
        }

        //---------------------------------------------------------------------------------------

        if (count.length === 0 && /[X/+]$/.test(value)) {
            setArr([...formattedArray(arr), value.replace(/X/, '*')])
            setCount('')
        }
        if (value === '=' && !(arr.includes(value))) {
            setArr([...arr, formattedCount(count), value])
            setCount('')
        }
        if (value === '=' && /[*-/+]/.test(arr[arr.length - 1]) && !count) {
            setArr([...formattedArray(arr), value])
        }
        if (arr.includes('=') && /[X/+-]/.test(value)) {
            setArr([...formattedCount(count), value.replace(/X/, '*')])
        }
        if (arr.includes('=') && /^[-0-9]/.test(value)) {
            setArr([])
            setCount(value)
        }
        if (arr.includes('=') && value === '.') {
            setArr([])
            setCount('0' + value)
        }
        if (value === 'AC') {
            setCount('0')
            setArr([])
        }
    }

    useEffect(() => {
        if (arr[arr.length - 1] === '=') {
            setCount(countExpression(formattedArray(arr)))
            setArr([...arr, countExpression(formattedArray(arr))])
        }
        count.length > 17 && limitter();

    }, [arr, count])

    return (
        <ActionContext.Provider value={{
            button,
            count,
            addCount: addCount,
            arr
        }}>
            {children}
        </ActionContext.Provider>
    )
}










