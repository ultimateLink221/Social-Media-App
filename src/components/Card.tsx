import React from 'react';

interface CardProps {
  key: number
  user: string;
  content: string;
  image: string;
  onDelete: any;
  _id: string;
  isUser: string;
}

function Card({ user, content, image, onDelete, _id, isUser }: CardProps) {

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