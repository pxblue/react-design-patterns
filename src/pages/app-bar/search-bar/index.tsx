import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material Icons
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';

// Handles Drawer
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

// Other
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { listItems as presidents, President } from './list';
import { EmptyState, InfoListItem, Spacer } from '@pxblue/react-components';
import { DRAWER_WIDTH } from '../../../assets/constants';
import clsx from 'clsx';

const reversedPresidentList = presidents.reverse();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbar: {
            transition: theme.transitions.create('all', { duration: theme.transitions.duration.short }),
        },
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
        regularBar: {
            opacity: 1,
            '&$searchActive': {
                opacity: 0,
            },
        },
        searchbar: {
            background: theme.palette.background.paper,
            right: 0,
            width: 0,
            '& ::-ms-clear': {
                width: 0,
                height: 0,
            },
            '&$searchActive': {
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
            },
        },
        searchActive: {},
        searchfield: {
            flex: 1,
        },
    })
);

export const searchResults = (searchString: string): President[] => {
    const q = searchString.toLowerCase().trim();
    return reversedPresidentList.filter((item: President): boolean => {
        if (item.president.toLowerCase().trim().includes(q)) {
            return true;
        }
        if (item.party.toLowerCase().trim().includes(q)) {
            return true;
        }
        if (item.tookOffice.toLowerCase().trim().includes(q)) {
            return true;
        }
        return false;
    });
};

export const SearchBar = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    const [list, setList] = useState(reversedPresidentList);
    const [searchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (searchActive) {
            if (query === '') {
                setList(reversedPresidentList);
            } else {
                setList(searchResults(query));
            }
        }
    }, [query, searchActive]);

    useEffect(() => {
        if (!searchActive) {
            setQuery('');
            setList(reversedPresidentList);
        }
    }, [searchActive]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            {/* The Regular App Bar */}
            <AppBar
                data-cy="pxb-toolbar"
                position={'sticky'}
                classes={{ root: classes.appbarRoot }}
                className={clsx(classes.appbar, classes.regularBar, searchActive && classes.searchActive)}
            >
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
                        Search Bar
                    </Typography>
                    <Spacer />
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => setSearchActive(true)}
                        edge={'end'}
                        data-cy="search-btn"
                    >
                        <Search />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Search Bar */}
            <AppBar
                data-cy="searchfield"
                className={clsx(classes.appbar, classes.searchbar, searchActive && classes.searchActive)}
                position={'fixed'}
                color={'default'}
            >
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <IconButton color={'inherit'} edge={'start'} disabled>
                        <Search />
                    </IconButton>
                    {searchActive && ( // this is to enable auto focus on mounting
                        <TextField
                            className={classes.searchfield}
                            value={query}
                            placeholder={'Search'}
                            onChange={(evt): void => setQuery(evt.target.value)}
                            InputProps={{ disableUnderline: true }}
                            autoFocus
                        />
                    )}
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => setSearchActive(false)}
                        edge={'end'}
                        data-cy="search-close-btn"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* List */}
            <List data-cy="list-view">
                {list.map((item, index) => (
                    <InfoListItem
                        avatar
                        key={index}
                        icon={<Person />}
                        title={item.president}
                        subtitle={item.party}
                        info={item.tookOffice}
                        statusColor={'transparent'}
                        iconColor={theme.palette.text.primary}
                    />
                ))}
            </List>
            {list.length < 1 && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: `calc(100vh - ${theme.spacing(8)}px)`,
                    }}
                >
                    <EmptyState
                        icon={<Error fontSize={'inherit'} />}
                        title={'0 results'}
                        description={'No matching presidents'}
                    />
                </div>
            )}
        </div>
    );
};
