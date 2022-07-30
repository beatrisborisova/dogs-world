import './Comments.css';

export const Comment = (props) => {

    const comment = props.comment.comment;
    const commentOwnerEmail = props.commentOwnerEmail;
    console.log(props, 'props');

    return (
        <div className='comment-container'>
            <p>{commentOwnerEmail}</p>
            <p>{comment}</p>
        </div>
    )
}