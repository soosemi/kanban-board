import React, { useState } from 'react';
import { X } from 'react-feather';
import styled from 'styled-components';
import './Editable.css';

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || '');

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText('');
      props.onSubmit(inputText);
      console.log(inputText);
    }
    setIsEditable(false);
  };

  return (
    <EditableWrapper>
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ''}`}
          onSubmit={submission}
        >
          {isContent ? (
            <input
              type="textarea"
              value={inputText}
              placeholder={props.placeholder || props.text}
              onChange={(event) => setInputText(event.target.value)}
              autoFocus
              // disabled={`${props.disabled ? 'true' : 'false'}`}
            />
          ) : (
            <input
              type="text"
              value={inputText}
              placeholder={props.placeholder || props.text}
              onChange={(event) => setInputText(event.target.value)}
              autoFocus
              // disabled={`${props.disabled ? 'true' : 'false'}`}
            />
          )}

          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || 'Add'}</button>

            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props.displayClass ? props.displayClass : ''}`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </EditableWrapper>
  );
}

export default Editable;

const EditableWrapper = styled.div`
  width: 100%;
`;
