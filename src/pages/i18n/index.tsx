import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AppBar,
    Button,
    Checkbox,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Hidden,
    Tooltip,
    Snackbar,
} from '@material-ui/core';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import clsx from 'clsx';

import BoltIcon from '@material-ui/icons/OfflineBolt';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import ErrorIcon from '@material-ui/icons/Error';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { english } from './translations/english';
import './translations/i18n';
import './index.css';
require('typeface-noto-sans');

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        maxWidth: '85%',
        width: 350,
    },
    header: {
        height: '180px',
        color: 'white',
        background: theme.palette.primary.main,
        padding: '16px',
    },
    snackbar: {
        left: 'calc((100vw - 270px)/2 + 270px);',
        [theme.breakpoints.down('sm')]: {
            left: '50%',
        },
    },
    icon: {
        fontSize: 16,
        margin: 4,
    },
    listItem: {
        height: theme.spacing(6),
        paddingRight: theme.spacing(3),
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    },
    flexVert: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    flexVertBottom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    RTL: { transform: 'scaleX(-1)' },
    RTLButtonStartIcon: {
        marginRight: theme.spacing(-0.5),
        marginLeft: theme.spacing(),
    },
}));

export const I18N = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t, i18n } = useTranslation();
    const fruits = english.translations.FRUITS;
    const menuItems = english.translations.MENU_ITEMS;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set<string>());
    const [lang, setLang] = useState('en');
    const isRTL = (): boolean => lang === 'ar';
    const getDirection = (): string => (isRTL() ? 'rtl' : 'ltr');
    const dispatch = useDispatch();

    const changeLanguage = useCallback(
        (lng) => {
            setLang(lng);
            i18n.changeLanguage(lng);
        },
        [i18n]
    );

    useEffect(() => {
        changeLanguage('en');
    }, [changeLanguage]);

    const selectFruit = (fruit: string): void => {
        const selected = new Set(selectedItems);
        if (selected.has(fruit)) {
            selected.delete(fruit);
        } else {
            selected.add(fruit);
        }
        setSelectedItems(selected);
    };

    const getDrawer = (): ReactNode => {
        // eslint-disable-next-line react/jsx-key
        const iconArray = [<HomeIcon />, <FolderIcon />, <ErrorIcon />, <SettingsIcon />, <HelpIcon />];
        return (
            <Drawer
                open={drawerOpen}
                onClose={(): void => setDrawerOpen(!drawerOpen)}
                classes={{ paper: classes.drawer }}
                anchor={isRTL() ? 'right' : 'left'}
            >
                <div className={classes.flexVert} style={{ height: '100%', width: '100%' }}>
                    <div dir={getDirection()} className={clsx(classes.flexVertBottom, classes.header)}>
                        <BoltIcon style={{ fontSize: '64px', transform: 'rotate(42deg)' }} />
                        <div style={{ padding: theme.spacing(0.5) }}>
                            <Typography variant="h5" color="inherit">
                                PX {t('BLUE')}
                            </Typography>
                            <Typography variant="subtitle1" color="inherit">
                                {t('I18N')}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <List dir={getDirection()} disablePadding>
                            {Object.keys(menuItems).map((menuItem, index) => (
                                <ListItem
                                    button
                                    className={clsx(classes.listItem)}
                                    key={menuItem}
                                    onClick={(): void => setDrawerOpen(!drawerOpen)}
                                    style={isRTL() ? { textAlign: 'right' } : undefined}
                                >
                                    <ListItemIcon>
                                        <div className={clsx(isRTL() && classes.RTL)}>{iconArray[index]}</div>
                                    </ListItemIcon>
                                    <ListItemText primary={t(`MENU_ITEMS.${menuItem}`)} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </Drawer>
        );
    };

    return (
        <div dir={getDirection()} style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position="sticky">
                {getDrawer()}
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={isRTL() ? 'end' : 'start'}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit">
                        {t('I18N')}
                    </Typography>
                    <Spacer />
                    <Tooltip title={t('VIEW_I18N_SIDE_NAV') || ''}>
                        <IconButton
                            color="inherit"
                            onClick={(): void => setDrawerOpen(!drawerOpen)}
                            edge={isRTL() ? 'start' : 'end'}
                            className={clsx(isRTL() && classes.RTL)}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Toolbar color="#fff">
                <Select
                    value={lang}
                    onChange={(event): void => changeLanguage(String(event.target.value))}
                    style={{ padding: theme.spacing(0.5), minWidth: theme.spacing(20), marginLeft: theme.spacing(0.5) }}
                >
                    <MenuItem value={'en'}>{t('LANGUAGES.ENGLISH')}</MenuItem>
                    <MenuItem value={'es'}>{t('LANGUAGES.SPANISH')}</MenuItem>
                    <MenuItem value={'de'}>{t('LANGUAGES.GERMAN')}</MenuItem>
                    <MenuItem value={'ar'}>{t('LANGUAGES.ARABIC')}</MenuItem>
                    <MenuItem value={'fr'}>{t('LANGUAGES.FRENCH')}</MenuItem>
                    <MenuItem value={'pt'}>{t('LANGUAGES.PORTUGUESE')}</MenuItem>
                    <MenuItem value={'zh'}>{t('LANGUAGES.CHINESE')}</MenuItem>
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: theme.spacing(2) }}
                    classes={isRTL() ? { startIcon: classes.RTLButtonStartIcon } : undefined}
                    startIcon={<CartIcon className={clsx(classes.icon, isRTL() && classes.RTL)} />}
                >
                    <Typography noWrap color="inherit">
                        {t('ADD_TO_CART')}
                    </Typography>
                </Button>
            </Toolbar>

            <List id={'item-list'}>
                {Object.keys(fruits).map((fruit, index) => (
                    <InfoListItem
                        key={index}
                        onClick={(): void => selectFruit(fruit)}
                        ripple={true}
                        style={{ textAlign: isRTL() ? 'right' : 'left' }}
                        title={t(`FRUITS.${fruit}`)}
                        subtitle={t('MORE_INFO')}
                        icon={<Checkbox checked={selectedItems.has(fruit)} onChange={(): void => selectFruit(fruit)} />}
                        rightComponent={<ArrowForwardIosIcon className={clsx(classes.icon, isRTL() && classes.RTL)} />}
                    />
                ))}
            </List>

            <Snackbar
                open={selectedItems.size > 0}
                action={
                    <>
                        <Tooltip title={t('DESELECT_ALL') || ''}>
                            <IconButton
                                onClick={(): void => {
                                    setSelectedItems(new Set());
                                }}
                                color={'inherit'}
                                id="deselect-all-button"
                                data-cy="snackbar-deselect-all"
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
                className={isRTL() ? 'RTL' : ''}
                classes={{ root: classes.snackbar }}
                message={`${selectedItems.size} ${t('ITEMS')}`}
            />
        </div>
    );
};