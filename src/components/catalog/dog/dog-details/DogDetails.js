import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteModal from '../../../others/Confirmation';
import LinearColor from '../../../others/Linear';
import { useDispatch, useSelector } from 'react-redux';
import { removeDog } from '../../../../features/dogs';
import { Comment } from '../../../comments/Comment';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

export const DogDetails = () => {

    // const dogId = useParams().id;
    const [dog, setDog] = useState(null);
    const [open, setOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});

    const user = useSelector(states => states.user.value.payload);
    const stateDog = useSelector(states => states.dog.value.payload);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dogsService.getDogById(stateDog.id)
            .then(res => {
                setDog(res)
                setComments(res.comments)
            })
            .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        dogsService.getDogById(stateDog.id)
            .then(res => setDog(res))
            .catch(err => console.log(err.message))
    }, [newComment])

    useEffect(() => {
        if (stateDog) {
            if (user.uid === stateDog.creatorId) {
                setIsCreator(true)
            }
        }
    }, [])

    const addCommentHandler = (e) => {
        e.preventDefault();

        const comment = (new FormData(e.target)).get('comment');
        const currentdate = new Date();
        const datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + ", "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const newComment = {
            dogId: stateDog.id,
            comment,
            commentOwnerId: user.uid,
            commentId: v4(),
            commentOwnerEmail: user.email,
            commentCreatedAt: datetime
        }


        dogsService.addComment(stateDog.id, dog, comments, newComment)
            .then(() => {
                setNewComment(newComment)
                setComments(oldComments => [...oldComments, newComment])
            })
            .catch(err => console.log(err.message))
    }

    if (agree) {
        dogsService.deleteDog(stateDog.id, dog)
            .then(() => {
                navigate(`/catalog/${stateDog.dog.type}`)
                dispatch(removeDog());
                setOpen(false)
            })
            .catch((err) => console.log(err.message))
    }

    return (
        <>
            <div className='dog-details-container'>
                {open && <DeleteModal state={{ setOpen, setAgree }} />}

                {stateDog && <>
                    <div className="image-wrapper-dog-details">
                        <img src={stateDog.dog.uploadImg} alt="dog" />
                    </div>
                    <div className='details-content'>
                        <div className="dog-details-text">
                            <h2>{stateDog.dog.breed}</h2>
                            <p>Age: {stateDog.dog.age} years old</p>
                            <p>Vacciness: {stateDog.dog.vaccines}</p>
                            <p>{stateDog.dog.description}</p>
                        </div>
                        {isCreator &&
                            <div className='details-btns'>
                                <button onClick={() => navigate(`/edit/${stateDog.id}`, { state: { id: stateDog.id } })} className="btn-level-two">Edit dog</button>
                                <button onClick={() => setOpen(true)} className="btn-level-two delete">Delete dog</button>
                            </div>
                        }
                    </div>
                </>}

                {!stateDog && <LinearColor />}


            </div>

            <div className='comments-container'>
                <div className='comments-content'>
                    {dog && <h2>Comments</h2>}
                    {dog && dog.comments.length > 0 &&
                        dog.comments.map(el => <Comment comment={el} commentOwnerEmail={el.commentOwnerEmail} key={el.commentId} date={el.commentCreatedAt} />)
                    }
                    {dog && dog.comments.length === 0 &&
                        <div className='no-comments'>No comments yet. Be the first one <FontAwesomeIcon icon={faSmile} style={{ color: '#e2db23', fontSize: '20px' }} /></div>
                    }
                </div>
                <div className='add-comment-container'>
                    <form onSubmit={addCommentHandler} className="comments-form">
                        <p className='email-comment'>{user.email}</p>
                        <div>
                            <textarea className='comment-field' name='comment' placeholder='Your comment here...'></textarea>
                            <button className='btn-level-three' type='submit'>Add comment</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}