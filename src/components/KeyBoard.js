
import React, { useContext } from 'react';
import { ActionContext } from "../contexts/ActionProvider";


const KeyBoard = () => {
    const { button, addCount } = useContext(ActionContext)

    return (

        <div className='keyBoard'>
            {button.map((item, i) =>
                <button className='key' id={item.action} key={i}
                    onClick={() => {
                        addCount(item.name)
                    }}>
                    <span className='caption caption--size_5 caption--color_white'>
                        {item.name}
                    </span>
                </button>
            )}
        </div >
    )
}
export default KeyBoard