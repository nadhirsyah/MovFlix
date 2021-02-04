import React from 'react'
import { Pagination } from 'react-bootstrap'

function Paginate(props) {
  let items = []
  for (let number = 1; number <= props.page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === props.active}>
        {number}
      </Pagination.Item>
    )
  }
  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {items}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  )
}
export default Paginate
