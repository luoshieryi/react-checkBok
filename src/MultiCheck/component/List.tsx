import React, {FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";
import Item from "./Item";
import {CheckBox} from "./Form";

type Props = {
    options: Option[],
    checkBoxes?: CheckBox[],
    onChange?: (value: string) => void,
}

const List: FC<Props> = (props): JSX.Element => {

    const items = () => {
        return (
            props.options.map((option, index) => (
                <Item option={option}
                      key={option.value}
                      checked={props.checkBoxes && props.checkBoxes[index].checked}
                      onChange={props.onChange}/>
            ))
        )
    }

    return (
        <div className='list'>
            {items()}
        </div>
    );
}

export default List
