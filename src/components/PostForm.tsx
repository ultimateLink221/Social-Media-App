import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';


function PostForm() {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [postFullContent, setPostFullContent] = useState({
    user: '',
    content: '',
    image: ''
  });
  const [initialRender, setInitialRender] = useState(true);

  const { username, setUsername, userImage, setUserImage } = useUser();

  async function getContent() {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/socialMediaPosts');

    const data = await response.json()

    setData(data);
  }

  async function postContent() {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/socialMediaPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postFullContent) 
    });

    const data = await response.json()
  }

  async function getUser() {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/users');

    const data: any[] = await response.json()

    const filteredData = data.filter(item => item.username === username);

    setTimeout(() => {
      console.log(filteredData);
      console.log(filteredData[0].profileImage);
      setUserImage(filteredData[0].profileImage);
      setUsername(filteredData[0].username);
    }, 100);
  }  

  useEffect(() => {
    getContent();
    getUser();
  }, []);

  useEffect(() => {
    if (initialRender){
      setInitialRender(false);
    }
    else {
      postContent();
    }
  }, [postFullContent]);
  

  const onSubmit = (data: {makePost: string}) => {
    const user = username;
    const image = userImage;

    setPostFullContent({
      user: user ? user : 'Unknown User',
      content: data.makePost,
      image: image ? image : 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    });

    setTimeout(() => {
      navigate('/');
    }, 100);
  }

  interface FormValues {
    makePost: string
  }
  
  const {register, handleSubmit, formState: { errors }} = useForm<FormValues>();
  
  return (
    <div className='card-holder'>
      <form className='form card card--form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className='input-heading input-heading-post'>Create a Post!</h1>
          <div className='input-padding'>
            <label className='input-label' htmlFor='makePost'><h2 id='description' >Description</h2></label>
            <textarea 
              className='textarea'
              placeholder='type...'
              {...register('makePost', {required: true})}
            />
            {errors.makePost && <p className='error'>Post can not be empty.</p>}
          </div>
          <div className='btn-container'>
            <button id="Post" className='btn-submit' type='submit'>POST</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;