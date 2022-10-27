import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const CreateModal = ({ isShowing, hide }) => {
  const [error , setError] = useState(false);

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const createItem = () => {
    if (!title && !description) {
      setError(true)
      return
    }
    fetch("/api/items/",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({title: title, description: description})
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
              <div className='modal-create'>
                <input 
                  type="text" 
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => titleHandler(e)}
                />
                <input 
                  type="text" 
                  placeholder="Enter Descriptio"
                  value={description}
                  onChange={(e) => descriptionHandler(e)}

                />
                <div 
                  className="admin-btn"
                  onClick={createItem}
                >
                  Create Item
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      )}
    </>
  )
};
