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
        let avg = 0
        let length = tickets[index].employee.length

        tickets[index].employee.map((employee) => { avg += employee.guess })

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
                {tickets[index].employee.map(function(empList, i){
                    return (
                    <tr key = {i}>
                        <td>{i}</td>
                        <td>{empList.name}</td>
                        <td>{empList.guess}</td>
                        <td>{averageTimeGuessed}</td>
                    </tr>)
                })}
            </tbody>
        </Table>
    )
}
