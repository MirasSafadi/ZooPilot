import React from "react";

const Modal = ({ handleClose, show, children, title }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    

    return (
        <div className={showHideClassName} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" >{title}</h4>
                <span onClick={handleClose} className="close" aria-label="close">&times;</span>
              </div> {/* modal head */}
              <div className="modal-body">
                {children}
                <button onClick={handleClose} type="button" className="btn btn-secondary btn-sm" style={{float:'right'}}>Cancel</button>
              </div> {/* modal body */}
            </div> {/* modal content */}
          </div> {/* modal dialog */}
        </div>//modal
    );
};
export default Modal; 