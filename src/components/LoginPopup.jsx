function LoginPopup(props) {
    const {authorization} = props;

    return (
        <form className="popup js-popup_login popup_active" onSubmit={authorization}>
            <label>
                <div className="select app__header-select">
                    <select className="select__inner js-auth-select">
                        <option value="1" defaultValue>John</option>
                        <option value="2">Sam</option>
                        <option value="3">Ann</option>
                        <option value="4">Thomas</option>
                        <option value="5">Eve</option>
                    </select>
                </div>
                <button className="popup__btn">Confirm</button>
            </label>
        </form>
    );
}

export default LoginPopup;
