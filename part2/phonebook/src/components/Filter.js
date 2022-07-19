import React from 'react'

const Filter = ({show, handleShowChange}) => {
  return (
    <form>
      <div>
        filter shown with
        <input value={show} onChange={handleShowChange}/>
      </div>
    </form>
  )
}

export default Filter
