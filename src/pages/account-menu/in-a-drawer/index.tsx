import React from 'react';
import { AppBar, Toolbar, Typography, Hidden, IconButton } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
        },
    },
    toolbarGutters: {
        padding: `0px ${theme.spacing(2)}px`,
    },
    LinearProgressBarIndeterminate: {
        position: 'absolute',
        bottom: 0,
        marginLeft: `-${theme.spacing(2)}px`,
        width: '100%',
    },
}));

export const InADrawer = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
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
                        In a Drawer
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
        </div>
    );
};
