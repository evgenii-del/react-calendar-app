import Main from "./components/Main";
import ErrorPopup from "./components/ErrorPopup";
import FormPopup from "./components/FormPopup";
import ConfirmationPopup from "./components/ConfirmationPopup";
import LoginPopup from "./components/LoginPopup";


function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Main/>
            </div>
            <ErrorPopup/>
            <FormPopup/>
            <ConfirmationPopup/>
            <LoginPopup/>
            <div className="overlay overlay_active js-overlay"/>
        </div>
    );
}

export default App;
