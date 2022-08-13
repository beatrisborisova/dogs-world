import styles from './Comment.module.css';
import { useSelector } from 'react-redux';

export const Comment = (props) => {

    const user = useSelector((states) => states.user.value.payload);

    const comment = props.comment.comment;
    const commentOwnerEmail = props.commentOwnerEmail;
    const commentCreatedAt = props.date;

    let isOwner;
    if (props.creatorId === user.uid) {
        isOwner = true
    } else {
        isOwner = false
    }

    console.log('isOwner', isOwner);

    return (
        <div className={styles.commentContainer}>
            <p><b>{commentOwnerEmail}</b> {isOwner ? '(owner)' : ''} </p>
            <p>{comment}</p>
            <p>{commentCreatedAt}</p>
        </div>
    )
}