import React, {FC} from 'react';

import  '../MultiCheck.css';

type Props = {
    label?: string
}

const Title: FC<Props> = (props): JSX.Element => {
    return (
        <div className='label' >
            {props.label}
        </div>
    )
}

export default Title
