sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
      "use strict";
  
      return Controller.extend("project1.controller.View1", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter.getRoute("RouteView1").attachPatternMatched(this._attachRoutePatternMatched, this);
        },



        _attachRoutePatternMatched: function(){
          var oAppViewModel = this.getOwnerComponent().getModel("appViewModel");
          oAppViewModel.setProperty("/layout", "OneColumn")
        },

        navToNextPage: function () {
          this.oRouter.navTo("RouteList");
        },

        onGapsByDepAction: function(oEvent){
          oEvent.preventDefault();
          var sDepartment = oEvent.getParameter("parameters").department;
          var oArguments = {
            Path: sDepartment
          }
          this.oRouter.navTo("RouteList", oArguments);
        }
      });
    }
  );
  