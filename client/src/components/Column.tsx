import React, { useState } from "react"
import { Card } from "./Card"
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'
import { api } from "../utils/trpc"
import MDEditor from "@uiw/react-md-editor";

interface ColumnProps {
    id: string
    title: string
    color: string
}

export const Column = ({ id, title, color }: ColumnProps) => {
    const queryClient = useQueryClient();
    const [isVisible, setIsVisible] = useState(true);
    const [value, setValue] = useState("**Hello world!!!**");
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    })
    const cards = useQuery(["get-cards"], () => api.card.getAllCards.query());
    const mutation = useMutation(["add-card"], api.card.createCard.mutate, {
        onSuccess() {
            queryClient.invalidateQueries(['get-cards']);
        },
    });

    const setInputsValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    if (cards.isLoading) return <div>loading...</div>;
    if (cards.error) return <div>Error</div>;

    return (
        <div id={id} className="bg-[#E0E2E5] p-2 w-fit h-fit rounded-lg flex flex-col gap-5" style={{ borderTop: `5px solid ${color}` }}>
            <h1>{title}</h1>
            {cards.data?.allCards.map((item: any, index: number) => {
                <Card id={item.id} description={item.description} title={item.title} />
            })}
            {
                !isVisible
                    ?
                    <form>
                        <input name="title" value={inputs.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputsValue(event)} />
                        <MDEditor
                            value={value}
                            onChange={(val) => {
                                setValue(val!);
                            }}
                        />
                        <button type="submit">Save</button>
                    </form>
                    :
                    <div className="flex flex-col gap-4">
                        <button className="bg-[#007BC0] p-2 text-white rounded" onClick={() => setIsVisible(!isVisible)}>+ Nova Tarefa</button>
                    </div>
            }
        </div >
    )
}