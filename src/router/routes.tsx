export const PAGES: Routes = {
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
    LOADING_WAITING_STATES: {
        title: 'Loading & Waiting',
        SPINNER_OVERLAYS: {
            title: 'Spinner Overlays',
            route: 'spinner-overlays',
        },
        CONTEXTUAL_SPINNER: {
            title: 'Contextual Spinner',
            route: 'contextual-spinner',
        },
        SKELETONS: {
            title: 'Skeletons',
            route: 'skeletons',
        },
        PROGRESS_BAR: {
            title: 'Progress Bars',
            route: 'progress-bar',
        },
        PROGRESS_BAR_INDETERMINATE: {
            title: 'Progress Bars (Indet.)',
            route: 'progress-bar-indeterminate',
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
