import React, {FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";

type Props = {
    option: Option,
}

const Item: FC<Props> = (props): JSX.Element => {

    return (
        <div className='item'>
            123
        </div>
    )
}

export default Item
