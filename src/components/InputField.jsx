import React from 'react';

export interface Field {
  text: string;
  addTodos: () => void;
  setText: string;
}

const InputField = ({ text, addTodos, setText }: Field) => {
  return (
    <label htmlFor='1'>
      <input id='1' value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodos} type='submit'>
        add todo
      </button>
    </label>
  );
};

export default InputField;
