import './Common.css';

export const Header = () => {
    return (
        <header>
            <div className="image-wrapper-logo">
                LOGO HERE
            </div>
            <nav>
                <ul className="navigation-list">
                    <li>Home</li>
                    <li>Име</li>
                    <li>Cause</li>
                    <li>Contacts</li>
                </ul>
            </nav>
            <div>
                <ul className="user-navigation-list">
                    <li>Login</li>
                    <li>Register</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
        </header>
    )
}