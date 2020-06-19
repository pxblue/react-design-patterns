import React, { useState, useEffect } from 'react';

import {
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    AppBar,
    Hidden,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { Person as PersonIcon, MoreVert as MoreVertIcon, Menu as MenuIcon } from '@material-ui/icons';
import { Spacer } from '@pxblue/react-components';
import clsx from 'clsx';
import { listItems } from '../../../assets/list';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';

const MAX_APP_BAR_HEIGHT = 128; // Specified by Material Design

const useStyles = makeStyles((theme: Theme) => ({
    banner: {
        // IE 11 does not support background blend mode. To see the image, you need to reverse the order of the image and gradient in the background property below.
        background:
            'linear-gradient(rgba(0, 123, 193, 1), rgba(0, 75, 158, 1)), url(https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundBlendMode: 'soft-light',
        minHeight: MAX_APP_BAR_HEIGHT,
        color: '#fff',
        position: 'relative',
    },
    alignTopContent: {
        top: -theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            top: -theme.spacing(7),
        },
    },
    bannerMain: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    content: {
        position: 'absolute',
        left: theme.spacing(9),
        bottom: 28,
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    header: {
        transform: 'translateY(-120%)',
        transition: 'all 0.5s ease-in-out',
    },
    top: {
        transform: 'translateY(0)',
    },
    headerTitle: {
        fontWeight: 600,
        lineHeight: '1.6rem',
    },
    headerSubtitle: {
        marginTop: -2,
        fontWeight: 300,
        lineHeight: '1.2rem',
    },
    bannerActionItems: {
        display: 'flex',
        width: '100%',
        minHeight: theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            minHeight: theme.spacing(7),
        },
    },
}));

export const CollapsibleAppBar = (props: any): JSX.Element => {
    const classes = useStyles(props);
    const [list] = useState(listItems);
    const [headerActive, setHeaderActive] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const dispatch = useDispatch();

    const styleHeaderAndBanner = (): void => {
        setOpacity(window.pageYOffset);
        if (window.pageYOffset > 70) {
            setHeaderActive(true);
        } else {
            setHeaderActive(false);
        }
    };

    // When the page first gets loaded but with a pageYOffset, set the
    // header in the appropriate position.
    useEffect(() => {
        styleHeaderAndBanner();
    });

    return (
        <div id="scroll-area" onWheel={styleHeaderAndBanner}>
            <AppBar className={clsx(classes.header, headerActive && classes.top)} position={'sticky'}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div>
                        <Typography className={classes.headerTitle} variant="h6" color="inherit">
                            President
                        </Typography>
                        <Typography className={classes.headerSubtitle} variant="subtitle1" color="inherit">
                            Leader of the Free World
                        </Typography>
                    </div>
                    <Spacer />
                    <IconButton color="inherit" edge={'end'}>
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={clsx(classes.banner, classes.alignTopContent)}>
                <Toolbar className={classes.bannerMain}>
                    <div className={classes.bannerActionItems}>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                onClick={(): void => {
                                    dispatch({ type: TOGGLE_DRAWER, payload: true });
                                }}
                                edge={'start'}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Spacer />
                        <IconButton color="inherit" edge={'end'}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
                <div className={classes.content} style={{ opacity: 1 - opacity / MAX_APP_BAR_HEIGHT }}>
                    <Typography variant="h6" color="inherit">
                        President
                    </Typography>
                    <Typography variant="body1" color="inherit">
                        Commander in Chief
                    </Typography>
                    <Typography variant="body2" color="inherit">
                        Leader of the Free World
                    </Typography>
                </div>
            </div>
            <List component="nav" className={classes.alignTopContent}>
                {list.map(
                    (item, i): JSX.Element => (
                        <ListItem key={`item-${i}`}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.president}
                                secondary={
                                    <>
                                        <Typography variant={'body2'}>{item.party}</Typography>
                                        <Typography variant={'body2'}>{item.took_office}</Typography>
                                    </>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                            />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );
};