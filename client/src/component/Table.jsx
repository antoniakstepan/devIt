import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
  return (
    <div className='items-container'>
      {currentItems &&
        currentItems.map((item) => (
          <div className='items' key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export function Table({ itemsPerPage, data, isAdmin }) {
  const [isDelete, setIsDelete] = useState(false)

  const [items, setItems] = useState(data)
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    setItems(data)
  }, [isDelete, setIsDelete])
  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        // breakLabel="..."
        // nextLabel="next >"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </>
  );
}

