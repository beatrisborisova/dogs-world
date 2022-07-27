import './Contacts.css';

export const Contacts = () => {
    return (
        <>
            <h2>Contacts</h2>
            <h4>About</h4>
            <div className='softuni-image-wrapper'>
                <img src={require('../../../assets/images/softuni-logo.png')} alt='softuni' />
            </div>
            <p>Handcrafter by me, <a href='https://github.com/beatrisborisova'>Beatris Borisova</a></p>
            <div className='about-text'>
                <p>This is a project for the React.js course at Software University</p>
                <h3>Technologies used:</h3>
                <ul>
                    <li>React.js 18.2.0</li>
                    <li>React Redux 8.0.2</li>
                    <li>Firebase 9.9.0</li>
                    <li>React Bootstrap 2.4.0</li>
                    <li>Font Awesome 6.1.1</li>
                    <li>Material UI 5.9.2</li>
                </ul>
            </div>
        </>
    )
}