function FormPopup() {
    return (
        <form className="popup js-popup">
            <button className="popup__close js-close-popup" type="button"/>
            <label className="popup__label">
                <input
                    className="popup__field"
                    name="title"
                    type="text"
                    placeholder="Name of the event"
                />
            </label>
            <label className="popup__label">
                <div className="select select--multiple custom-select-wrapper-form">
                    <select
                        className="select__inner select-multiple"
                        name="participants"
                        size="3"
                        multiple
                    >
                        <option className="select__inner-option" value="1">John</option>
                        <option className="select__inner-option" value="2">Sam</option>
                        <option className="select__inner-option" value="3">Ann</option>
                        <option className="select__inner-option" value="4">Thomas</option>
                        <option className="select__inner-option" value="5">Eve</option>
                    </select>
                    <span className="focus"/>
                </div>
            </label>
            <label className="popup__label">
                <div className="select custom-select-wrapper-form">
                    <select className="select__inner" name="times">
                        <option value="10" defaultValue>10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                    </select>
                    <span className="focus"/>
                </div>
            </label>
            <label className="popup__label">
                <div className="select custom-select-wrapper-form">
                    <select className="select__inner" name="days">
                        <option value="Monday" defaultValue>Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                    <span className="focus"/>
                </div>
            </label>
            <ul className="popup__colors">
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="yellow"
                            type="radio"
                            name="color"
                            defaultChecked
                        />
                        <span className="check__box yellow"/>
                    </label>
                </li>
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="green"
                            type="radio"
                            name="color"
                        />
                        <span className="check__box green"/>
                    </label>
                </li>
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="red"
                            type="radio"
                            name="color"
                        />
                        <span className="check__box red"/>
                    </label>
                </li>
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="khaki"
                            type="radio"
                            name="color"
                        />
                        <span className="check__box khaki"/>
                    </label>
                </li>
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="violet"
                            type="radio"
                            name="color"
                        />
                        <span className="check__box violet"/>
                    </label>
                </li>
                <li className="popup__colors-item">
                    <label className="check option">
                        <input
                            className="check__input visually-hidden"
                            value="blue"
                            type="radio"
                            name="color"
                        />
                        <span className="check__box blue"/>
                    </label>
                </li>
            </ul>
            <button className="popup__btn">Create</button>
        </form>
    );
}

export default FormPopup;
