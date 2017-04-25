import React from 'react';

import FlashCardsAppBar from './app_bar_with_drawer';
import ExampleCard from './single_card';
import Registration from './registration';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = (props) => (
    <div>
        <FlashCardsAppBar/>
        <ExampleCard/>
        <Registration/>
    </div>
);

export default App;
