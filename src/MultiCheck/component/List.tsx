import React, {ChangeEvent, FC, MouseEvent} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";
import Item from "./Item";
import {CheckBox} from "./Form";

type Props = {
    options: Option[],
    inputOnClick: (event: MouseEvent<HTMLInputElement>) => void
    checkBoxes?: CheckBox[],
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
}

const List: FC<Props> = (props): JSX.Element => {

    const items = () => {
        return (
            props.options.map((option, index) => (
                <Item option={option}
                      key={option.value}
                      onClick={props.inputOnClick}
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
