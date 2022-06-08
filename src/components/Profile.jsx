import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pictures from '../tempBackEnd/pictureData';
import useUser from './hooks/useUser';

function Profile(props) {
  const navigate = useNavigate();
  
  const [pictures] = useState(Pictures);
  const [index, setIndex] = useState(0);
  const [userImage, setUserImage] = useState({
    profileImage: '',
  });
  const [userId, setUserId] = useState('');
  const [initialRender, setInitialRender] = useState(true);

  const { username } = useUser();

  async function updateProfileImage(image) {
    try {
      await fetch(`https://social-media-app-001.herokuapp.com/api/users/${userId}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(image)
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/users');

    const data = await response.json()

    const filteredData = data.filter(item => item.username === username);

    setTimeout(() => {
      console.log(filteredData);
      console.log(filteredData[0]._id);
      setUserId(filteredData[0]._id);
    }, 20);
    
    return filteredData[0]._id;
  }  

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const lastIndex = pictures.length -1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, pictures]);

  useEffect(() => {
    if (initialRender){
      setInitialRender(false);
    }
    else {
      setTimeout(() => {
        console.log(userId);
        updateProfileImage(userImage);
      }, 40);
    }

  }, [userImage]);

  const handleConfirmImage = () => {
    setUserImage({profileImage: pictures[index].image});
    setTimeout(() => {
      navigate('/');
    }, 60);
  }

  return (
    <div>
      <div>
      <div className='image-holder'>
        <h3 className='image-title'>Select Profile Pic?</h3>
        <button onClick={() => setIndex(index - 1)} className='image-card-btn'><i className="fa-solid fa-angle-left"></i></button>
        <button onClick={() => setIndex(index + 1)} className='image-card-btn'><i className="fa-solid fa-angle-right"></i></button>
        {pictures.map((pic, picIndex) => {
          const { image } = pic;

          let position = 'image-card image-slide nextSlide'

          if (picIndex === index) {
            position = 'image-card image-slide activeSlide'
          }
          if (picIndex === index -1 || index === 0 && picIndex === pictures.length -1) {
            position = 'image-card image-slide lastSlide'
          }

          return (
          <article key={picIndex}>
            <div className={position}>
              <div>
                <img src={image} alt='profile-picture' />
              </div>
            </div>
          </article>
        )
        })}
        <button onClick={handleConfirmImage} className='image-btn'>Confirm</button>
        <div className='space'></div>
      </div>
    </div>
    </div>
  );
}

export default Profile;