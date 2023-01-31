// import { trpc } from "../../utils/trpc";
import { FormEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'

export const Card = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [label, setLabel] = useState({});

    // const response = trpc.kanban.getOne.useQuery();
    // const { mutate } = trpc.kanban.create.useMutation({
    //     onSuccess: (response) => alert(JSON.stringify(response)),
    // });

    return (
        <div className="max-w-sm p-6 bg-white border rounded-lg shadow">
            <label htmlFor="title">Name:</label>
            <input type="text" id="title" name="title" className="w-96 h-10 border border-black rounded-sm" />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
            </textarea>
            <ReactMarkdown children={description} className="markdown" />
        </div>
    )
}