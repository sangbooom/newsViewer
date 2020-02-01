기초부터 잘하고 프로젝트하자

```javascript
import React from "react";
import ReactDOM from "react-dom";

function User(props) {
  return (
    <div>
      <img src={props.user.image} />
      &nbsp;<strong>{props.user.name}</strong>
    </div>
  );
}

function Board(props) {
  return (
    <div>
      <User user={props.user} />
      {board.title}
      <hr />
      {board.content}
    </div>
  );
}

const board = {
  title: "제목",
  content: "내용",
  user: {
    name: "박상범",
    image: "https://placeimg.com/32/32/any"
  }
}

ReactDOM.render(
  <Board
    title={board.title}
    content={board.content}
    user={board.user}
  />, document.getElementById('root')
);

```

![image](https://user-images.githubusercontent.com/43921054/73589450-e2cff580-4519-11ea-9f07-09698150c159.png)

***
