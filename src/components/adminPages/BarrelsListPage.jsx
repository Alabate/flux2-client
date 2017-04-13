import React from 'react';

import BarrelsList from '../barrels/BarrelsList.jsx';

export default class BarrelsListPage extends React.Component {

    render() {
        return (
            <div>
                <h2>Liste des fûts</h2>
                <BarrelsList />
            </div>
        );
    }

}
