import React, {ChangeEvent, FC} from 'react';

import  '../MultiCheck.css';
import {Option} from "../MultiCheck";
import Item from "./Item";
import {CheckBox} from "./Form";

type Props = {
    options: Option[],
    checkBoxes?: CheckBox[],
    checkedOnChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const List: FC<Props> = (props): JSX.Element => {

    const items = () => {
        return (
            props.options.map((option, index) => (
                <Item option={option}
                      key={option.value}
                      // onClick={props.inputOnClick}
                      checked={props.checkBoxes && props.checkBoxes[index].checked}
                      onChange={props.checkedOnChange}/>
            ))
        )
    }

    return (
        <div className='list' data-testid='list'>
            {items()}
        </div>
    );
}

export default List
