import React, { useCallback, useState } from 'react';
import { AppBar, Avatar, Badge, Hidden, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle, Apps, ExitToApp, LockOpen, Settings, VpnKey } from '@material-ui/icons';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Spacer, UserMenu } from '@pxblue/react-components';
import { Chip } from './Chip';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as colors from '@pxblue/colors';

const avatarImage = require('../../../assets/avatar_40.png').default;
const menuGroupItems = [
    {
        items: [
            {
                title: 'Change Password',
                icon: <VpnKey />,
            },
            {
                title: 'Preferences',
                icon: <Settings />,
            },
            {
                title: 'Log Out',
                icon: <ExitToApp />,
            },
        ],
    },
];
const avatarTitle = 'Chima Thabani';
const avatarSubtitile = 'CThabani@example.com';

const useStyles = makeStyles((theme: Theme) => ({
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    appBarContainer: {
        maxWidth: 960,
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}px`,
    },
    appBar: {
        marginBottom: `${theme.spacing(3)}px`,
        '&:last-child': {
            marginBottom: 0,
        },
    },
    appBarHeader: {
        maxWidth: 600,
        margin: `${theme.spacing(5)}px auto ${theme.spacing(3)}px`,
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    },
    badge: {
        backgroundColor: colors.green[500],
        color: colors.green[500],
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    textContainer: {
        marginLeft: `${theme.spacing(2.5)}px`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    paper: {
        marginTop: `${theme.spacing(1)}px`,
    },
    userMenuChip: {
        width: '112px',
        height: `${theme.spacing(4)}px`,
    },
    chipIcon: {
        height: `${theme.spacing(3)}px`,
        width: `${theme.spacing(3)}px`,
    },
}));

export const InAnAppBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [chipToggled, setChipToggled] = useState(false);

    const toggleChip = useCallback((): void => {
        setChipToggled(!chipToggled);
    }, [chipToggled]);

    return (
        <div style={{ minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        In an App Bar
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div>
                <div className={classes.appBarHeader}>
                    <Typography variant={'body1'}>
                        Click on each avatar to see the account menu. Resize the screen to view the account menu / user
                        menu rendered responsively.
                    </Typography>
                </div>
                <div className={classes.appBarContainer}>
                    {/* Generic Icon Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'}>
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Generic Icon Avatar
                                </Typography>
                                <Typography variant={'body1'} noWrap>
                                    Shared / Anonymous Account
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar />}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Log In',
                                                icon: <LockOpen />,
                                            },
                                            {
                                                title: 'Register',
                                                icon: <Apps />,
                                            },
                                            {
                                                title: 'About',
                                                icon: <InfoIcon />,
                                            },
                                        ],
                                    },
                                ]}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Basic Letter Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'}>
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Basic Letter Avatar
                                </Typography>
                                <Typography variant={'body1'} noWrap>
                                    Showing User’s Initials
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar>CT</Avatar>}
                                menuGroups={menuGroupItems}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Image Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'}>
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Image Avatar
                                </Typography>
                                <Typography variant={'body1'} noWrap>
                                    Showing A Custom Profile Picture
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={<Avatar alt="Chima Thabani" src={avatarImage} />}
                                menuGroups={menuGroupItems}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Status Avatar Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton edge={'start'}>
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Status Avatar
                                </Typography>
                                <Typography variant={'body1'} noWrap>
                                    Avatar with Status Indicator
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                avatar={
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                        classes={{ dot: classes.badge }}
                                    >
                                        {<Avatar alt="Chima Thabani" src={avatarImage} />}
                                    </Badge>
                                }
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                title: 'Change Password',
                                                icon: <VpnKey />,
                                            },
                                            {
                                                title: 'Preferences',
                                                icon: <Settings />,
                                            },
                                            {
                                                title: 'Logout',
                                                icon: <ExitToApp />,
                                            },
                                        ],
                                    },
                                ]}
                                menuTitle={avatarTitle}
                                menuSubtitle={avatarSubtitile}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                            />
                        </Toolbar>
                    </AppBar>
                    {/* Text Menu Example */}
                    <AppBar position="static" color="inherit" className={classes.appBar}>
                        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                            <IconButton color={'inherit'} edge={'start'}>
                                <MenuIcon />
                            </IconButton>
                            <div className={classes.textContainer}>
                                <Typography variant={'h6'} noWrap>
                                    Text Menu
                                </Typography>
                                <Typography variant={'body1'} noWrap>
                                    Calling Out the User Name
                                </Typography>
                            </div>
                            <Spacer />
                            <UserMenu
                                onClick={toggleChip}
                                avatar={
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        icon={<AccountCircle />}
                                        label="Admin"
                                        rightIcon={chipToggled ? <ExpandLessIcon /> : <ExpandMoreOutlinedIcon />}
                                        style={{ backgroundColor: chipToggled ? colors.white[500] : colors.white[50] }}
                                    />
                                }
                                menuGroups={menuGroupItems}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    classes: { paper: classes.paper },
                                }}
                            />
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        </div>
    );
};
