import React, { Component } from 'react'
import Styles from './style.scss';
import Calendar from '../Calendar';
export default class componentName extends Component {

    constructor(){
        super()
        this.inputAdd;
    }

    state = { 
     focusInput: false,
     importantTask: false,
     showCalendar: false,
     openAssign: false
    }

    toFocusInput = () => {
        this.inputAdd.focus();
    }

    addTask = (e) => {
        e.preventDefault();
    }

    focusInput = () => {
        this.setState({focusInput: true})
    }

    blurForm = () => {
        console.log('blurInput')
        this.setState({focusInput: false})
    }

    getStarClassName = () => {
        const { importantTask } = this.state;
        const important = importantTask? Styles.importantTask: '';
        return important;
    }

    getToggleClass = () => {
        const { focusInput } = this.state;
        return focusInput? Styles.show: Styles.hide;        
    }

    toggleMarkTask = () => {
        const { importantTask } = this.state;
        this.setState({importantTask: !importantTask});
    }

    openAssign = () => {
        this.setState({openAssign: true});
    }

    classNameAssignDate = () => {
        const {openAssign} = this.state;
        if(openAssign){
            return Styles.show;
        }
        return Styles.hide;
    }

    blurCalendar = () => {
        console.log('Blur')
        this.setState({openAssign: false});
    }

    focusCalendar = () => {
        console.log('focus calendar');
    }

    render() {
        return (
            <form className = { Styles.addTask } onBlur = {this.blurForm} onSubmit = {this.addTask} >
                <button type = 'button' onClick = {this.toFocusInput}>+</button>
                <input placeholder = 'Добавить сегодняшнюю задачу в папку "Входящие"...' ref = {(node) => this.inputAdd = node} onClick = {this.toFocusInput} onFocus = {this.focusInput}  />
                <div className = {`${Styles.metaTask} ${this.getToggleClass()}`} >
                  <span className = { this.getStarClassName() } onClick = { this.toggleMarkTask } >ЗВЕЗДОЧКА</span>
                  <div className = {Styles.calendar} onClick = { this.openAssign} onFocus = {this.focusCalendar} onBlur = {this.blurCalendar}>Calendar
                    <div className = {this.classNameAssignDate()}  ><Calendar /></div></div> 
                </div>
            </form>
        )
    }
}
