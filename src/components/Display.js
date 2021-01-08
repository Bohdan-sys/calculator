import React, { useContext } from 'react'
import { ActionContext } from "../contexts/ActionProvider";

const Display = () => {
    const { count, arr } = useContext(ActionContext);



    return (
        <div className='screen' id='display'>
            <div className='screen__formula'>
                <h3 className='caption caption--size_5 caption--color_white caption--font_digital caption--color_orange caption--align_end'>
                    {arr}
                </h3>
            </div>
            <div className='screen__output'>
                <h1 className='caption caption--size_4 caption--color_white caption--font_digital caption--align_end'>
                    {count}
                </h1>
            </div>
        </div>
    )
}

export default Display

