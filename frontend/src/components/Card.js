import React from "react";

const Card = ({ children, title }) => {
    

    return (
      <div className="row" style={{padding:10}}>
        <div className="column mx-auto">
          <div className="card" style={{padding:10}}>
            <h3 style={{textAlign: 'center'}}>{ title }</h3><br/>
            <div className="container">
              { children }
            </div>
          </div>
        </div>
      </div>
    );
};
export default Card; 