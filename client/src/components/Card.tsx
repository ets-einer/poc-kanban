import { useState } from "react"

interface CardProps {
    id: string
    title: string
    description: string
}

export const Card = ({ id, title, description }: CardProps) => {
    return (
        <div id={id} className="bg-white p-2 rounded-lg">
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>
    )
}