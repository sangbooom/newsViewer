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
`[e.target.name] : e.target.value` 이 부분은 다중 입력을 제어할때 선택하도록 해줄수 있도록 대괄호로 묶었다. 


***
### target에 대해서..

![asd](https://user-images.githubusercontent.com/43921054/73627445-1765bd80-4690-11ea-83f7-6150bf6ebcb9.png)

```html
<!DOCTYPE html>
<html>
<body onclick="myfunction(event)">

    <p>Click on a paragraph. An alert box will alert the element that triggered the event.</p>
    <p><strong>Note:</strong> The target property returns the element that triggered the event, and not necessarily the
        eventlistener's element.</p>
    <script>
        myfunction = (event) => {
            alert(event.target.nodeName)
        }
    </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
<strong id="myP">Click the button to get the node name of this element.</strong>
<button onclick="myFunction()">Try it</button>
<p id="demo"></p>
<script>
function myFunction() {
  var x = document.getElementById("myP").nodeName;
  document.getElementById("demo").innerHTML = x;
}
</script>

</body>
</html>
```



