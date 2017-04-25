import React from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';
import ExampleCard from './single_card';
import LoginForm from './login_form';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
    <div>
        <FlashCardsAppBar/>
        <ExampleCard/>
        <LoginForm/>
    </div>
);

export default App;
