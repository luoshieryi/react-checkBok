import React, {FC, FormEvent, useEffect, useState} from 'react';

import  '../MultiCheck.css';
import {Option} from '../MultiCheck';
import List from "./List";

export type CheckBox = {
    option: Option,
    checked: boolean,
}

type Props = {
    options: Option[],
    columns?: number,
    values?: string[]
    onChange?: (options: Option[]) => void,
}

const Form: FC<Props> = (props): JSX.Element => {

    const [checkBoxes, setCheckBoxes] = useState<CheckBox[]>();

    useEffect(() => {
        if (props.values) {
            const newBoxes: CheckBox[] = props.options.map((option) => {
                    if (props.values && props.values.indexOf(option.value) > -1) {
                        return {
                            option: option,
                            checked: true,
                        };
                    } else {
                        return {
                            option: option,
                            checked: false
                        };
                    }
            });
            setCheckBoxes(newBoxes);
        }
    }, [])

    const submitHandle = (e: FormEvent) => {
        if (props.onChange && checkBoxes) {
            let options: Option[] = [];
            checkBoxes.map((box) => {
                if (box.checked) {
                    options.push(box.option);
                }
            })
            props.onChange(options);
        }
        e.preventDefault();
    }

    let onChange: ((value: string) => void) | undefined = undefined

    if (props.values) {
        onChange = (value: string) => {
            let newBoxes = checkBoxes?.map((box) => {
                if (box.option.value === value) {
                    box.checked = !box.checked;
                }
                return box;
            })
            setCheckBoxes(newBoxes);
        }
    }

    const lists = () => {
        const columns = props.columns? props.columns : 1;
        const length = props.options.length;
        const raws = Math.floor(length / columns);
        const overflow = length % columns;
        let rawNum: number[] = [];
        for (let i = 0; i < columns; i++) {
            rawNum[i] = raws * i;
        }
        rawNum[columns] = length;
        for (let i = 1; i <= overflow; i++) {
            rawNum[i]++;
        }
        let res: JSX.Element[] = [];
        for (let i = 0; i < columns; i++) {
            res.push(<List key={Math.random()}
                           options={props.options.slice(rawNum[i], rawNum[i+1])}
                           checkBoxes={checkBoxes?.slice(rawNum[i], rawNum[i+1])}
                           onChange={onChange}/>);
        }
        return res
    }

    return (
        <div>
            <form key={'checkboxForm'} className='form' onSubmit={submitHandle}  action=''>
                {lists()}
                <input type='submit' value='提交'/>
            </form>
        </div>
    )
}

Form.defaultProps = {
    columns: 1
}

export default Form
