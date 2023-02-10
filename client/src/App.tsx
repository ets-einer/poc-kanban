import React, { useState } from "react";
import { Column } from "./components/Column";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./utils/trpc";
import { HexColorPicker } from "react-colorful";

export const App = () => {
  const queryClient = useQueryClient();
  const cols = useQuery(["get-cols"], () => api.column.getColumn.query());
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff");
  const mutation = useMutation(["add-column"], api.column.addColumn.mutate, {
    onSuccess() {
      queryClient.invalidateQueries(['get-cols']);
    },
  });

  if (cols.isLoading) return <div>loading..</div>;
  if (cols.error) return <div>Error</div>;

  const saveColData = () => {
    event?.preventDefault();
    mutation.mutate({
      color: color,
      title: title,
    });
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex items-center h-screen overflow-y-hidden bg-black">
      <div className="flex w-fit p-5 gap-5 overflow-x-scroll">
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
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
              className="border"
              required />
            <HexColorPicker color={color} onChange={setColor} />;
            <p className="text-white">{color}</p>
            <button type="submit" className="text-white">Create</button>
          </form>
        )}
      </div>
    </div>
  );
};