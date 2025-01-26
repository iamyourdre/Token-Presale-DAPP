import React from 'react'

const Loading = ({size}) => {
  return (
    <span className={`loading loading-ring loading-${size || "xs"}`}></span>
  )
}

export default Loading