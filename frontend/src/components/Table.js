import React from "react";

const Table = ({ theadItems, title, contentArray, button }) => {
    
    return (
        <div className="row">
            <div className="col-lg-7 mx-auto">
                <div className="card border-0 shadow">
                    <div className="card-body p-5">
                        {button}
                        {/* Responsive table */}
                        <h3 style={{color:'black', marginBottom:15, float:'left'}}>{title}</h3>
                        <div className="table-responsive">
                            <table className="table m-0">   
                                <thead>
                                    {theadItems}
                                </thead>
                                <tbody>
                                    {contentArray}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Table; 