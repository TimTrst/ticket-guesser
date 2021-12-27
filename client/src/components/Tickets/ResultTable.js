import React, { useEffect, useState } from 'react'
import { Table } from "react-bootstrap"
import { useTickets } from '../../contexts/TicketProvider'

export default function ResultTable({ index }) {

    const { tickets } = useTickets()
    const [averageTimeGuessed, setAverageTimeGuessed] = useState(0)

    useEffect(() => {
        setAverageTimeGuessed(calculateAverage())
    }, [tickets])

    function calculateAverage(){
        var avg = 0
        let length = tickets[index].employee.length

        tickets[index].employee.map((employee) => { avg = avg + +employee.guess })

        avg = avg / length

        return avg
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Guess</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {tickets.length > 0 && averageTimeGuessed > 0 &&
                tickets[index].employee.map(function(empList, i){
                    return (
                    <tr key = {i}>
                        <td>{i+1}</td>
                        <td>{empList.name}</td>
                        <td>{empList.guess}</td>
                    </tr>)
                })} 
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{averageTimeGuessed > 0 && averageTimeGuessed.toString()}</td>
        	    </tr>
            </tbody>
        </Table>
    )
}
