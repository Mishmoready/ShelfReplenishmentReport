sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("project1.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onRoutePatternMatched, this);
		},

		_onRoutePatternMatched: function (oEvent) {

			var oArgs = oEvent.getParameter("arguments");
			var sPath = oArgs.Path;
		


			this.getView().bindElement({
				path: "/ProductCollection/" + sPath,
				model: "products"
			});

			var oAppViewModel = this.getOwnerComponent().getModel("appViewModel");
			oAppViewModel.setProperty("/layout", "TwoColumnsMidExpanded")


		},

		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this.getView().bindElement({
				path: "/ProductCollection/" + this._product,
				model: "products"
			});
		},

		onEditToggleButtonPress: function () {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("List").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("D").detachPatternMatched(this._onProductMatched, this);
		},

		handleClose: function () {
				var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
				this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		}

	});
});
