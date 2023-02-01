import React, { useState } from "react";
import { uniqueId } from "./utils/uniqueId";
import { Columns } from "./components/Columns";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./utils/trpc";

export const App = () => {
  const queryClient = useQueryClient();
  const cols = useQuery(["get-cols"], () => api.column.getColumn.query());
  const mutation = useMutation(["add-column"], api.column.addColumn.mutate, {
    onSuccess() {
      queryClient.invalidateQueries(['get-cols'])
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    color: "",
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
      columnId: uniqueId("col-"),
      color: inputs.color,
      name: inputs.title,
    });
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex gap-4 h-screen">
      {cols.data!.columns.map((item, index) => (
        <Columns {...item} />
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
        <form>
          <input
            name="title"
            placeholder="Inserir titulo"
            value={inputs.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setColsData(event)
            }
            className="border"
          />
          <input
            name="colour"
            placeholder="Inserir Cor"
            value={inputs.color}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setColsData(event)
            }
            className="border"
          />
          <button onClick={saveColData}>Save</button>
        </form>
      )}
    </div>
  );
};
