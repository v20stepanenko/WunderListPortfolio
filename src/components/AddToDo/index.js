import React, { Component } from 'react'
import Styles from './style.scss';
import Calendar from '../Calendar';
export default class AddToDo extends Component {

    constructor(){
        super()
        this.inputAdd;
        this.calendar;
    }

    state = { 
     focusForm: {
         calendar: false,
         input: false
     },
     importantTask: false
    }

    toFocusInput = () => {
        this.inputAdd.focus();
    }

    addTask = (e) => {
        e.preventDefault();
    }

    isFocusForm = () => {
        const {calendar, input} = this.state.focusForm;
        return calendar || input;
    }

    focusInput = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, input: true}});
    }

    blurInput = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, input: false}});
    }

    focusCalendar = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, calendar: true}});
    }

    blurCalendar = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, calendar: false}});
        this.setState({openAssign: false});     
    }

    getStarClassName = () => {
        const { importantTask } = this.state;
        const important = importantTask? Styles.importantTask: '';
        return important;
    }

    getToggleClass = () =>  this.isFocusForm()? Styles.show: Styles.hide;        

    toggleMarkTask = () => {
        const { importantTask } = this.state;
        this.setState({importantTask: !importantTask});
    }

    classNameAssignDate = () => {
        const {calendar} = this.state.focusForm;
        if(calendar){
            return Styles.show;
        }
        return Styles.hide;
    }

    render() {
        return (
            <form className = { Styles.addTask } onSubmit = {this.addTask} >
                <button type = 'button' onClick = {this.toFocusInput}>+</button>
                <input placeholder = 'Добавить сегодняшнюю задачу в папку "Входящие"...' ref = {(node) => this.inputAdd = node} onBlur = {this.blurInput} onClick = {this.toFocusInput} onFocus = {this.focusInput}  />
                <div className = {`${Styles.metaTask} ${this.getToggleClass()}`} >
                    <span className = { this.getStarClassName() } onClick = {() => {this.toggleMarkTask(); this.toFocusInput()} } >ЗВЕЗДОЧКА</span>
                    <div className = {Styles.calendar} tabIndex='100' onFocus = { this.focusCalendar } onBlur = {this.blurCalendar}>Calendar
                        <div className = {this.classNameAssignDate()} ref = {(node) => {this.calendar = node}} ><Calendar /></div>
                    </div>               
                </div>
                    
                    
            </form>
        )
    }
}
