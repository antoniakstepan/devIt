import React, {useState} from 'react';
import ReactDOM from 'react-dom';

export const EditModal = ({ isShowing, hide, item }) => {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const editItem = async (_id) => {
    await fetch(`/api/items/edit`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id: _id, title})
    })

  }
  return (
    <>
      {isShowing && item && ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"/>
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header">
                <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
               <input 
                type="text" 
                placeholder={item.title} 
                value={title}
                onChange={(e) => titleHandler(e)}
              />
              <input 
                type="text" 
                placeholder={item.description} 
                value={description}
                onChange={(e) => descriptionHandler(e)}
              />
              <div 
                onClick={() => editItem(item._id)}
                className='modal-edit-btn'
              >
                Edit
              </div>
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      )}
    </>
  )
};
