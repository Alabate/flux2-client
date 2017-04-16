import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import * as color from 'material-ui/styles/colors';

require('../../../styles/barrels/BarrelChip.scss');


/**
 * This component will print a pin reprenting a barrel
 * @param {Barrel} barrel
 * @param {BarrelType} type type of the barrel
 * @param {Team} team (optional) if given, the team name will be written in the tooltip
 * @param {function()} onRequestDelete Will be called when the "delete" button is pressed
 * @param {function(id, selected)} onSelection Will be called when the chip is clicked
 * @param {boolean} selectable (default:false), Set to true if you want the chip to keep its selected color after click
 * @param {boolean} selected (default:false), Set to true if you want the chip to keep its selected color after click
 */
export default class BarrelChip extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            barrel: props.barrel,
            type: props.type,
            team: props.team,
            selected: props.selected !== undefined ? props.selected : false,
        }

        // binding
        this._handleClick = this._handleClick.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            barrel: nextProps.barrel,
            type: nextProps.type,
            team: nextProps.team,
            selected: nextProps.selected !== undefined ? nextProps.selected : false,
        });
    }

    _handleClick() {
        if(this.props.onSelection) {
            this.props.onSelection(this.state.barrel.id, !this.state.selected)
        }
        if(this.props.selectable) {
            this.setState({selected: !this.state.selected})
        }
    }

    render() {
        // Don't show anything if we miss data
        if(!this.state.type || ! this.state.barrel) {
            return null;
        }

        // Color selection
        let background = null;
        let avatarBackground = null;
        switch(this.state.barrel.state) {
            case 'new':
                background = this.state.selected ? color.teal300 : color.teal100;
                avatarBackground = color.teal600;
                break;
            case 'opened':
                background = this.state.selected ? color.orange300 : color.orange100;
                avatarBackground = color.orange600;
                break;
            case 'empty':
            default:
                background = this.state.selected ? color.red300 : color.red100;
                avatarBackground = color.red600;
                break;

        }

        // Tooltip generation
        let tooltip = this.state.type.name;
        if(this.state.team) {
            tooltip = this.state.type.name + ' - ' + this.state.team.name;
        }

        return (
            <Chip
                className="BarrelChip"
                backgroundColor={background}
                onRequestDelete={this.props.onRequestDelete}
                onTouchTap={this._handleClick}
                title={tooltip}
                key={this.state.barrel.id}
            >
                <Avatar className="BarrelChip__shortname"  backgroundColor={avatarBackground}>
                    {this.state.type.shortName}
                </Avatar>
                <span
                    className="BarrelChip__number"
                    style={{fontWeight: this.state.selected ? 'bold': 'normal'}}
                >
                    {this.state.barrel.num}
                </span>
            </Chip>

        );
    }

}
