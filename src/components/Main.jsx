import TimeList from "./TimeList";
import DayList from "./DayList";

function Main() {
    return (
        <main className="app">
            <div className="app__header">
                <h1 className="app__header-title">Calendar</h1>
                <div className="app__header-buttons">
                    <label>
                        <div className="select app__header-select">
                            <select className="select__inner js-members">
                                <option value="all" defaultValue>All members</option>
                                <option value="1">John</option>
                                <option value="2">Sam</option>
                                <option value="3">Ann</option>
                                <option value="4">Thomas</option>
                                <option value="5">Eve</option>
                            </select>
                        </div>
                    </label>
                    <button className="app__header-button js-open-popup" type="button">
                        New event
                    </button>
                </div>
            </div>
            <div className="app__body">
                <TimeList/>
                <div className="app__content">
                    <DayList/>
                    <div className="calendar js-calendar"/>
                </div>
            </div>
        </main>
    );
}

export default Main;
