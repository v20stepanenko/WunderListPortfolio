import React, { Component } from 'react'

export default class Calendar extends Component {

    state = { 
        year: 0,
        month: 0
    }

    getCalendarDaysByMonth = ({ month, year }) => {

        const monthMarkUp = [];
        const td = [];
        const numbersDays = new Date(year, month+1, 0).getDate();
        const weekDayStart = new Date(year, month, 1).getDay();
        let weekMarkUp = []
        let countWeekDays = 0;
        for(let i = 0; i < weekDayStart; i++){        
            weekMarkUp.push(<td key = {'empty'+ i}/>);
            countWeekDays++;
        }

        for(let i = 1; i <= numbersDays; i++ ){
         if(countWeekDays === 7){
             monthMarkUp.push(<tr key = {'week'+i}>{weekMarkUp}</tr>);
             weekMarkUp = [];
             countWeekDays = 0;
         }
         weekMarkUp.push(<td key = {i}>{i}</td>)
         countWeekDays += 1;
        }
        monthMarkUp.push(<tr key = {'lastWeek'} >{weekMarkUp}</tr>)
        return monthMarkUp;
    }

    render() {
        return (
            <div>
                <div>month year</div>
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
                        {this.getCalendarDaysByMonth({month: 2, year: 2017})}
                    </tbody>
                </table>
            </div>
        )
    }
}
