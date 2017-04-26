import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MyShelf from './my_shelf';
import CreateCards from './create_cards';
import Search from './search_page'

const App = (props) => (
    <div>
        <Search/>
        {props.children}
    </div>
);

export default App;
