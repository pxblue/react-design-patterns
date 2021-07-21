import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { eulaText } from './eulaText';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        maxWidth: '450px',
        margin: '0 auto',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(7)}px)`,
            padding: 0,
        },
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    reloadButton: {
        width: '100%',
    },
    eulaContent: {
        flex: '1 1 0px',
        overflow: 'auto',
    },
    eulaConfirmationCheck: {
        flex: '0 0 auto',
        marginRight: 0,
        marginTop: theme.spacing(2),
    },
    card: {
        position: 'relative',
        padding: 0,
        width: '100%',
        height: '100%',
        maxWidth: '450px',
        maxHeight: '730px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'none',
            maxHeight: 'none',
            borderRadius: 0,
        },
    },
    cardTitle: {
        padding: `${theme.spacing(4)}px ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
        },
    },
    cardContent: {
        flex: '1 1 0px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },
    cardActions: {
        padding: theme.spacing(3),
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
        },
    },
    overlayBackground: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
    },
}));

export const SpinnerOverlays = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [eulaLoaded, setEulaLoaded] = useState(false);

    const changeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEulaAccepted(event.target.checked);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!eulaLoaded) {
            timer = setTimeout(() => {
                setEulaLoaded(true);
            }, 3000);
        }
        return (): void => {
            clearTimeout(timer);
        };
    }, [eulaLoaded]);

    const reloadEulaDetails = useCallback((): void => {
        setEulaLoaded(false);
        setEulaAccepted(false);
    }, []);

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
                        Spinner Overlays
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Card className={classes.card}>
                    {!eulaLoaded && (
                        <div className={classes.overlayBackground}>
                            <CircularProgress size={96} />
                        </div>
                    )}
                    <CardHeader
                        title={<Typography variant={'h6'}>End User License Agreement</Typography>}
                        className={classes.cardTitle}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.eulaContent} variant={eulaLoaded ? 'body1' : 'subtitle1'}>
                            {eulaLoaded ? eulaText : 'Loading EULA...'}
                        </Typography>
                        <FormControlLabel
                            className={classes.eulaConfirmationCheck}
                            control={
                                <Checkbox
                                    checked={eulaAccepted}
                                    onChange={changeCheckboxState}
                                    name="eulaConformation"
                                    color="primary"
                                />
                            }
                            label="I have read and agree to the Terms & Conditions"
                        />
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.cardActions}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            className={classes.reloadButton}
                            onClick={reloadEulaDetails}
                        >
                            <Typography noWrap color={'inherit'}>
                                Reload
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};
