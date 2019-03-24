//App
const ApiService = state => state.app.API;
const itemSelected = state => state.app.itemSelected;
const dataItemSaved = state => state.app.dataItemSaved;

const isLoading = state => state.app.isLoading;
const popupConfirm = state => state.app.popupConfirm;
const notifyData = state => state.app.notifyData;

//Listing data
const filterData = state => state.listing.filterData;
const isReloadTable = state => state.listing.isReloadTable;
const isResetFormFilter = state => state.listing.isResetFormFilter;
const onResetParams = state => state.listing.isResetParams;

// Menu
const menuItems = state => state.menu.items;

// Auth
const authUser = state => state.auth.authUser;
const authResult = state => state.auth.authResult;

const route = state => state.route;

export {
    // App
    ApiService,
    itemSelected,
    dataItemSaved,
    isLoading,
    popupConfirm,
    notifyData,
    //Listing
    filterData,
    isReloadTable,
    isResetFormFilter,
    onResetParams,
    // Menu
    menuItems,
    // Auth
    authUser,
    authResult,
    route
}