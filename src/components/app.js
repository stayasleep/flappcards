import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MyShelf from './my_shelf'

const App = (props) => (
    <div>
        <MyShelf/>
        {props.children}
    </div>
);

export default App;
