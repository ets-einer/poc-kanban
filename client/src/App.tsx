import React, { useState } from "react";
import { Column } from "./components/Column";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./utils/trpc";

export const App = () => {
  const queryClient = useQueryClient();
  const cols = useQuery(["get-cols"], () => api.column.getColumn.query());
  const [isVisible, setIsVisible] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    color: "#ffffff",
  });
  const mutation = useMutation(["add-column"], api.column.addColumn.mutate, {
    onSuccess() {
      queryClient.invalidateQueries(['get-cols']);
    },
  });

  if (cols.isLoading) return <div>loading..</div>;
  if (cols.error) return <div>Error</div>;

  const setColsData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const saveColData = () => {
    event?.preventDefault();
    mutation.mutate({
      color: inputs.color,
      title: inputs.title,
    });
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex gap-4 h-screen bg-black">
      {cols.data!.columns.map((item: any, index: number) => (
        <Column key={index} id={item.id} color={item.color} title={item.title} />
      ))}
      {!isVisible ? (
        <div className="bg-[#E0E2E5] h-fit p-4 rounded-lg w-60">
          <button
            className="bg-[#A4ABB3] text-white p-2 rounded w-full"
            onClick={() => setIsVisible(!isVisible)}
          >
            + Nova Lista
          </button>
        </div>
      ) : (
        <form onSubmit={saveColData}>
          <input
            name="title"
            placeholder="Inserir titulo"
            value={inputs.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setColsData(event)
            }
            className="border"
            required />
          <input
            name="color"
            placeholder="Inserir Cor"
            value={inputs.color}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setColsData(event)
            }
            className="border" />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};