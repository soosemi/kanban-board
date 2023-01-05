import React, { useEffect, useState } from 'react';
import { Calendar, List, Tag, Trash, Type, X, User, Hash } from 'react-feather';
import Modal from '../../Modal/Modal';
import Editable from '../../Editabled/Editable';
import styled from 'styled-components';

function CardInfo(props) {
  const colors = ['#a8193d', '#4fcc25', '#1ebffa'];

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };
  const updateAssign = (value) => {
    setValues({ ...values, assign: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor('');
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <CardInfoWrapper>
        <CardInfoBox>
          <Title>
            <Hash />
            {/* <input type="text" text={cards.id} disabled /> */}
            <Editable text={values.id} disabled={true} />
          </Title>
        </CardInfoBox>
        <CardInfoBox>
          <Title>
            <Type />
            <p>Title</p>
          </Title>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </CardInfoBox>

        <CardInfoBox>
          <Title>
            <User />
            <p>Assign</p>
          </Title>
          <Editable
            defaultValue={values.assign}
            text={values.assign}
            placeholder="Enter Assign"
            onSubmit={updateAssign}
          />
        </CardInfoBox>

        <CardInfoBox>
          <Title>
            <List />
            <p>Contents</p>
          </Title>
          <Editable
            defaultValue={values.desc}
            text={values.desc || 'Add a Description'}
            placeholder="Enter description"
            onSubmit={updateDesc}
            isContent={true}
          />
        </CardInfoBox>

        <CardInfoBox>
          <Title>
            <Calendar />
            <p>Valid Date</p>
          </Title>
          <input
            type="datetime-local"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </CardInfoBox>

        <CardInfoBox>
          <Title>
            <Tag />
            <p>Status</p>
          </Title>
          <Labels>
            {values.labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color, color: '#fff' }}>
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </Labels>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? 'li_active' : ''}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) => addLabel({ color: selectedColor, text: value })}
          />
        </CardInfoBox>
      </CardInfoWrapper>
    </Modal>
  );
}

export default CardInfo;

const CardInfoWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 550px;
  width: fit-content;
  max-width: 650px;
  height: fit-content;
`;

const CardInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ul {
    display: flex;
    gap: 15px;
    margin-left: 20px;
  }

  ul li {
    list-style: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
  ul .li_active {
    box-shadow: 0 0 0 3px yellow;
  }

  input[type='date'] {
    width: fit-content;
    border: 2px solid #ddd;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 1.2rem;
  }
  svg {
    height: 18px;
    width: 18px;
  }
`;

const Labels = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  label {
    border-radius: 40px;
    background-color: gray;
    color: #fff;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  label svg {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }
`;
