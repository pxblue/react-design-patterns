import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import {
    IconButton,
    Hidden,
    useTheme,
    makeStyles,
    Theme,
    createStyles,
    Fade,
    Divider,
    Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../redux/actions';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageBackground: {
            backgroundColor: theme.palette.background.paper,
            minHeight: '100vh',
            position: 'relative',
        },
        body: {
            padding: theme.spacing(3),
            color: theme.palette.text.primary,
            paddingTop: '10vh',
            paddingBottom: theme.spacing(5),
        },
        content: {
            maxWidth: 600,
            margin: '0 auto',
        },
        spaced: {
            '& > *': {
                marginTop: theme.spacing(3),
            },
        },
        links: {
            columnCount: 2,
            columnGap: theme.spacing(8),
            '& > *': {
                display: 'block',
                marginBottom: theme.spacing(1),
            },
            [theme.breakpoints.down('xs')]: {
                columnCount: 1,
            },
        },
    })
);

export const LandingPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [displayTitle, setDisplayTitle] = useState(false);
    const [displayBody, setDisplayBody] = useState(false);
    const [displayLinks, setDisplayLinks] = useState(false);

    useEffect((): void => {
        setTimeout((): void => {
            setDisplayTitle(true);
        }, 200);
        setTimeout((): void => {
            setDisplayBody(true);
        }, 500);
        setTimeout((): void => {
            setDisplayLinks(true);
        }, 1000);
    }, []);

    return (
        <div className={classes.pageBackground}>
            <Hidden mdUp>
                <AppBar position={'sticky'}>
                    <Toolbar>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={'h6'} color={'inherit'}>
                            PX Blue Design Patterns
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Hidden>
            <div className={classes.body}>
                <div className={clsx(classes.content, classes.spaced)}>
                    <Fade in={displayBody} timeout={300}>
                        <Typography variant={'h2'}>
                            The <span style={{ color: theme.palette.primary.main }}>Patterns</span>.
                        </Typography>
                    </Fade>
                    <Fade in={displayTitle} timeout={1500}>
                        <div className={classes.spaced}>
                            <Typography variant={'body1'}>
                                A <strong>design pattern</strong> is a common interaction or behavior that can exist at
                                any level in the PX Blue design system. When we see a certain emerging trend in the
                                application outside the scope of the Material Design, we would document and lock them
                                down as our design pattern.
                            </Typography>

                            <Typography variant={'body1'}>
                                While everyone is encouraged to try interacting with the design pattern demos, this
                                application is primarily intended for <strong> React developers </strong> to learn how
                                certain patterns can be incorporated into their own applications.
                            </Typography>
                            <Hidden mdUp>
                                <Button
                                    variant={'outlined'}
                                    disableElevation
                                    color={'primary'}
                                    onClick={(): void => {
                                        dispatch({ type: TOGGLE_DRAWER, payload: true });
                                    }}
                                >
                                    Explore PX Blue React Patterns
                                </Button>
                            </Hidden>
                        </div>
                    </Fade>
                    <Fade in={displayLinks} timeout={1000}>
                        <div className={classes.spaced}>
                            <Divider />
                            <div className={classes.links}>
                                <Button
                                    target={'_blank'}
                                    href={'https://pxblue.github.io/development/frameworks-web/react'}
                                >
                                    PX Blue React Developer Guide
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/patterns'}>
                                    Design Pattern Description
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue-components.github.io/react/'}>
                                    PX Blue React Components
                                </Button>
                                <Button target={'_blank'} href={'https://github.com/pxblue'}>
                                    Visit Us on GitHub
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/roadmap'}>
                                    Release Roadmap
                                </Button>
                                <Button target={'_blank'} href={'https://pxblue.github.io/community/contactus'}>
                                    Send Feedback or Suggestion
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};
