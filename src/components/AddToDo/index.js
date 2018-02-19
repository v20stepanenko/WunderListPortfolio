import React, { Component } from 'react'
import Styles from './style.scss';
import Calendar from '../Calendar';
import {DUE_DATE, REMINDER} from './helper'
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
     importantTask: false,
     action: DUE_DATE,
     dueDate: {},
     reminder: {}
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

    togleAssingBlock = () => {
        const {calendar} = this.state.focusForm;
        if(calendar){
            return Styles.show;
        }
        return Styles.hide;
    }

    getFooterAssign = () => {
        const { action } = this.state
        switch(action){
            case DUE_DATE: {
            return(
                <div>
                    <select>
                        <option>Не повторять</option>
                        <option>Повторять каждый день</option>
                        <option>Повторять каждую неделю</option>
                        <option>Повторять каждый месяц</option>
                        <option>Повторять каждый год</option>
                    </select>
                        <button> Удалить дату выполнения</button>
                </div>
            )
        }
            case REMINDER: {
                return(
                    <div>
                        <input type='number' placeholder='24' /> : <input type='number' placeholder='59' />
                        <button>Удалить напоминание</button>
                    </div>
                )
                
            }
            default: {
             console.error('Error in component AddToDo, getFooterAssign method, no case')       
            }
        }
    }

    viewDueDate = () => {
        this.setState({action: DUE_DATE})
    }

    viewReminder = () => {
        this.setState({action: REMINDER})        
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
                        <div className = {this.togleAssingBlock()} ref = {(node) => {this.calendar = node}} >
                            <button onClick = {this.viewDueDate}>Дата выполнения</button>
                            <button onClick = {this.viewReminder}>Напомнить</button>
                            <Calendar infoAssign = { this.getInfoAssign } />
                            {this.getFooterAssign()}
                        </div>
                    </div>               
                </div>
            </form>
        )
    }
}
