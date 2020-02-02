가장 기본적인 버튼 토글 예제
```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css"

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: true
    }
  }
  handleClick = () => {
    this.setState(state => ({
      isToggle: !state.isToggle
    })
    )
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        {this.state.isToggle ? "On" : "Off"}
      </button>
    );
  }

}
ReactDOM.render(<Event />, document.getElementById("root"))
```
![image](https://user-images.githubusercontent.com/43921054/73604831-4b7ea700-45da-11ea-81da-71811d6e7390.png)

***
e.target 참고 https://recoveryman.tistory.com/82
### [e.target.name] : e.target.value 이부분 이해가안감.. 공부하기
placeholder를 이용한 입력한 state를 가지고 데이터 전송하기
![image](https://user-images.githubusercontent.com/43921054/73606807-70cadf80-45f1-11ea-9696-fcba2bc33e78.png)

App.js , Posts.js, PostsForm.js 중

`./components/PostsForm.js`
```javascript
import React, { Component } from 'react';

class PostsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    }
    /* 전송방식은 post */
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  render() {
    const { title, body } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div>
        <h4>new Post</h4>
        <form onSubmit={onSubmit}>
          <div>
            <label>title:</label>
            <input type="text" name="title" value={title} onChange={onChange} />
          </div>
          <div>
            <label>body:</label>
            <input type="text" name="body" value={body} onChange={onChange} />
          </div>
          <div>
            <button type="submit">전송</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostsForm;
```

### 이벤트 핸들러는 아직 익숙치가않다. 공부를 더해야겠다




