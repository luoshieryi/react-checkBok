import React, {FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";

type Props = {
    option: string,
}

const Item: FC<Props> = (props): JSX.Element => {

    return (
        <div className='item'>

        </div>
    )
}

export default Item
