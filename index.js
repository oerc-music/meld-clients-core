import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

window.$ = $;

import App from './components/app';

ReactDOM.render(<App />, document.querySelector('.container'));
