import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import MyMap from './MyMap';
import List from './List';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="main">
          <div className="wrapper">
            <Form />
            <List />
          </div>
          <MyMap />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
