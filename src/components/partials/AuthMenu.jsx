import React from 'react';

import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';

import LoginAs from './LoginAs.jsx';
import { Menu, MenuItem } from 'material-ui/Menu';

class AuthMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            menuAnchor: null,
            openMenu: false,
            openLoginAs: false,
            loginAs: false
        };

        this._palette = props.muiTheme.palette;

        // binding
        this._openMenu = this._openMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
        this._logout = this._logout.bind(this);
        this._openLoginAs = this._openLoginAs.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._backToMainAccount = this._backToMainAccount.bind(this);
    }

    componentDidMount() {
        // listen the store change
        AuthStore.addChangeListener(this._onAuthStoreChange.bind(this));
    }

    /**
     * When there is a change in the AuthStore, update the value of user in the component state
     */
    _onAuthStoreChange() {
        this.setState({
            user: AuthStore.user,
            loginAs: AuthStore.loginAs
        });
    }

    /**
     * Close the menu and call the AuthActions to logout the user.
     */
    _logout() {
        this._closeMenu();
        AuthActions.logout();
    }

    /**
     * Set the value of 'openLoginAs' to true in the state
     * to open the "login as" dialog
     */
    _openLoginAs() {
        this.setState({ openLoginAs: true });
        this._closeMenu();
    }

    /**
     * Set the value of 'openLoginAs' to false in the state
     * to close the "login as" dialog
     */
    _closeDialog() {
        this.setState({ openLoginAs: false });
    }

    /**
     * Set the value of 'open' to true in the state
     * to open the AuthMenu at the same position as the AuthMenu button
     *
     * @param event : used to get the position of the AuthMenu button
     */
    _openMenu(event) {
        this.setState({ openMenu: true, menuAnchor: event.currentTarget });
        return false;
    }

    /**
     * Close the menu and call the AuthService's method to come back to the main account
     */
    _backToMainAccount() {
        this._closeMenu();
        AuthActions.backToMainAccount();
    }

    /**
     * Set the value of 'open' to false in the state
     * to close the AuthMenu
     */
    _closeMenu() {
        this.setState({ openMenu: false });
    }

    render() {
        const style = {
            userButton: {
                background: 'none',
                color: this._palette.alternateTextColor,
                padding: 0,
                outline: 'none',
                cursor: 'pointer',
                border: 0,

                whiteSpace: 'nowrap',
                overflow: 'hidden',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
            },
            icon: {
                color: this._palette.alternateTextColor,
                marginLeft: '8px',
            },
            userDetails: {
                textAlign: 'right',
                display: 'inline-block',
            },
            backToMainAccount: {
                // only show "back to main account" if the user is login as someone else
                display: this.state.loginAs ? "block" : "none"
            },
        };

        // Disable if not authenticated
        if(!this.state.user) {
            return null;
        }

        return (
            <div>
                <button onTouchTap={this._openMenu} style={style.userButton}>
                    <div style={style.userDetails}>
                        <strong>Team</strong><br/>
                        {this.state.user.name}
                    </div>
                    <AccountCircleIcon style={style.icon} />
                </button>
                <Popover
                    anchorEl={this.state.menuAnchor}
                    open={this.state.openMenu}
                    onRequestClose={this._closeMenu}
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem onTouchTap={this._logout}>Logout</MenuItem>
                        <MenuItem onTouchTap={this._openLoginAs}>Login as someone else</MenuItem>
                        <MenuItem onTouchTap={this._backToMainAccount} style={style.backToMainAccount}>Back to main account</MenuItem>
                    </Menu>
                </Popover>

                <LoginAs open={this.state.openLoginAs} closeDialog={this._closeDialog} />
            </div>
        );
    }

}
export default muiThemeable()(AuthMenu);