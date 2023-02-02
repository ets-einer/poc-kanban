import React, { useState } from "react"
import { Cards } from "./Cards"
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'

interface ColumnsProps {
    id: string
    name: string
    color: string
}

export const Columns = ({ id, name, color }: ColumnsProps) => {
    const [cards, setCards] = useState([{ name: "", description: "" }])
    const [colsValues, setColsValues] = useState({
        colTitle: '',
        colColour: ''
    })

    function createNewCard() {
        setCards([
            ...cards,
            {
                name: "",
                description: ""
            }
        ])
    }

    function changeColValues(event: React.ChangeEvent<HTMLInputElement>) {
        setColsValues({
            ...colsValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="bg-[#E0E2E5] p-2 w-fit h-fit rounded-lg flex flex-col gap-5" id={id} >
            <div className="flex gap-2">
                <input name="colTitle" placeholder="Insira o titulo" value={colsValues.colTitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeColValues(event)} className="bg-transparent" />
                <input className={`bg-[${color}] w-4`} />
            </div>
            <div className="flex flex-col gap-4">
                {cards.map((item, index) => (
                    <Cards id={"sim"} name={item.name} description={item.description} />
                ))}
                <button onClick={createNewCard} className="bg-[#007BC0] p-2 text-white rounded">+ Nova Tarefa</button>
            </div>
        </div>
    )
}