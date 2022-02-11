import React, {FC} from 'react';

//@ts-ignore
import  '../MultiCheck.css';

type Props = {
    label?: string
}

const Item: FC<Props> = (props): JSX.Element => {
    return (
        <div className='label'>
            {props.label}
        </div>
    )
}

export default Item
