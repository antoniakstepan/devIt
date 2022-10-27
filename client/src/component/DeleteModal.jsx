import React from 'react';
import ReactDOM from 'react-dom';

export const DeleteModal = ({ isShowing, hide, _id }) => {
  const deleteItem = async (_id) => {
    await fetch(`/api/items/delete`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({_id: _id})
    })

  }
  return (
    <>
      {isShowing && ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"/>
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header">
                <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className='modal-delete-btns'>
                <div
                  className='modal-delete-btn'
                  onClick={() => deleteItem(_id)}
                >
                  Delete
                </div>
                <div 
                  className='modal-delete-cencel'
                  onClick={hide}
                >
                  Cencel
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      )}
    </>
  )
};
