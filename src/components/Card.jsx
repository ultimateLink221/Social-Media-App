import React from 'react';

function Card({ user, content, image, onDelete, _id, isUser }) {

  return (
    <div className='card-holder'>
      <div className='card'>
        <div>
          <img src={image ? image : 'img/download.png'} alt='profile-picture' />
        </div>
        <div className='card__body'>
          <div className='card__body-head'>
            <h1 className='card__title'>{user}</h1>
            <span onClick={() => onDelete(_id)} className='icon'>
              {isUser && <i className="fa-solid fa-xmark"></i>}
            </span>
          </div>
          <p className='card__text'>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;