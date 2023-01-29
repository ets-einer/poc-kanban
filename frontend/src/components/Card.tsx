// import { trpc } from "../../utils/trpc";
import { FormEvent, useState } from "react";

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
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    )
}