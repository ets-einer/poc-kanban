import { useId, useState } from "react"
import { uniqueId } from "./utils/uniqueId"
import { Columns } from "./components/columns"

export const App = () => {
  const [cols, setCols] = useState([{ id: uniqueId("col-"), title: 'Backlog', colour: "#FAFAFA" }])

  function createNewCol() {
    setCols([
      ...cols,
      {
        id: uniqueId("col-"),
        title: "",
        colour: ""
      }
    ])
  }

  return (
    <div className="flex gap-4">
      {cols.map((item, index) => (
        < Columns key={index} id={item.id} title={item.title} colour={item.colour} />
      ))}
      <button onClick={createNewCol}>Nova Coluna +</button>
    </div>
  )
}