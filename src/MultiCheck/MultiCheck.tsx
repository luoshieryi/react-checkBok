import './MultiCheck.css';
import Title from './component/Title';
import Form from "./component/Form";

import React, {FC} from 'react';

export type Option = {
    label: string,
    value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            Assume no duplicated values.
 * @param {number} columns - default value is 1, and assume it can only be [1, 2, ... 9]
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 */
type Props = {
    label?: string,
    options: Option[],
    columns?: number,
    values?: string[]
    onChange?: (options: Option[]) => void,
}

export const MultiCheck: FC<Props> = (props): JSX.Element => {

    return (
        <div className='MultiCheck'>
            <Title label={props.label}/>
            <Form options={props.options} columns={props.columns} values={props.values} onChange={props.onChange} />
        </div>
    )
}

