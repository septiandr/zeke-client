"use client"
import { useState } from "react"

type Props = {
  value?: string
  onChange: (method: string) => void
}

const methods = ["QRIS", "Transfer Bank", "E-Wallet"]

export default function PaymentMethodSelector({ value, onChange }: Props) {
  const [selected, setSelected] = useState(value || methods[0])
  return (
    <div className="flex flex-wrap gap-2">
      {methods.map(m => (
        <button
          key={m}
          type="button"
          onClick={() => {
            setSelected(m)
            onChange(m)
          }}
          className={
            "rounded-lg border px-3 py-2 text-sm " +
            (selected === m
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
              : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")
          }
        >
          {m}
        </button>
      ))}
    </div>
  )
}
