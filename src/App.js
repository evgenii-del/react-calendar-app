import {useEffect} from "react";
import axios from "axios";

import Main from "./components/Main";
import ErrorPopup from "./components/ErrorPopup";
import FormPopup from "./components/FormPopup";
import ConfirmationPopup from "./components/ConfirmationPopup";
import LoginPopup from "./components/LoginPopup";

class Server {
    constructor(url, system, entity) {
        if (typeof Server.instance === 'object') {
            return Server.instance;
        }
        this.fullUrl = `${url}${system}/${entity}`;
        Server.instance = this;
        return this;
    }

    async fetchEvents() {
        return axios.get(this.fullUrl);
    }

    async createEvent(body) {
        return axios.post(this.fullUrl, body);
    }

    async removeEvent(id) {
        return axios.delete(`${this.fullUrl}/${id}`);
    }
}

class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach((fn) => {
                fn.call(null, data);
            });
        }
    }
}

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Admin extends User {
    constructor(id, name) {
        super(id, name);
        this.isAdmin = true;
    }
}

function App() {
    const serverInstance = new Server(
        'http://158.101.166.74:8080/api/data/',
        'evgenii_khasanov',
        'events'
    );
    const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    const timesSelectArr = timesArr.map((el) => ({value: el, label: `${el}:00`}));
    const createCalendarData = () => {
        const obj = {};
        timesArr.forEach((time) => {
            obj[time] = {
                Monday: {},
                Tuesday: {},
                Wednesday: {},
                Thursday: {},
                Friday: {}
            };
        });
        return obj;
    };

    const ee = new EventEmitter();
    let isAdmin = false;
    const calendarData = createCalendarData();
    const userNames = ['John', 'Sam', 'Ann', 'Thomas'];
    const users = [
        ...userNames.map((name, index) => new User(index + 1, name)),
        new Admin(5, 'Eve')
    ];

    const changeCalendarData = async () => {
        const {data} = await serverInstance.fetchEvents();
        if (data) {
            data.forEach((item) => {
                const parsedData = JSON.parse(item.data);
                const [time, day] = parsedData.date.split('-');
                calendarData[time][day] = {
                    id: item.id,
                    data: parsedData
                };
            });
        }
    };

    ee.subscribe('event:fetch-events', () => changeCalendarData());

    const closePopup = (popupProp) => {
        const overlay = document.querySelector('.js-overlay');

        popupProp.classList.remove('popup_active');
        overlay.classList.remove('overlay_active');
    };

    const openPopup = (popupProp) => {
        const overlay = document.querySelector('.js-overlay');

        popupProp.classList.add('popup_active');
        overlay.classList.add('overlay_active');
    };

    const selectEvent = (target) => {
        const popupButton = document.querySelector('.js-popup__btn');
        const popupConfirmation = document.querySelector('.js-popup_confirmation');

        if (target.classList.contains('reserved')) {
            const [time, day] = target.dataset.id.split('-');
            const event = calendarData[time][day].data;
            popupConfirmation.querySelector(
                'p'
            ).innerText = `Are you sure you want to delete "${event.title}" event?`;
            popupButton.dataset.id = target.dataset.id;
            openPopup(popupConfirmation);
        }
    };

    const showPopupError = () => {
        const popupError = document.querySelector('.js-popup_error');
        popupError.classList.add('popup_active')
    };
    const hidePopupError = () => {
        const popupError = document.querySelector('.js-popup_error');
        popupError.classList.remove('popup_active')
    };

    const isRadio = (type) => ['radio'].includes(type);
    const titleValidation = (title) => title.length >= 3;
    const timeValidation = (calendar, time, day) =>
        !calendar[time][day].data;
    const participantsValidation = (participants) => participants.length;

    const formValidation = (values) => {
        const {times, days, title, color, participants} = values;
        const isValid =
            timeValidation(calendarData, times, days) &&
            titleValidation(title) &&
            participantsValidation(participants);

        if (isValid) {
            const event = {
                date: `${times}-${days}`,
                reserved: true,
                participants,
                title,
                color
            };
            const data = JSON.stringify({data: JSON.stringify(event)});

            ee.emit('event:create-event', data);
        } else {
            showPopupError();
        }
    };

    const retrieveFormValue = (event) => {
        const popup = document.querySelector('.js-popup');

        event.preventDefault();
        const values = {};

        [...popup.elements].forEach((field) => {
            const {name, type, value} = field;

            if (name === 'participants') {
                values.participants = [...field.options]
                    .filter((x) => x.selected)
                    .map((x) => x.value);
            } else if (isRadio(type)) {
                if (field.checked) {
                    values[name] = value;
                }
            } else {
                values[name] = value;
            }
        });

        formValidation(values);
    };

    const showAdminInputs = () => {
        const openPopupButton = document.querySelector('.js-open-popup')
        const popup = document.querySelector('.js-popup');
        const closePopupButtons = document.querySelectorAll('.js-close-popup');
        const overlay = document.querySelector('.js-overlay');
        const calendar = document.querySelector('.js-calendar');
        const popupButton = document.querySelector('.js-popup__btn');
        const popupConfirmation = document.querySelector('.js-popup_confirmation');

        openPopupButton.style.display = 'block';

        openPopupButton.addEventListener('click', () => openPopup(popup));

        closePopupButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const popupActive = button.closest('.popup');
                hidePopupError();
                closePopup(popupActive);
            });
        });

        overlay.addEventListener('click', () => {
            const popupsActive = document.querySelectorAll('.popup_active');
            popupsActive.forEach((popupActive) => {
                closePopup(popupActive);
            });
        });

        popup.addEventListener('submit', retrieveFormValue);
        calendar.addEventListener('click', ({target}) => selectEvent(target));
        popupButton.addEventListener('click', ({target}) =>
            ee.emit('event:remove-event', target.dataset.id)
        );
        timesSelectArr[0].selected = true;

        ee.subscribe('event:remove-event', (data) => {
            const [time, day] = data.split('-');
            const { id } = calendarData[time][day];
            calendarData[time][day] = {};
            serverInstance.removeEvent(id).then(() => {
                closePopup(popupConfirmation);
                // changeCalendarData(membersSelect.value);
            });
        });

        ee.subscribe('event:create-event', (data) => {
            serverInstance.createEvent(data).then(() => {
                popup.reset();
                hidePopupError();
                closePopup(popup);
                // changeCalendarData(membersSelect.value);
            });
        });
    };

    const authorization = (event) => {
        const popupLoginForm = document.querySelector('.js-popup_login');
        const authForm = document.querySelector('.js-auth-select');

        event.preventDefault();
        isAdmin = users.find(({id}) => id === +authForm.value).isAdmin;
        closePopup(popupLoginForm);

        if (isAdmin) showAdminInputs();
        // renderCalendar(calendarData, 'all', isAdmin);
    };

    useEffect(() => {
        ee.emit('event:fetch-events');
    }, [])

    return (
        <div className="App">
            <div className="wrapper">
                <Main ee={ee} calendarData={calendarData} selectedParticipant={'all'} isAdmin={isAdmin}/>
            </div>
            <ErrorPopup/>
            <FormPopup/>
            <ConfirmationPopup/>
            <LoginPopup authorization={authorization}/>
            <div className="overlay overlay_active js-overlay"/>
        </div>
    );
}

export default App;
