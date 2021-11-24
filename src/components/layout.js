import React from "react"

export default function CenterLayout({ children }) {
  return (
    <div style={{ margin: `0 auto`, padding: `0 1rem`, alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  )
}