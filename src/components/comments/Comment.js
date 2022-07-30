import './Comment.css';

export const Comment = (props) => {

    const comment = props.comment.comment;
    const commentOwnerEmail = props.commentOwnerEmail;
    const commentCreatedAt = props.date;
    console.log('commentCreatedAt', commentCreatedAt);

    return (
        <div className='comment-container'>
            <p><b>{commentOwnerEmail}</b></p>
            <p>{comment}</p>
            <p>{commentCreatedAt}</p>
        </div>
    )
}