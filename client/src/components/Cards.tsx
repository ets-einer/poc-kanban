interface CardsProps {
    id: string
    title: string
    description: string
}

export const Cards = ({ id, title, description }: CardsProps) => {
    return (
        <div id={id} className="bg-white p-2 rounded-lg">
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}