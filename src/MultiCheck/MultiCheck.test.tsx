import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import {MultiCheck, Option} from "./MultiCheck";

describe('MultiCheck', () => {

  const defaultLabel: string = 'aLabel';
  const defaultOptions: Option[] = [
    {label: 'aaa', value: '111',},
    {label: 'bbb', value: '222',},
    {label: 'ccc', value: '333',},
    {label: 'ddd', value: '444',},
    {label: 'eee', value: '555',},
    {label: 'fff', value: '666',},
    {label: 'ggg', value: '777',},
    {label: 'hhh', value: '888',},
    {label: 'iii', value: '999',},
  ];
  const defaultValues: string[] = [
    '333',
    '555'
  ];
  let selectedValues: string[];

  function defaultOnChange(options: Option[]): void {
    selectedValues = (options.map(it => it.value));
  }

  describe('initialize', () => {

    it('should render the label if label provided', function () {
      render(
          <MultiCheck options={[{label: 'aaa', value: '111',}]} label={defaultLabel}/>,
      );
      expect(screen.getByText(defaultLabel)).toBeInTheDocument();
    });

    it('should render the checkbox to columns if columns provided', function () {
      for (let i = 1; i < defaultOptions.length; i++) {
        render(
            <MultiCheck options={defaultOptions} columns={i} />
        );
        let lists = screen.getAllByTestId('list');
        expect(lists).toHaveLength(i);
        for (let j = 0; j < defaultOptions.length % i; j++) {
          // eslint-disable-next-line testing-library/no-node-access
          expect(lists[j].getElementsByClassName('item')).toHaveLength(Math.ceil(defaultOptions.length/i))
        }
        for (let j = defaultOptions.length % i; j < i; j++) {
          // eslint-disable-next-line testing-library/no-node-access
          expect(lists[j].getElementsByClassName('item')).toHaveLength(Math.floor(defaultOptions.length/i))
        }
        cleanup();
      }
    });

    it('should render the default checked values if values provided', function () {
      render(
          <MultiCheck options={defaultOptions} values={defaultValues} />
      );
      expect(screen.getByLabelText('bbb')).not.toBeChecked()
      expect(screen.getByLabelText('ccc')).toBeChecked()
    });

  });

  describe( 'function',() => {
    it('should be checked if click the input', function () {
      render(
          <MultiCheck options={defaultOptions} values={defaultValues} onChange={defaultOnChange}/>
      );
      const checkBox = screen.getByLabelText('ggg');
      expect(checkBox).not.toBeChecked();
      fireEvent.click(checkBox);
      expect(screen.getByLabelText('ggg')).toBeChecked();
    });

    it('should the defaultOnChange() response if values and onChange provided', function () {
      render(
          <MultiCheck options={defaultOptions} values={defaultValues} onChange={defaultOnChange}/>
      );
      fireEvent.click(screen.getByLabelText('ggg'));
      fireEvent.click(screen.getByLabelText('iii'));
      fireEvent.click(screen.getByRole('button'));
      expect(selectedValues).toEqual([ '333', '555', '777', '999' ]);
    });

    it('should checkbox are all checked if click selectAll checkbox', function () {
      render(
          <MultiCheck options={defaultOptions}/>
      );
      fireEvent.click(screen.getByLabelText('selectAll'));
      defaultOptions.map(isCheck);
      function isCheck(option: Option) {
        expect(screen.getByLabelText(option.label)).toBeChecked();
      }
    });

    it('should selectAll is not checked if uncheck a checkbox', function () {
      render(
          <MultiCheck options={defaultOptions}/>
      );
      const selectAll = screen.getByLabelText('selectAll');
      fireEvent.click(selectAll);
      fireEvent.click(screen.getByLabelText('aaa'));
      expect(selectAll).not.toBeChecked();
    });

    it('should selectAll is auto checked if all checkbox are checker', function () {
      render(
          <MultiCheck options={defaultOptions}/>
      );
      defaultOptions.map(check);
      function check(option: Option) {
        fireEvent.click(screen.getByLabelText(option.label));
      }
      expect(screen.getByLabelText('selectAll')).toBeChecked();
    });

  });

});
