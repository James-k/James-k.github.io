(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "PooledFundName",
            alias: "PooledFundName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PooledFundId",
            alias: "PooledFundId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "AllocationTypeId",
            alias: "AllocationTypeId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "AllocationYear",
            alias: "AllocationYear",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "AllocationSourceName",
            alias: "AllocationSourceName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ChfId",
            alias: "ChfId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ChfProjectCode",
            alias: "ChfProjectCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Location",
            alias: "Location",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ActivityName",
            alias: "ActivityName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Percentage",
            alias: "Percentage",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Men",
            alias: "Men",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Women",
            alias: "Women",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Boys",
            alias: "Boys",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Girls",
            alias: "Gilrs",
            dataType: tableau.dataTypeEnum.float
          }, {
            id: "Percentage",
            alias: "Percentage",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "LocationAdminLevelLatitude",
            alias: "LocationAdminLevelLatitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "LocationAdminLevelLongitude",
            alias: "LocationAdminLevelLongitude",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "AdminLocation1TypeName",
            alias: "AdminLocation1TypeName",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "AdminLocation1",
            alias: "AdminLocation1",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "AdminLocation1PCode",
            alias: "AdminLocation1PCode",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "CBPFLocation",
            alias: "CBPF Location API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/Location", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "PooledFundName": val[i].PooledFundName,
                    "PooledFundId": val[i].PooledFundId,
                    "AllocationTypeId": val[i].AllocationTypeId,
                    "AllocationYear": val[i].AllocationYear,
                    "AllocationSourceName": val[i].AllocationSourceName,
                    "ChfId": val[i].ChfId,
                    "ChfProjectCode": val[i].ChfProjectCode,
                    "Location": val[i].Location,
                    "ActivityName": val[i].ActivityName,
                    "Men": val[i].Men,
                    "Women": val[i].Women,
                    "Boys": val[i].Boys,
                    "Girls": val[i].Girls,
                    "Percentage": val[i].Percentage,
                    "LocationAdminLevelLatitude": val[i].LocationAdminLevelLatitude,
                    "LocationAdminLevelLongitude": val[i].LocationAdminLevelLongitude,
                    "AdminLocation1TypeName": val[i].AdminLocation1TypeName,
                    "AdminLocation1": val[i].AdminLocation1,
                    "AdminLevel1PCode": val[i].AdminLevel1PCode,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "CBPF Location API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
