import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MyShelf from './my_shelf';
import CreateCards from './create_cards';

const App = (props) => (
    <div>
        <CreateCards/>
        {props.children}
    </div>
);

export default App;
