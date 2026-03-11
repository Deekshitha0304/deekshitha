"use client"

import { useState } from "react"

export default function Counter() {

  const [count, setCount] = useState(0)

  return (
   <div style={{
        marginTop: "30px",
        padding: "15px",
        borderTop: "1px solid #eee"
    }}>

      <h3>Counter: {count}</h3>

    <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "10px" ,borderRadius: "60px"}}
    >
            Increment
    </button>

      <button onClick={() => setCount(count - 1)}
            style={{ marginRight: "10px" ,borderRadius: "60px"}}

        >
        Decrement.
      </button>

    </div>
  )
}