import { useState } from "react"

interface CardsProps {
    id: string
    title: string
    description: string
}

export const Cards = ({ id, title, description }: CardsProps) => {
    const [cardValues, setCardValues] = useState({
        cardTitle: "",
        cardDescription: "",
    })

    function changeColValues(event: React.ChangeEvent<HTMLInputElement>) {
        setCardValues({
            ...cardValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div id={id} className="bg-white p-2 rounded-lg">
            <div>
                <input className="border-b-2 border-black" name={"cardTitle"} value={cardValues.cardTitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeColValues(event)} />
            </div>
            <div>
                <input className="border-b-2 border-black" name={"cardDescription"} value={cardValues.cardDescription} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeColValues(event)} />
            </div>
        </div>
    )
}