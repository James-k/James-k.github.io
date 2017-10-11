(function() {

    // Create the connector object
    var myConnector = tableau.makeConnector();

      // Init function for connector, called during every phase
    myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;
        initCallback();
    }
    
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "fundingTotal",
            alias: "fundingTotal",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            alias: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "date",
            alias: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "amountUSD",
            alias: "amountUSD",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "originalCurrency",
            alias: "originalCurrency",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "budgetYear",
            alias: "budgetYear",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "FTS",
            alias: "FTS API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.hpc.tools/v1/public/fts/flow?planid=500", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "fundingTotal": val[i].fundingTotal,
                    "id": val[i].id,
                    "description": val[i].description,
                    "status": val[i].status,
                    "date": val[i].date,
                    "amountUSD": val[i].amountUSD,
                    "originalCurrency": val[i].originalCurrency,
                    "budgetYear": val[i].budgetYear,
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
            tableau.connectionName = "FTS API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
