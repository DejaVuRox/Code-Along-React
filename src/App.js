import React, { Component } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Components/Layout/Header';
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import about from "./Components/pages/about";
// import uuid from 'uuid';

import "./App.css";
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid.v4(),
      //   title: "take out the trash",
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: "meeting with wife",
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: "meeting with boss",
      //   completed: false
      // }
    ]
  };

  componentDidMount(){
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({ todos: res.data }))
  }

  //Toggle Complete
  markComplete = id => {
    this.setState({
      todo: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Delete Todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
  };

  //add todo
  AddTodo = title => {
    axios.post("https://jsonplaceholder.typicode.com/todos",{
      // title: title,
      title,
      completed: false
    })
    .then(res => this.setState({
      todos: [...this.state.todos, res.data]
    }));
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // };
    
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo AddTodo={this.AddTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path='/about' component={about} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
