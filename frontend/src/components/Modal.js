import React from "react";
import ReactModal from 'react-modal';

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
                <button onClick={handleClose} type="button" className="btn btn-secondary btn-md" style={{float:'left'}}>Cancel</button>
              </div> {/* modal body */}
            </div> {/* modal content */}
          </div> {/* modal dialog */}
        </div>//modal
        

        // <ReactModal clas className="Modal" isOpen={show} onRequestClose={handleClose} shouldCloseOnOverlayClick={true} overlayClassName="Overlay"> 
        //     <div className="modal" tabIndex="-1" role="dialog">
        //        <div className="modal-dialog modal-dialog-scrollable">
        //          <div className="modal-content">
        //            <div className="modal-header">
        //              <h4 className="modal-title" >{title}</h4>
        //              <span onClick={handleClose} className="close" aria-label="close">&times;</span>
        //            </div> {/* modal head */}
        //            <div className="modal-body">
        //              {children}
        //              <button onClick={handleClose} type="button" className="btn btn-secondary btn-md" style={{float:'left'}}>Cancel</button>
        //            </div> {/* modal body */}
        //          </div> {/* modal content */}
        //        </div> {/* modal dialog */}
        //     </div> {/* modal */}
        // </ReactModal>
    );
};
export default Modal; 