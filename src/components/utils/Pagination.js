import React from 'react';

function Pagination({ cardsPerPage, totalCards, paginate }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  } 

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li onClick={() => paginate(number)} key={number} className='page-item'>
            <span>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;