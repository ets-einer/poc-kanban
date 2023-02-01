import { useId, useState } from "react"
import { uniqueId } from "./utils/uniqueId"
import { Columns } from "./components/Columns"

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
    <div className="flex gap-4 h-screen">
      {cols.map((item, index) => (
        < Columns key={index} id={item.id} title={item.title} colour={item.colour} />
      ))}
      <div className="bg-[#E0E2E5] h-fit p-4 rounded-lg w-60"><button className="bg-[#A4ABB3] text-white p-2 rounded w-full" onClick={createNewCol}>+ Nova Lista</button></div>
    </div>
  )
}