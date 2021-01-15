import React, { useState, useEffect } from "react";
import { buttons } from './Buttons'
import { countExpression } from './formula'

export const ActionContext = React.createContext();

export const ActionContextProvider = ({ children }) => {
    const button = buttons

    const [answer, setAnswer] = useState()

    const [arr, setArr] = useState([])

    const [count, setCount] = useState('0')

    const [digit, setDigit] = useState()
    const [operator, setOperator] = useState()


    const limitter = () => {
        setCount('Digit Limit Met')
        setTimeout(() => setCount(answer), 1000)
    }

    const formattedCount = (value) => {
        return value.toString().replace(/\.$/gm, '')
    }

    const formattedArray = (arr) => {
        return arr.flat().slice(0, -1).filter(Boolean)
    }


    const addCount = (value) => {

        if (/^[-0-9.]/.test(value) && count.length <= 17 && !(/[a-zA-Z]/.test(count))) {
            setAnswer(count.substring(0, 18))

            if (!(value === '.' && count.includes('.'))) {
                setCount(count + value)
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
        }

        if (count.length !== 0 && /[X/+-]/.test(value)) {
            count !== '-' && setArr([...arr, formattedCount(count), value.replace(/X/, '*')])
            setCount('')
        }
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
            setArr([formattedCount(count), value.replace(/X/, '*')])

        }
        if (arr.includes('=') && /^[0-9]/.test(value)) {
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

    console.log(digit)

    useEffect(() => {
        if (arr[arr.length - 1] === '=') {
            setCount(countExpression(formattedArray(arr)))
            setArr([...arr, countExpression(formattedArray(arr))])
        }
        count.length > 17 && limitter();
        setDigit(count)
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
