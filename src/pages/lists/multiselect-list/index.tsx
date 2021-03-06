import React, { useState, useCallback } from 'react';
import {
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    Typography,
    List,
    Checkbox,
    IconButton,
    Hidden,
    Theme,
    useTheme,
    Snackbar,
    Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { TOGGLE_DRAWER } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { DRAWER_WIDTH } from '../../../assets/constants';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { EmptyState } from './EmptyState';

export type ListItemType = {
    id: number;
    name: string;
    details: string;
    checked: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackbar: {
            [theme.breakpoints.up('md')]: {
                left: `calc((100vw - ${DRAWER_WIDTH}px)/2 + ${DRAWER_WIDTH}px);`,
            },
        },
        emptyStateContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
        },
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
    })
);

const createItem = (index: number, randomStatus: string): ListItemType => ({
    id: index,
    name: `Item ${index}`,
    details: `Status: ${randomStatus}`,
    checked: false,
});

const createRandomItem = (): ListItemType => {
    const int = parseInt(`${Math.random() * 100}`, 10);
    const randomStatus = Math.random() >= 0.3 ? 'normal' : 'alarm';
    return createItem(int, randomStatus);
};

const generatedList: ListItemType[] = [];

for (let i = 0; i < 10; i++) {
    generatedList.push(createRandomItem());
}

export const MultiselectList = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [list, setList] = useState<ListItemType[]>(generatedList);
    const [selectedItems, setSelectedItems] = useState<ListItemType[]>([]);

    const onSelect = useCallback(
        (item: ListItemType): void => {
            if (!selectedItems.includes(item)) {
                setSelectedItems([...selectedItems, item]);
            } else {
                const index = selectedItems.indexOf(item);
                setSelectedItems(selectedItems.filter((_: ListItemType, i: number) => i !== index));
            }
        },
        [selectedItems, setSelectedItems]
    );

    const isSelected = useCallback((item: ListItemType): boolean => selectedItems.includes(item), [selectedItems]);

    const onAddItem = useCallback((): void => {
        setList([...list, createRandomItem()]);
    }, [list, setList]);

    const onDelete = useCallback((): void => {
        const updatedList = [...list];

        selectedItems.forEach((item: ListItemType) => {
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
        });

        setList(updatedList);
        setSelectedItems([]);
    }, [list, selectedItems, setList, setSelectedItems]);

    const onCancel = useCallback((): void => {
        list.forEach((item: ListItemType): void => {
            item.checked = false;
        });
        setSelectedItems([]);
    }, [list, setSelectedItems]);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar position={'sticky'} classes={{ root: classes.appbarRoot }}>
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
                    <Typography variant={'h6'} data-cy={'pxb-toolbar'} color={'inherit'}>
                        Multiselect List
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Add an item'}>
                        <IconButton
                            edge={'end'}
                            id={'add-item-button'}
                            data-cy={'toolbar-add'}
                            color={'inherit'}
                            aria-label={'add'}
                            onClick={onAddItem}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {list.length < 1 && <EmptyState onAddItem={onAddItem} />}
            <List data-cy={'list-content'} className={'list'}>
                {list.map((item, index) => (
                    <InfoListItem
                        key={`listItem_${index}`}
                        icon={
                            <Checkbox
                                className={'checkbox'}
                                value={item.name}
                                onChange={(): void => onSelect(item)}
                                checked={isSelected(item)}
                            />
                        }
                        title={item.name}
                        subtitle={item.details}
                        chevron
                    >
                        {' '}
                    </InfoListItem>
                ))}
            </List>
            <Snackbar
                data-cy="snack-bar"
                action={
                    <>
                        <Tooltip title={'Delete selected'}>
                            <IconButton
                                id={'remove-items-button'}
                                onClick={onDelete}
                                data-cy={'snackbar-delete'}
                                color={'inherit'}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Cancel'}>
                            <IconButton
                                id={'cancel-button'}
                                onClick={onCancel}
                                data-cy={'snackbar-cancel'}
                                color={'inherit'}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
                message={`${selectedItems.length} selected item${selectedItems.length > 1 ? 's' : ''}`}
                open={selectedItems.length > 0}
                classes={{ root: classes.snackbar }}
            />
        </div>
    );
};
