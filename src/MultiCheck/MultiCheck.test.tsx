import React from 'react';
import {render, screen} from '@testing-library/react';

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
  const defaultColumns: number = 5;
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
      render(
          <MultiCheck options={defaultOptions} columns={defaultColumns} />
      );
      expect(screen.getAllByTestId('list')).toHaveLength(defaultColumns)
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
      checkBox.click();
      expect(checkBox).toBeChecked()
    });

    it('should the defaultOnChange() response if values and onChange provided', function () {
      render(
          <MultiCheck options={defaultOptions} values={defaultValues} onChange={defaultOnChange}/>
      );
      screen.getByLabelText('ggg').click();
      screen.getByLabelText('iii').click();
      screen.getByRole('button').click();
      expect(selectedValues).toEqual([ '333', '555', '777', '999' ]);
    });

    it('should checkbox are all checked if click selectAll checkbox', function () {
      render(
          <MultiCheck options={defaultOptions}/>
      );
      screen.getByLabelText('selectAll').click();
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
      selectAll.click();
      screen.getByLabelText('aaa').click();
      expect(selectAll).not.toBeChecked();
    });

    it('should selectAll is auto checked if all checkbox are checker', function () {
      render(
          <MultiCheck options={defaultOptions}/>
      );
      defaultOptions.map(check);
      function check(option: Option) {
        screen.getByLabelText(option.label).click();
      }
      expect(screen.getByLabelText('selectAll')).toBeChecked();
    });

  });

});
