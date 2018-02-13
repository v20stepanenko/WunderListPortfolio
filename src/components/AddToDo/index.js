import React, { Component } from 'react'
import Styles from './style.scss';
export default class componentName extends Component {

    constructor(){
        super()
        this.inputAdd;
    }

    state = { 
     focusInput: false,
     importantTask: false
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

    blurInput = () => {
        this.setState({focusInput: false})
    }

    getStarClassName = () => {
        const { focusInput, importantTask } = this.state;
        const show = focusInput? Styles.showStar: Styles.hideStar;
        const important = importantTask? Styles.importantTask: '';
        return `${show} ${important}`;
    }

    toggleMarkTask = () => {
        const { importantTask } = this.state;
        this.setState({importantTask: !importantTask});
    }

    render() {
        return (
            <form className = { Styles.addTask } onClick = {this.toFocusInput} onSubmit = {this.addTask} >
                <button type = 'button'>+</button>
                <input placeholder = 'Добавить сегодняшнюю задачу в папку "Входящие"...' ref = {(node) => this.inputAdd = node} onFocus = {this.focusInput} onBlur = {this.blurInput} />
                <span className = { this.getStarClassName() } onClick = { this.toggleMarkTask } >ЗВЕЗДОЧКА</span>
            </form>
        )
    }
}
