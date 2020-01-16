데이터의 소스는 한군데다. 메인 컴포넌트가 데이터 다 가지고있음.

타이틀, 영화 포스터 정보를 메인에 다 집어넣고, 그걸 각각 컴포넌트에 props를 이용해 정보를 출력하게함.

데이터 플로우 : 메인 컴포넌트가 전체정보 다 가지고있음 -> 각 칠드런 컴포넌트에게 정보를 전달함

그럼 한개의 데이터 소스를 가지고 각 컴포넌트별로 출력만 하면됨.
***

### 아래 코드는 효율적이지않음. 
몇개의 영화를 갖고있는지 모르는경우도있고, api에서 긁어온 엄청난 양의 영화정보를 불러오고 싶을때도 있을거임.
```
const movieTitle = [
  "1번영화",
  "2번영화",
  "3번영화",
  "4번영화"
]

const movieImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg"
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie title={movieTitle[0]} poster={movieImages[0]}/>
        <Movie title={movieTitle[1]} poster={movieImages[1]}/>
        <Movie title={movieTitle[2]} poster={movieImages[2]}/>
        <Movie title={movieTitle[3]} poster={movieImages[3]}/>
      </div>
    );
  }
```
***
### map을 활용해 배열 속 객체를 재구성하면 효율적이다.
```
const movies = [
  {
    title:"1번영화",
    poster:"1.jpg"
  },
  {
    title:"2번영화",
    poster:"2.jpg"
  },
  {
    title:"3번영화",
    poster:"3.jpg"
  },
  {
    title:"4번영화",
    poster:"4.jpg"
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map(movie => {
          return <Movie title={movie.title} poster={movie.poster} />
        })}
      </div>
    );
  }
```

***
React v15.5부터 React.PropTypes 는 별도 패키지로 옮겨졌다. 대신 prop-types 라이브러리를 사용하면된다.
```
import PropTypes from 'prop-types';

class Movie extends Component{
        static propTypes = {
        title: PropTypes.string,
        poster: PropTypes.string
    }
```

***
lifecycle api 공부하기. 개념
https://ndb796.tistory.com/227

***
loading states : 내가 필요한 데이터가 항상 바로 즉시 존재하지는않는다.

데이터없이 컴포넌트가 로딩을 하고, 데이터를 위해 api를 불러서 api가 데이터를 주면 내 컴포넌트 state를 업데이트 할것이다.
                
api 콜을 타임아웃 기능으로 유사 구현해보자.
                
```
  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index} />
    })
    return movies;
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading.."}
      </div>
    );
  }
}
```
***
컴포넌트는 smart 컴포넌트와 dump 컴포넌트가 있다.

smart한 컴포넌트 : state가 있음
```
class Movie extends Component{
      static propTypes = {
      title: PropTypes.string,
      poster: PropTypes.string
    }
    
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <MoviePoster poster={this.props.poster} />
            </div>
        );
    }
}

class MoviePoster extends Component{
    render(){
        return(
            <img src ={poster} alt="MoviePoster" width="100" height="100" />
        );
    }
}
```

***

dump한 컴포넌트 : state가 없음. 이 컴포넌트를 쓰면 render function, will mount, did mount 등 다 필요없음 html을 return 하기만하면됨.

하지만 state를 잃게돼서 업데이트 하고 그런거 다 못함. 무비 포스터같은 컴포넌트에는 사용해도 괜춘함
```
function Movie({title,poster}){
    return(
        <div>
                <h1>{title}</h1>
                <MoviePoster poster={poster} />
        </div>
    )
}

function MoviePoster({poster}){
    return(
        <img src ={poster} alt="MoviePoster" width="100" height="100" />
    )
}

```
***
```
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  UNSAFE_componentWillMount() {
    fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e55a7610dadf4359d3729ab503c7205f')
      .then(res => res.json())
      .then(data => this.setState({
        posts: data.movieListResult.movieList[0].movieNm

      })
      );
      
  }


  render() {
    const { posts } = this.state;
    const postsList = posts.map((post) => (
      <div>
        <h4>{post.movieListResult.movieList[0].movieCd}</h4>
      { /* <h4>{post.movieListResult.movieList[0].movieNm}</h4>
        <h4>{post.movieListResult.movieList[0].movieNmEn}</h4>*/}
      </div>
    ));
    return (
      <div>
        {postsList}
      </div>
    );
  }
}

export default App;
```
***
jsonplaceholder 사이트를 이용해 간단한 api를 가지고 테스트해봤다.
```
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
      ]
    }
  }
  
  UNSAFE_componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      /*fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e55a7610dadf4359d3729ab503c7205f')*/
      .then(res => res.json())
      .then(data => this.setState(
        {
          posts: data
        }
      ));
  }

  render() {
    const { posts } = this.state;
    const postsList = posts.map((post) => (
      <div key={post.id} id={post.id}>
        <h4>{post.title}</h4>
        <h4>{post.body}</h4>
      </div>
    ));
    return (
      <div className="App"> // className="App" 이란 Jsx문법이있어야 App.css에 적용이됨
        {postsList}
      </div>
    );
  }
}

export default App;
```
***
아래는 노마드코더 리액트기초 웹서비스만들기 #16까지 한 내용이다. 

fetch를 call api로 변경했다. 그 다음, getMovies 라는 funtion을 썼다. getMoives는 비동기함수고, 그 안에 datas라는 이름의 
const 변수를생성했다. 그리고 call api 작업이 완료되고 return 하기를 await했다. call api는 fetch promise를
return 할 것이고, 이는 모든 데이터의 json이다. 그 안에 datas가 있는 `movieListResult.movieList`라는 이름의 
오브젝트와 함께.. 그래서 `movieListResult.movieList`라는 value는, const datas의 결과값이 되는거다. 
그리고 컴포넌트의 state를 movies로 set했다.    (`movies : movies`를 `movies`로 모던 자바스크립트로 작성했음)
그리고 렌더에서 state안에 datas가 있으면, render movies라는 function을 불러온다. 

```
  _getMovies = async () => {
    const datas = await this._callApi()
    this.setState({
      datas
    })
  }
```

```
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: [],
      poster: []
    }
  }

  UNSAFE_componentWillMount() {
    this._getMovies();
  }

  _renderDatas = () => {
    const datas = this.state.movies.map((data, index) => {
      return <Movie title={data.title} poster={data.poster} key={index} />
    })
    return datas;
  }

  _getMovies = async () => {
    const datas = await this._callApi()
    this.setState({
      datas
    })
  }

  _callApi = () => {
    return fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e55a7610dadf4359d3729ab503c7205f')
      .then(res => res.json())
      .then(json => json.movieListResult.movieList/*this.setState({
        movies : [
        {
          title: json.movieListResult.movieList[1].movieNm,
          poster: json.movieListResult.movieList[1].movieCd
        }
      ]

    })*/
    )
    .then(err => console.log(err));
  }

  render() {
    return (
      <h1>{this.state.movies ? this._renderDatas() : "loading.."}</h1>
    );
  }
}

export default App;
```
현재 여기서 `json.movieListResult.movieList[]` 배열 안에 map함수로 api를 다 불러오고싶은데 어떻게 해결할지 방법을 찾지못하고있다. 
