
import React from 'react';

const Seat = ({ id, status, onClick }) => {
  let seatClass = 'seat';
  if (status === 'selected') seatClass += ' selected';
  else if (status === 'booked') seatClass += ' booked';
  

  return (
    <div className={seatClass} onClick={() => onClick(id)}>
      {id}
    </div>
  );
};

export default Seat;