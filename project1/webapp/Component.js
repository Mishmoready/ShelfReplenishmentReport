sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project1/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var oModel = new JSONModel({layout: "OneColumn"});
                this.setModel(oModel, "appViewModel");
                

                var oProductsModel = new JSONModel();
                oProductsModel.loadData('/mockdata/products.json');
                oProductsModel.setSizeLimit(1000);
                this.setModel(oProductsModel, 'products');
            }
        });
    }
);