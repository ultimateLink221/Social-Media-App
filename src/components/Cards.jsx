import React, { useEffect, useState } from 'react';
import Card from './Card';
import Pagination from './utils/Pagination';

function Cards({ isUser }) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://social-media-app-001.herokuapp.com/api/socialMediaPosts');
      const data = await response.json()
      setData(data);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await fetch(`https://social-media-app-001.herokuapp.com/api/socialMediaPosts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleDelete = (id) => {
    deleteData(id);
    setTimeout(() => {
      fetchData();
    }, 10)
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div>
      {currentCards.map((item, index) => {
        return <Card key={index} {...item} onDelete={handleDelete} isUser={isUser} />
      })}
      <Pagination cardsPerPage={cardsPerPage} totalCards={data.length} paginate={handlePagination} />
    </div>
  );
}

export default Cards;