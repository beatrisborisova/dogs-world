import styles from './Comment.module.css';

export const Comment = (props) => {

    const comment = props.comment.comment;
    const commentOwnerEmail = props.commentOwnerEmail;
    const commentCreatedAt = props.date;

    return (
        <div className={styles.commentContainer}>
            <p><b>{commentOwnerEmail}</b></p>
            <p>{comment}</p>
            <p>{commentCreatedAt}</p>
        </div>
    )
}