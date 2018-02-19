import React, { Component } from 'react'

import Styles from './style.scss';
import {monthNumToText} from './helper';
import {everyDay, everyWeek, everyMonth, everyYear} from './helper';

export default class Calendar extends Component {

    componentWillMount = () => {
        const currentDay = new Date() ;
        const currentMonth = currentDay.getMonth();
        const currentYear = currentDay.getFullYear();
        this.setState({year: currentYear, month: currentMonth});
    }

    state = { 
        year: 0,
        month: 0,
        repeatTask: null,
        action: null
    }

    getCalendarDaysByMonth = ({ calendarMonth, calendarYear }) => {
        
        const monthMarkUp = [];
        const td = [];
        const currentDay = new Date() ;
        const numbersDays = new Date(calendarYear, calendarMonth+1, 0).getDate();
        const weekDayStart = new Date(calendarYear, calendarMonth, 1).getDay();
        let weekMarkUp = []
        let countWeekDays = 0;

        const {year, month } = this.state;
        const currentMonth = currentDay.getMonth();
        const currentYear = currentDay.getFullYear();
        const currentDate = currentDay.getDate();
        
        for(let i = 0; i < weekDayStart; i++){        
            weekMarkUp.push(<td key = {'empty'+ i}/>);
            countWeekDays++;
        }

        const getActiveDayStyle = (i) => {
            if(currentMonth === month && currentYear === year && currentDate === i){
                return Styles.active;
            }
            return null;
        }

        for(let i = 1; i <= numbersDays; i++ ){
         if(countWeekDays === 7){
             monthMarkUp.push(<tr key = {'week'+i}>{weekMarkUp}</tr>);
             weekMarkUp = [];
             countWeekDays = 0;
         }
         weekMarkUp.push(<td className = {getActiveDayStyle(i)} key = {i}>{i}</td>)
         countWeekDays += 1;
        }
        monthMarkUp.push(<tr key = {'lastWeek'} >{weekMarkUp}</tr>)
        return monthMarkUp;
    }

    nextMonth = () => {
        const {month, year} = this.state;
        let newMonth, newYear;
        if(month+1 === 12){
            newMonth = 0;
            newYear = year + 1;
        }else{
         newMonth = month + 1;
         newYear = year;   
        }
        this.setState({month: newMonth, year: newYear});
    }


    prevMonth = () => {
        const {month, year} = this.state;
        let newMonth, newYear;
        if(month-1 === -1){
            newMonth = 11;
            newYear = year - 1;
        }else{
         newMonth = month - 1;
         newYear = year;   
        }
        this.setState({month: newMonth, year: newYear});
    }

    render() {
        const {year, month} = this.state;
        return (
            <div>
                <div>
                    <input type='button' value='<' onClick = {this.prevMonth} /> 
                    {`${monthNumToText(month)} ${year}`} 
                    <input type='button' value='>' onClick = {this.nextMonth} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <td> ПН </td>
                            <td> ВТ </td>
                            <td> СР </td>
                            <td> ЧТ </td>
                            <td> ПТ </td>
                            <td> СБ </td>
                            <td> ВС </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getCalendarDaysByMonth({calendarMonth: month, calendarYear: year})}
                    </tbody>
                </table>
            </div>
        )
    }
}
