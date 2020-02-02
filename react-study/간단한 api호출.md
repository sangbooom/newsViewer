api 연습사이트 : https://jsonplaceholder.typicode.com/

```javascript
import React, {Component} from "react";
import ReactDOM from "react-dom";

class APIexample extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : " "
    }
  }

  componentDidMount = () => {
    this.callAPI()
  }

  callAPI = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(asd => this.setState({
      data : asd.title
    })
    );
  }

  render(){
    return(
      <h1>{this.state.data ? this.state.data : "loading..."}</h1>
    );
  }
}
ReactDOM.render(<APIexample /> ,document.getElementById("root"))
```
![image](https://user-images.githubusercontent.com/43921054/73604117-dbb6ef00-45ce-11ea-82f9-aaa52a101adf.png)

***
<img width="500" alt="123" src="https://user-images.githubusercontent.com/43921054/73604369-20dd2000-45d3-11ea-9f4e-32d6467a9657.png">

이 API에서 title과 body 부분만 다 가져오도록 코드를 짜보자.

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css"

class APIexample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount = () => {
    this.callAPI()
  }

  callAPI = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({
        posts: data
      })
      );
  }

  render() {
    const { posts } = this.state;
    const postslist = posts.map(post => {
      return (
        <div key={post.id} id={post.id}>
          <h3>{post.title}</h3>
          <h3>{post.body}</h3>
        </div>
      );
    })
    return (
      <div>
        {postslist}
      </div>
    );
  }
}
ReactDOM.render(<APIexample />, document.getElementById("root"))
```
![image](https://user-images.githubusercontent.com/43921054/73604357-d8256700-45d2-11ea-9ef1-fe0af843dfd2.png)

