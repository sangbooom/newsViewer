- state를 사용하기 위해서는 작성했던 함수형 컴포넌트 대신에 클래스형 컴포넌트를 사용해야된다.
- props만 이용하고자 한다면 함수형 컴포넌트를 그대로 사용하면된다. 다시 말해서 내부 객체의 값이 변경될 여지가 있다면 클래스형 컴포넌트로 state를 사용하고, 그렇지 않다면 props를 사용하면된다.

소괄호의 의미를 잘 파악하기!! https://heecheolman.tistory.com/23

***
```javascript
import React,{Component} from "react";
import ReactDOM from "react-dom";

class Clock extends Component {
  render() {
    return (
      <h3>현재 시각은 [{this.props.date.toLocaleTimeString()}] 입니다.</h3>
    );
  }
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()}/>, 
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
![image](https://user-images.githubusercontent.com/43921054/73591878-7bc13980-4537-11ea-9068-7fa1ed05688d.png)

props를 state로 대체했다. setState()를 사용하지 않아서 값이 변경되지 않는다.

```javascript
class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
        date : new Date()
    }
  }
  render() {
    return (
     <h3>현재 시각은 [{this.state.date.toLocaleTimeString()}] 입니다.</h3>
    );
  }
}

function tick() {
  ReactDOM.render(
    <Clock />, 
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

- setState 제대로 알기!! https://medium.com/wasd/setstate-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-28b207fc81df

다음은 setState를 사용해 값이 바뀌도록 했다.
```javascript
class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
        date : new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
        date : new Date()
    })
  }

  render() {
    return (
     <h3>현재 시각은 [{this.state.date.toLocaleTimeString()}] 입니다.</h3>
    );
  }
}
ReactDOM.render(
    <Clock />, 
    document.getElementById('root')
);
```

다음은 따라서 state를 사용하는 이유에 대해서 더욱 자세히 알아보기 위해 버튼 이벤트가 발생할 때마다 

특정한 객체의 값이 변경되는 사례를 확인해봤다.

현재 시각을 처음에 한 번 기록해 놓은 뒤에, 특정 버튼을 누를 때마다 시각이 10초씩 뒤로 밀려나도록 처리했다.

```javascript
import React,{Component} from "react";
import ReactDOM from "react-dom";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }
  
  goBack() {
    let nextDate = this.state.date;
    nextDate.setSeconds(nextDate.getSeconds() - 10);
    this.setState({
      date: nextDate
    });
  }
  
  componentDidMount() {
     this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillMoint(){
    clearInterval(this.timerID)
  }
  tick(){
    this.setState({
      date : new Date()
    })
  }

  render() {
    return (
      <div>
        <h3>현재 시각은 [{this.state.date.toLocaleTimeString()}] 입니다.</h3>
        <button onClick={this.goBack.bind(this)}>10초 뒤로가기</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />, 
  document.getElementById('root')
);
```
![image](https://user-images.githubusercontent.com/43921054/73592598-77991a00-453f-11ea-82c3-a3a55b71e7b9.png)


