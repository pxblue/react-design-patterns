import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardContent,
    Toolbar,
    Typography,
    Hidden,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    List,
    Snackbar,
} from '@material-ui/core';
import { makeStyles, Theme, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as PXBThemes from '@pxblue/react-themes';
import MenuIcon from '@material-ui/icons/Menu';
import { Folder, Description, Publish } from '@material-ui/icons';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import * as Colors from '@pxblue/colors';
import { InfoListItem } from '@pxblue/react-components';
type FolderItem = {
    id: number;
    name: string;
    progress: number;
    status: string;
    open: boolean;
};
const foldersList = [
    { label: 'The Best Dev Team', value: '1' },
    { label: 'The Best Design Team', value: '2' },
    { label: 'The Best UX Team', value: '3' },
    { label: 'The Best Management Team', value: '4' },
    { label: 'The Best Facility Team', value: '5' },
    { label: 'The Proudest Team', value: '6' },
];
const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }): JSX.Element => (
    <LinearProgress variant="determinate" {...props} />
);
const uploadFileList: FolderItem[] = [];

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        maxWidth: 600,
        margin: '0 auto',
    },
    cardContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    uploadButtonContainer: {
        textAlign: 'right',
        paddingBottom: `${theme.spacing(2)}px`,
    },
    formControl: {
        width: '100%',
    },
    radioLabel: {
        display: 'flex',
    },
    icon: {
        fill: Colors.black[200],
        marginLeft: `${theme.spacing(0.5)}px`,
    },
    iconContainer: {
        marginRight: `${theme.spacing(2)}px`,
        maxWidth: '40px',
        minWidth: '40px',
        width: '40px',
        marginTop: `${theme.spacing(1)}px`,
    },
    formLabel: {
        margin: 0,
        width: '100%',
        padding: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    toolbarGutters: {
        padding: `0 ${theme.spacing(2)}px`,
    },
    placementOfList: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            bottom: 0,
            right: 0,
            width: '100%',
        },
    },
    fileUploadItem: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0,
        },
    },
    snackbarRoot: {
        position: 'inherit',
        transform: 'none',
        backgroundColor: Colors.black[900],
    },
    bottomCenter: {
        left: 0,
        right: 0,
        bottom: 0,
        [theme.breakpoints.down('xs')]: {
            '& div:first-child': {
                width: '100%',
            },
        },
    },
}));
const createFileItem = (increment: number): FolderItem => ({
    id: increment,
    name: 'PX Blue is Awesome.pdf',
    progress: 0,
    status: `Uploading (0%)`,
    open: true,
});

let nextFileIndex = 0;

export const ProgressBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [fileUploadList, setFileUploadList] = useState<FolderItem[]>(uploadFileList);

    const [radioButtonvalue, setRadioButtonvalue] = useState('1');
    const changeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRadioButtonvalue((event.target as HTMLInputElement).value);
    };

    const uploadFile = useCallback((): void => {
        setFileUploadList((oldList) => [...oldList, createFileItem(nextFileIndex++)]);
    }, [fileUploadList, setFileUploadList]);

    const removeListItem = useCallback((id: number, status: string): void => {
        if (status === 'Complete') {
            return;
        }
        setFileUploadList((oldList) => oldList.map((item) => (item.id === id ? { ...item, open: false } : item)));
    }, []);

    const handleExited = useCallback((id: number) => {
        setFileUploadList((oldList) => oldList.filter((item) => item.id !== id));
    }, []);

    const handleRequestClose = useCallback((event: any, reason: string, id: number) => {
        if (reason === 'clickaway') {
            return;
        }
        setFileUploadList((oldList) => oldList.map((item) => (item.id === id ? { ...item, open: false } : item)));
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            const newList = [...fileUploadList];
            for (let i = 0; i < fileUploadList.length; i++) {
                if (fileUploadList[i].progress < 100) {
                    const newPercent = Math.min(100, fileUploadList[i].progress + Math.ceil(Math.random() * 5));
                    const newItem: FolderItem = {
                        ...fileUploadList[i],
                        progress: newPercent,
                        status: `Uploading (${newPercent}%)`,
                    };
                    newList[i] = newItem;
                } else {
                    const newItem: FolderItem = {
                        ...fileUploadList[i],
                        status: `Complete`,
                    };
                    newList[i] = newItem;
                }
            }
            setFileUploadList(newList);
        }, 100);
        if (fileUploadList.length < 1) {
            clearInterval(progressInterval);
        }
        return (): void => {
            clearInterval(progressInterval);
        };
    }, [fileUploadList]);

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
                        Progress Bars
                    </Typography>
                    <div />
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <div className={classes.uploadButtonContainer}>
                    <Button variant={'contained'} color={'primary'} startIcon={<Publish />} onClick={uploadFile}>
                        UPLOAD NEW FILE
                    </Button>
                </div>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <FormControl className={classes.formControl} component="fieldset">
                            <RadioGroup
                                aria-label="folder"
                                name="folder"
                                value={radioButtonvalue}
                                onChange={changeRadioGroup}
                            >
                                {foldersList.map((option, i) => (
                                    <FormControlLabel
                                        className={classes.formLabel}
                                        key={i}
                                        value={option.value}
                                        control={<Radio />}
                                        label={
                                            <div className={classes.radioLabel}>
                                                <Folder className={classes.icon} />
                                                <Typography style={{ marginLeft: '16px' }}> {option.label} </Typography>
                                            </div>
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
                <List data-cy={'list-content'} disablePadding component="nav" className={classes.placementOfList}>
                    {fileUploadList.map(
                        (item, i): JSX.Element => (
                            <div key={`itemKey${item.id}`} className={classes.fileUploadItem}>
                                <Snackbar
                                    classes={{
                                        root: classes.snackbarRoot,
                                        anchorOriginBottomCenter: classes.bottomCenter,
                                    }}
                                    open={item.open}
                                    autoHideDuration={item.progress === 100 ? 3000 : null}
                                    onClose={(e, reason): void => handleRequestClose(e, reason, item.id)}
                                    TransitionProps={{ timeout: 300, onExited: (): void => handleExited(item.id) }}
                                >
                                    <div>
                                        <MuiThemeProvider theme={createTheme(PXBThemes.blueDark)}>
                                            <InfoListItem
                                                key={`infolist${item.id}`}
                                                title={item.name}
                                                subtitle={item.status}
                                                icon={<Description />}
                                                rightComponent={
                                                    <Button
                                                        variant="outlined"
                                                        style={{ width: 80 }}
                                                        onClick={(): void => removeListItem(item.id, item.status)}
                                                    >
                                                        {item.progress === 100 ? 'View' : 'Cancel'}
                                                    </Button>
                                                }
                                            />
                                            <LinearProgressWithLabel value={item.progress} key={`progress${i}`} />
                                        </MuiThemeProvider>
                                    </div>
                                </Snackbar>
                            </div>
                        )
                    )}
                </List>
            </div>
        </div>
    );
};
