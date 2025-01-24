import React from 'react'

const Loading = ({size}) => {
  return (
    <span className={`loading loading-dots loading-${size || "xs"}`}></span>
  )
}

export default Loading