import React from 'react';

export const Cell=(props)=>{
  
    return(
      <div
       className="cell"
       style={{backgroundColor: props.cellClass}}>
         <img src={props.src} alt="" width='75%' height="75%" />
       </div>
    );
}

//<img src={props.cellClass === '#fff' ? '/or.png' : ''} alt="" width='35px' height="35px" />