import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer_wrapper">
          <div className="footer_author">
            <p className="footer_author_text">Гончаров Роман</p>
          </div>
          <div className="footer_contacts">
            <a href="mailto:romg92@mail.ru" className="link link_mail">
              <img src="images/mail.png" width="35" height="35" alt="Написать на почту" />
            </a>
            <a href="https://github.com/goncharov-roman" className="link link_github">
              <img src="images/github.png" width="35" height="35" alt="Аккаунт Github" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
