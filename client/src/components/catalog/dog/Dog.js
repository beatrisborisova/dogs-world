import './Dog.css';

export const Dog = () => {
    return (
        <article className='dog-container'>
            <div className='image-wrapper-dog-main'>
                <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt='{породата}' />
            </div>
            <h4>Порода</h4>
            <p>Пол</p>
            <p>Години</p>
        </article>
    )
}