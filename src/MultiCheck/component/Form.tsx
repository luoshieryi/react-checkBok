import React, {ChangeEvent, FC, FormEvent, MouseEvent, useEffect, useRef, useState} from 'react';

import '../MultiCheck.css';
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


    const formElement = useRef<HTMLFormElement>(null)
    const selectAllElement = useRef<HTMLInputElement>(null)

    const checkAll = (event: MouseEvent<HTMLInputElement>) => {
        if (formElement.current) {
            let inputs = formElement.current.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].checked = event.currentTarget.checked;
            }
            if (props.values) {
                const newBoxes = checkBoxes;
                newBoxes?.forEach((box) => {
                    box.checked = event.currentTarget.checked;
                });

                setCheckBoxes(newBoxes);
            }
        }
    }

    const inputOnClick = (event: MouseEvent<HTMLInputElement>) => {
        if (formElement.current && selectAllElement.current) {
            if (!event.currentTarget.checked) {

                selectAllElement.current.checked = false;
            } else {

                const inputs = formElement.current.getElementsByTagName('input');
                let checked = true;

                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].className !== 'selectAll' && !inputs[i].checked) {

                        checked = false;
                    }
                }
                selectAllElement.current.checked = checked;
            }
        }
    }

    let submitHandle: ((e: FormEvent) => void) | undefined = undefined
    if (props.onChange) {
        submitHandle = (e: FormEvent) => {
            if (props.onChange && checkBoxes) {
                let options: Option[] = [];
                checkBoxes.forEach((box) => {
                    if (box.checked) {
                        options.push(box.option);
                    }
                })
                props.onChange(options);
            }
            e.preventDefault();
        }
    }

    let inputOnChange: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined = undefined
    if (props.values) {
        inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            let newBoxes = checkBoxes?.map((box) => {
                if (box.option.value === event.currentTarget.value) {
                    box.checked = !box.checked;
                }
                return box;
            })
            setCheckBoxes(newBoxes);
        }
    }

    const lists = () => {
        const columns = props.columns ? props.columns : 1;
        const length = props.options.length;
        const raws = Math.floor(length / columns);
        const overflow = length % columns;
        let rawNum: number[] = [];
        for (let i = 0; i < columns; i++) {
            rawNum[i] = raws * i;
        }
        rawNum[columns] = length;
        for (let i = 1; i <= overflow; i++) {
            rawNum[i] += i;
        }
        let res: JSX.Element[] = [];
        for (let i = 0; i < columns; i++) {
            res.push(<List key={Math.random()}
                           options={props.options.slice(rawNum[i], rawNum[i + 1])}
                           inputOnClick={inputOnClick}
                           checkBoxes={checkBoxes?.slice(rawNum[i], rawNum[i + 1])}
                           onChange={inputOnChange}/>);
        }
        return res
    }

    return (
        <div>
            <form key='checkboxForm' className='form' onSubmit={submitHandle} ref={formElement}>
                {lists()}
                <div className='list'>
                    <label>
                        <input type='checkbox' className='selectAll' ref={selectAllElement} onClick={checkAll}/>
                        selectAll
                    </label>
                    <button type='submit'>submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form
