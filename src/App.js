import React, { Component } from 'react';
import moment from "moment";
import logo from './logo.svg';
import './App.css';

import Modal from './Components/Modal';
import ToDoList from './Components/ToDoList';
import Week from './Components/Week';
import Month from './Components/Month';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import {bindActionCreator} from 'redux';

import * as action from "./action.js";

class App extends Component {
 
  render() {
    return (
      <div className="App">
        {this.props.time.modal && <Modal />}

        
        <div className="app_head">{ moment(this.props.time.curentDate).format('MMMM, YYYY') }</div>
        <div className="btn_wrap">
        <button onClick={ () => this.props.onTudaClick()}> Next month </button>

        <button onClick={() => this.props.onSudaClick()}> Prev month </button>
        
        <button onClick={() => this.props.onResetClick()}> Current month </button>
        
        <button onClick={() => this.props.onModal()}> Add note </button>
        </div>
        <div className="wrap_m">
          <Month arr={this.props.time.curentMounth()} 
               nowDate={this.props.time.nowDate} 
               curentDate={this.props.time.curentDate}
               onClick={(date) => this.props.onCheckDate(date)}
               />

          <ToDoList curentDate={ this.props.time.curentDate.getDate()+"."+this.props.time.curentDate.getMonth()+"."+
                                 this.props.time.curentDate.getFullYear() } />

        </div>

      </div>
    );
  }
}
//
export default connect(
  (store) => {return {
    index: store.counter.index,
    text: store.text.text,
    time: store.time
  }},
  (dispatch) => {return {
    onTudaClick: ()     => { dispatch(action.NEXT_MONTH()); },
    onSudaClick: ()     => { dispatch(action.PREV_MONTH()); },
    onResetClick: ()    => { dispatch(action.RESET()); },
    onCheckDate: (date) => { dispatch(action.CHECK_CURR_DAY(date)); },
    onModal: ()         => { dispatch(action.togleModal()); }
  }}
  
)(App);
