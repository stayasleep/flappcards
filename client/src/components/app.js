import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/landingPage.css';
import './styles/singleCard.css';
import './styles/footer.css';
import './styles/disclaimer.css';
import './styles/log_in.css';
import './styles/search.css'
import './styles/appBar.css'
import './styles/signReg.css';
import './styles/whyFlappsComp.css';
import './styles/popUpComponent.css';
import './styles/landing_page.css'; //for andres'
import {
    teal700, teal500,
    indigo200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import Footer from './nav/index';
// getMuiTheme() computes a "valid" muiTheme object
const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    margin: "1em auto",
    palette: {
        primary1Color: teal700,
        primary2Color: teal500,
        primary3Color: grey400,
        accent1Color: indigo200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: fullBlack,
        alternateTextColor: white,
        canvasColor: "#f0f0f0",
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: teal700,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
});
const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        {props.children}
        <Footer/>
        </div>
    </MuiThemeProvider>
);

export default App;
