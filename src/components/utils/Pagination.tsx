import React from 'react';

interface PaginationProps {
  cardsPerPage: number;
  totalCards: number;
  paginate: any;
}

function Pagination({ cardsPerPage, totalCards, paginate }: PaginationProps) {
  const pageNumbers: number[] = [];

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