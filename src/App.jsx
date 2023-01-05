import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Editable from './Components/Editabled/Editable';
import Board from './Components/Board/Board';
import './App.css';

function App() {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('prac-kanban')) || []);

  const [targetCard, setTargetCard] = useState({
    bid: '',
    cid: '',
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];

    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = board.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...board];
    tempBoards[index].cards.push({
      id: Math.floor(Date.now() + Math.random() * 2),
      title,
      assign: '',
      labels: [],
      date: '',
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = board.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...board];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex((item) => item.id === cid);
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex((item) => item.id === targetCard.cid);
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: '',
      cid: '',
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem('prac-kanban', JSON.stringify(board));
  }, [board]);

  return (
    <Wrapper>
      <NavBar>
        <h1>Issue tracker</h1>
      </NavBar>
      <Container>
        <BoardList>
          {board.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </BoardList>
      </Container>
    </Wrapper>
  );
}

export default App;

let board = [
  {
    id: 1,
    title: 'Todos',
    cards: [],
  },
  {
    id: 2,
    title: 'in Progress',
    cards: [],
  },
  {
    id: 3,
    title: 'Done',
    cards: [],
  },
];

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.div`
  padding: 30px;
  box-shadow: 0 1px 20px rgba(56, 40, 40, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  padding-top: 20px;
`;

const BoardList = styled.div`
  height: 100%;
  width: fit-content;
  padding: 10px 30px;
  display: flex;
  gap: 30px;
`;
