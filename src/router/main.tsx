import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Different App Pages/Routes
import { LandingPage } from '../pages/LandingPage';
import { PAGES } from './routes';
import { SearchBar } from '../pages/app-bar/search-bar';
import { CollapsibleAppBar } from '../pages/app-bar/collapsible-app-bar';
import { LoadingStates } from '../pages/loading-states';
import { I18N } from '../pages/i18n';
import { FormValidation } from '../pages/form-validation';
import { ActionList } from '../pages/lists/action-list';
import { DataList } from '../pages/lists/data-list';
import { MultiselectList } from '../pages/lists/multiselect-list';
import { StatusList } from '../pages/lists/status-list';
import { SortableList } from '../pages/lists/sortable-list';
import { ResponsiveTable } from '../pages/lists/responsive-table';
import { BasicBottomSheet } from '../pages/overlays/basic-bottom-sheet';
import { ComplexBottomSheet } from '../pages/overlays/complex-bottom-sheet';
import { DynamicStepper } from '../pages/steppers/dynamic-stepper';
/*
The main page body, which contains the route definitions
*/
export const Main = (): JSX.Element => (
    <Switch>
        <Route exact path={'/'} component={LandingPage} />

        <Route exact path={`/${PAGES.APP_BAR.SEARCH.route}`} component={SearchBar} />
        <Route exact path={`/${PAGES.APP_BAR.COLLAPSIBLE.route}`} component={CollapsibleAppBar} />

        <Route exact path={`/${PAGES.EMPTY_STATES.LOADING.route}`} component={LoadingStates} />
        <Route exact path={`/${PAGES.FORM_VALIDATION.route}`} component={FormValidation} />
        <Route exact path={`/${PAGES.I18N.route}`} component={I18N} />

        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.route}`} component={ActionList} />
        <Route exact path={`/${PAGES.LISTS.DATA_LIST.route}`} component={DataList} />
        <Route exact path={`/${PAGES.LISTS.MULTISELECT_LIST.route}`} component={MultiselectList} />
        <Route exact path={`/${PAGES.LISTS.STATUS_LIST.route}`} component={StatusList} />
        <Route exact path={`/${PAGES.LISTS.SORTABLE_LIST.route}`} component={SortableList} />
        <Route exact path={`/${PAGES.LISTS.RESPONSIVE_TABLE.route}`} component={ResponsiveTable} />

        <Route exact path={`/${PAGES.OVERLAYS.BASIC_BOTTOM_SHEET.route}`} component={BasicBottomSheet} />
        <Route exact path={`/${PAGES.OVERLAYS.COMPLEX_BOTTOM_SHEET.route}`} component={ComplexBottomSheet} />

        <Route exact path={`/${PAGES.STEPPERS.DYNAMIC.route}`} component={DynamicStepper} />
    </Switch>
);
