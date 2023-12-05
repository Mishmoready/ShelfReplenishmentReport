sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, UIComponent, JSONModel) {
	"use strict";

	return Controller.extend("project1.controller.List", {
		onInit: function () {
			// UIComponent.prototype.init.apply(this, arguments);

			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();

			var oModel,
				oProductsModel;

			// oModel = new JSONModel();
			// this.getView().setModel(oModel);
			
			// set products demo model on this sample
			// debugger;
			oProductsModel = new JSONModel();
			oProductsModel.loadData('/mockdata/products.json');
			oProductsModel.setSizeLimit(1000);
			this.getView().setModel(oProductsModel, 'products');
			// this.setModel(oProductsModel, 'products');

		},

		navToNextPage2: function () {
			this.oRouter.navTo("RouteDetail");
		},

		init: function () {
			// var oModel,
			// 	oProductsModel;


			// oModel = new JSONModel();
			// this.setModel(oModel);

			// // set products demo model on this sample
			// debugger;
			// oProductsModel = new JSONModel(('./mockdata/products.json'));
			// oProductsModel.setSizeLimit(1000);
			// this.setModel(oProductsModel, 'products');
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onListItemPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: product });
		},
	});
});
