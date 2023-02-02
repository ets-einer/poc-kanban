import React, { useState } from "react"
import { Cards } from "./Cards"
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'

interface ColumnProps {
    id: string
    title: string
    color: string
}

export const Columns = ({ id, title, color }: ColumnProps) => {
    const [cards, setCards] = useState([{ name: "", description: "" }])

    function createNewCard() {
        setCards([
            ...cards,
            {
                name: "",
                description: ""
            }
        ])
    }

    return (
        <div className="bg-[#E0E2E5] p-2 w-fit h-fit rounded-lg flex flex-col gap-5" id={id} >
            <div className="flex gap-2">
                <h1>{title}</h1>
                <div className={`bg-[${color}] w-4`}>cor</div>
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