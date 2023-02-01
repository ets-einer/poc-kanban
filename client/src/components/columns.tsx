import { useId, useState } from "react"
import { Cards } from "./Cards"

interface ColumnsProps {
    id: string
    title: string
}

export const Columns = ({ id, title }: ColumnsProps) => {
    const [cards, setCards] = useState({})

    return (
        <div className="bg-[#E0E2E5] p-2 w-fit rounded-lg">
            <div className="flex gap-2">
                <input id={id} name="col1" placeholder="Insira o titulo" value={title} autoFocus />
                <button>COR</button>
            </div>
            <Cards />
        </div>
    )
}