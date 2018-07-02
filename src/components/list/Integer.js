import React from 'react'
export default function Integer ({ className, number }) {
	const style = {fontFamily: "Courier"}
  return (
    <span className={className} style={style}>
      {Math.round(number)}
    </span>
  )
}
