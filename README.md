## git hooks 

funtion 컴포넌트에서 state를 쓸수 있도록 해줌. 코드도 간결해짐.  

codesandbox는 유용한 ide 사이트임, 프레임워크부터 서버까지 선택만하고 옆에 테스트도 하고 브라우저까지 띄울수 있음. 자주 애용하자.

```javascript
import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0
  };
  modify = n => {
    this.setState({
      count: n
    });
  };
  render() {
    const { count } = this.state;
    return (
      <>
        <div>{count}</div>
        <button onClick={() => this.modify(count + 1)}>Increment</button>
        <button onClick={() => this.modify(count - 1)}>Decrement</button>
      </>
    );
  }
}

export default App;

```
간단한 count를 세는 앱이다. 이걸 함수형 프로그래밍으로 바꾸고싶다. 클래스 벗어나서 함수에 머물수 있는 방법은? this 를 안하는 방법은? react hooks를 이용하면 된다.

```javascript
import React, { Component, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};
export default App;
```
useState가 array를 리턴하는데 변수 이름은 상관없다. 약간 코딩컨벤션느낌으로 맞춰주는게 좋다.
```javascript
import React, { Component, useState } from "react";

const App = () => {
  const [a, b] = useState(0);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => b(a + 1)}>Increment</button>
      <button onClick={() => b(a - 1)}>Decrement</button>
    </>
  );
};
export default App;
```
***
git hooks - useState useEffect 빼고 아직 어려움 
