import * as React from 'react';
import { BsPlusCircle as PlusIcon } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { Transaction } from '../../types';

import './styles.scss';

type FormProps = {
    onSubmit: ({ type, description, value }: Transaction) => void;
  };

function Form({ onSubmit }: FormProps) {
    const descriptionRef = React.useRef<HTMLInputElement | null>(null);
    const [type, setType] = React.useState('income');
    const [description, setDescription] = React.useState('');
    const [value, setValue] = React.useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!descriptionRef.current) return;
  
      // Submit the form
      onSubmit({
        id: nanoid(),
        type,
        description,
        value: Number(value),
      } as Transaction);
  
      // Reset form values and set focus on description
      setDescription('');
      setValue('');
      descriptionRef.current.focus();
    };
  
    const isButtonDisabled = description === '' || value === '';
  
    return (
      <form data-testid="form" className="add-form" onSubmit={handleSubmit}>
        <select
          aria-label="select type"
          className="form-control type"
          value={type}
          onChange={(e) => setType(e.currentTarget.value)}
        >
          <option aria-label="income" value="income">
            ➕
          </option>
          <option aria-label="expense" value="expense">
            ➖
          </option>
        </select>
        <input
          type="text"
          className="form-control description"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          ref={descriptionRef}
          required
        />
        <input
          type="number"
          className="form-control value"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          required
        />
  
        <button
          aria-label="submit"
          type="submit"
          className="btn submit-btn"
          disabled={isButtonDisabled}
        >
          <PlusIcon />
        </button>
      </form>
    );
  }
  
  export { Form };
  