export const PAGES: Routes = {
    ACCOUNT_MENU: {
        title: 'Account Menu',
        IN_AN_APP_BAR: {
            title: 'In an App Bar',
            route: 'in-an-app-bar',
        },
        // IN_A_DRAWER: {
        //     title: 'In a Drawer',
        //     route: 'in-a-drawer',
        // },
    },
    APP_BAR: {
        title: 'App Bar',
        COLLAPSIBLE: {
            title: 'Collapsible',
            route: 'collapsible',
        },
        SEARCH: {
            title: 'Search',
            route: 'search',
        },
    },
    FORM_VALIDATION: {
        title: 'Form Validation',
        route: 'form-validation',
    },
    I18N: {
        title: 'Internationalization',
        route: 'i18n',
    },
    LISTS: {
        title: 'Lists',
        ACTION_LIST: {
            title: 'Action List',
            route: 'action-list',
        },
        DATA_LIST: {
            title: 'Data List',
            route: 'data-list',
        },
        MULTISELECT_LIST: {
            title: 'Multiselect List',
            route: 'multiselect-list',
        },
        SORTABLE_LIST: {
            title: 'Sortable List',
            route: 'sortable-list',
        },
        STATUS_LIST: {
            title: 'Status List',
            route: 'status-list',
        },
        RESPONSIVE_TABLE: {
            title: 'Responsive Table',
            route: 'responsive-table',
        },
    },
    LOADING: {
        title: 'Loading States',
        route: 'loading-states',
    },
    LOADING_WAITING_STATES: {
        title: 'Loading & Waiting',
        PROGRESS_BAR: {
            title: 'Progress Bars',
            route: 'progress-bar',
        },
        PROGRESS_BAR_INDETERMINATE: {
            title: 'Progress Bars (Indet.)',
            route: 'progress-bar-indeterminate',
        },
        CONTEXTUAL_SPINNER: {
            title: 'Contextual Spinner',
            route: 'contextual-spinner',
        },
        SKELETONS: {
            title: 'Skeletons',
            route: 'skeletons',
        },
        SPINNER_OVERLAYS: {
            title: 'Spinner Overlays',
            route: 'spinner-overlays',
        },
    },
    OVERLAYS: {
        title: 'Overlays',
        // DIALOG: {
        //     title: 'Dialog',
        //     route: 'dialog',
        // },
        BASIC_BOTTOM_SHEET: {
            title: 'Basic Bottom Sheet',
            route: 'basic-bottom-sheet',
        },
        COMPLEX_BOTTOM_SHEET: {
            title: 'Complex Bottom Sheet',
            route: 'complex-bottom-sheet',
        },
    },
    DYNAMIC_STEPPER: {
        title: 'Dynamic Stepper',
        route: 'dynamic-stepper',
    },
    // VISUALIZATIONS: {
    //     title: 'Visualizations',
    //     CHARTJS: {
    //         title: 'ChartJS',
    //         route: 'chartjs',
    //     },
    //     MAPBOX: {
    //         title: 'MapBox',
    //         route: 'mapbox',
    //     },
    //     HIGHCHARTS: {
    //         title: 'Highcharts',
    //         route: 'highcharts',
    //     },
    // },
};

export type RouteMetaData = {
    title: string;
    route?: string;
};

export type Routes = {
    ACCOUNT_MENU: RouteMetaData & {
        IN_AN_APP_BAR: RouteMetaData;
        // IN_A_DRAWER: RouteMetaData;
    };
    APP_BAR: RouteMetaData & {
        COLLAPSIBLE: RouteMetaData;
        SEARCH: RouteMetaData;
    };
    FORM_VALIDATION: RouteMetaData;
    I18N: RouteMetaData;
    LISTS: RouteMetaData & {
        ACTION_LIST: RouteMetaData;
        DATA_LIST: RouteMetaData;
        MULTISELECT_LIST: RouteMetaData;
        SORTABLE_LIST: RouteMetaData;
        STATUS_LIST: RouteMetaData;
        RESPONSIVE_TABLE: RouteMetaData;
    };
    LOADING: RouteMetaData;
    LOADING_WAITING_STATES: RouteMetaData & {
        PROGRESS_BAR: RouteMetaData;
        PROGRESS_BAR_INDETERMINATE: RouteMetaData;
        CONTEXTUAL_SPINNER: RouteMetaData;
        SKELETONS: RouteMetaData;
        SPINNER_OVERLAYS: RouteMetaData;
    };
    OVERLAYS: RouteMetaData & {
        // DIALOG: RouteMetaData;
        BASIC_BOTTOM_SHEET: RouteMetaData;
        COMPLEX_BOTTOM_SHEET: RouteMetaData;
    };
    DYNAMIC_STEPPER: RouteMetaData;
    // VISUALIZATIONS: RouteMetaData & {
    //     HIGHCHARTS: RouteMetaData;
    //     CHARTJS: RouteMetaData;
    //     MAPBOX: RouteMetaData;
    // };
};
