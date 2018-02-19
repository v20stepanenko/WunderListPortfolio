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
         input: false,
         star: false
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
        const {calendar, input, star} = this.state.focusForm;
        return calendar || input || star;
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

    focusStar = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, star: true}});
    }


    blurStar = () => {
        const {focusForm} = this.state;
        this.setState({focusForm: {...focusForm, star: false}});
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
                <input placeholder = 'Добавить сегодняшнюю задачу в папку "Входящие"...' 
                    ref = {(node) => this.inputAdd = node} 
                    onBlur = {this.blurInput} 
                    onClick = {this.toFocusInput} 
                    onFocus = {this.focusInput}  /> 
                    {/*input END*/}
                <div className = {`${Styles.metaTask} ${this.getToggleClass()}`} >
                    <span tabIndex='99' className = { this.getStarClassName() } onClick = {this.toggleMarkTask}  onFocus = {this.focusStar} onBlur = {this.blurStar} >ЗВЕЗДОЧКА</span>
                    <div className = {Styles.calendar} tabIndex='100' onFocus = { this.focusCalendar } onBlur = {this.blurCalendar}>Calendar
                        <button>Дата выполнения</button>
                        <button>Напомнить</button>
                        <div className = {this.classNameAssignDate()} ref = {(node) => {this.calendar = node}} ><Calendar infoAssign = { this.getInfoAssign } /></div>
                    </div>               
                </div>
            </form>
        )
    }
}
