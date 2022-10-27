import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { CreateModal } from "./CreateModal";
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal'

const AdminItems = (({ currentItems, isDelete, setIsDelete, isEdit, setIsEdit }) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const showDeleteModal = () => {
    setIsDelete(true)
  }
  const hideDeleteModal = () => {
    setIsDelete(false)
  }

  const showEditModal = (item) => {
    setIsEdit(true)
    setSelectedItem(item)
  }

  const hideEditModal = () => {
    setIsEdit(false)
    setSelectedItem(null)
  }
  return (
    <div className='items-container'>
      {currentItems &&
        currentItems.map((item) => (
          <div className='items' key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="delete-btns">
              <div className="edit-btn" onClick={() => showEditModal(item)}>Edit</div>
              <div className="delete-btn" onClick={showDeleteModal}>Delete</div>
            </div>
            <DeleteModal 
              isShowing={isDelete} 
              hide={hideDeleteModal} 
              _id={item._id}
            />
            <EditModal 
              isShowing={isEdit} 
              hide={hideEditModal} 
              item={selectedItem}
            />
          </div>
        ))}
    </div>
  );
})
export const Admin = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const itemsPerPage = 5;
  const [data, setData] = useState(null);

  const showCreateModal = () => {
    setIsCreate(true)
  }
  const hideCreateModal = () => {
    setIsCreate(false)
  }
  const [isDelete, setIsDelete] = useState(false)

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = data?.length && (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const serchItems = useCallback(async() => {
    const responce = await fetch(`/api/items?`)
    const data = await responce.json()
    setData(data)
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data && data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data && data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);


  useEffect(() => {
    serchItems()
  }, [isDelete, setIsDelete, isEdit, setIsEdit]);
  
  if (!data) return null;

  return (
    <div className="App">
      <div className="header-admin">
        <div className="admin">
          <div 
            onClick={showCreateModal}
            className="create-btn"
          >
            Create Item
          </div>
        </div>
        <Link to={'/'} className="header-btn">Go back</Link>
      </div>
      <AdminItems 
        currentItems={currentItems} 
        isDelete={isDelete} 
        setIsDelete={setIsDelete} 
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
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
      <CreateModal isShowing={isCreate} hide={hideCreateModal} />
    </div>
  )
}