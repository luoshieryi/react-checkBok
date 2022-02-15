import React, {FC, ChangeEvent} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";

type Props = {
    option: Option,
    checked?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
}

const Item: FC<Props> = (props): JSX.Element => {

    return (
        <div className='item'>
            <label>
                <input type='checkbox'
                       className='checkbox'
                       value={props.option.value}
                       name={props.option.label}
                       checked={props.checked}
                       onChange={props.onChange}
                       // onClick={props.onClick}
                />
                {props.option.label}
                <br/>
            </label>
        </div>
    )
}

export default Item

