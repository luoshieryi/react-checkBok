import React, {FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";

type Props = {
    option: Option,
    checked?: boolean,
    onChange?: (value: string) => void,
}

const Item: FC<Props> = (props): JSX.Element => {

    return (
        <div className='item'>
            <label>
                <input type='checkbox'
                       value={props.option.value}
                       name={props.option.label}
                       checked={props.checked}
                       onChange={() => {props.onChange && props.onChange(props.option.value)}}/>
                {props.option.label}
                <br/>
            </label>
        </div>
    )
}

export default Item

