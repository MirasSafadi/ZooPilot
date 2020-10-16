import React from "react";
import TableScrollbar from 'react-table-scrollbar';

const Table = ({ children, title, contentArray, button, refreshHandler, actionButton }) => {
    
    return (
        <div className="row">
            <div className="col-lg-7 mx-auto">
                <div className="card border-0 shadow">
                    <div className="card-body p-5">
                        <button disabled={!contentArray.length > 0} onClick={refreshHandler} type="button" className="btn btn-secondary" style={{float:'right', marginLeft:5}}>Refresh</button>
                        {button}
                        {actionButton}
                        {/* Responsive table */}
                        <h3 style={{color:'black', marginBottom:15, float:'left'}}>{title}</h3>
                        <div className="table-responsive">
                            <TableScrollbar rows={contentArray.length > 0? 15:1}>
                            <table className="table m-0">   
                                <thead>
                                    {children}
                                </thead>
                                <tbody>
                                    {contentArray}
                                </tbody>
                            </table>
                            </TableScrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Table; 