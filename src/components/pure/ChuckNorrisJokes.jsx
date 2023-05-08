import React, { useEffect, useState } from 'react';
import { getChuckNorrisJoke } from '../../services/axiosService';
import {Typography, Button} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ChuckNorrisJokes = () => {
    const [currentJoke, setCurrentJoke] = useState(null);
    const [likedJokes, setLikedJokes] = useState([]);
    const [dislikedJokes, setDislikedJokes] = useState([]);
    useEffect(() => {
        obtainJoke();
    }, []);
    const obtainJoke=()=>{
        getChuckNorrisJoke()
            .then((response)=>{
                console.log(response.data);
                setCurrentJoke(response.data)
            })
            .catch((error)=>{
                console.log("Error ocurred while fetching your joke");
                console.error(error);
            })
    }
    const likeJoke=(id)=>{
        const tempJokes=[...likedJokes];
        tempJokes.push(id);
        setLikedJokes(tempJokes);
    }
    const unlikeJoke=(id)=>{
        const tempJokes=[...likedJokes];
        tempJokes.splice(tempJokes.indexOf(id),1);
        setLikedJokes(tempJokes);
    }
    const dislikeJoke=(id)=>{
        const tempJokes=[...dislikedJokes];
        tempJokes.push(id);
        setDislikedJokes(tempJokes);
    }
    const undislikeJoke=(id)=>{
        const tempJokes=[...dislikedJokes];
        tempJokes.splice(tempJokes.indexOf(id),1);
        setDislikedJokes(tempJokes);
    }
    return (
        <div>
            {
                currentJoke &&
                <div>
                <Typography variant='h4' component='p' fontFamily={['Comic Sans','sans-serif']}>
                    {currentJoke.value}
                </Typography>
                {
                    likedJokes.includes(currentJoke.id)?
                        <div>
                            <Typography variant='h6' component='p' color='green'>
                                You liked the joke
                            </Typography>
                            <Button color='primary' variant='contained' onClick={()=>unlikeJoke(currentJoke.id)}>Changed your mind?</Button>
                        </div>
                    :
                        dislikedJokes.includes(currentJoke.id)?
                            <div>
                                <Typography variant='h6' component='p' color='tomato'>
                                    You disliked the joke
                                </Typography>
                                <Button color='primary' variant='contained' onClick={()=>undislikeJoke(currentJoke.id)}>Changed your mind?</Button>
                            </div>
                        :
                            <div>
                                <Button color='success' variant='contained' onClick={()=>likeJoke(currentJoke.id)}><ThumbUpIcon/></Button>
                                <Button color='error' variant='contained' onClick={()=>dislikeJoke(currentJoke.id)}><ThumbDownIcon/></Button>
                            </div>
                }
                </div>
            }
            <Button color='primary' variant='contained' onClick={obtainJoke}>Generate new joke</Button>
        </div>
    );
}

export default ChuckNorrisJokes;
