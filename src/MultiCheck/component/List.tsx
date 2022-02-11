import React, {FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";
import Item from "./Item";

type Props = {
    options: Option[]
}

const Title: FC<Props> = (props): JSX.Element => {

    const items = () => (
        props.options.map((option) => (
            <Item option={option} key={option.value}/>
        ))
    )

    return (
        <div className='list'>
            {items()}
        </div>
    )
}

export default Title
