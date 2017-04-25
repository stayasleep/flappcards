import React from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';
import ExampleCard from './single_card';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
    <div>
        <FlashCardsAppBar/>
        <ExampleCard/>
    </div>
);

export default App;
