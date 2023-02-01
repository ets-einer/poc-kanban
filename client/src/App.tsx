import { useId, useState } from "react"
import { Columns } from "./components/columns"

export const App = () => {
  const [cols, setCols] = useState([{ id: Math.random().toString(16).slice(-4), title: 'Backlog' }])

  function createNewCol() {
    setCols([
      ...cols,
      {
        id: 'col-' + Math.random().toString(16).slice(-4),
        title: ''
      }
    ])
  }

  return (
    <div className="flex gap-4">
      {cols.map((item, index) => (
        < Columns key={index} id={item.id} title={item.title} />
      ))}
      <button onClick={createNewCol}>Nova Coluna +</button>
    </div>
  )
}