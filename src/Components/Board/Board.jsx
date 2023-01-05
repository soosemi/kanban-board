import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';
import Editable from '../Editabled/Editable';
import './Board.css';

function Board(props) {
  return (
    <BoardWrapper>
      <BoardHeader>
        <BoardHeaderTitle>
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </BoardHeaderTitle>
      </BoardHeader>

      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </BoardWrapper>
  );
}

export default Board;

const BoardWrapper = styled.div`
  width: 290px;
  max-height: 100%;
  flex-basis: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  gap: 5px;
  align-items: center;

  span {
    color: rgb(145, 145, 145);
  }
`;
