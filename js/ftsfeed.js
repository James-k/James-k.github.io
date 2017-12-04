(function() {

    // Create the connector object
    var myConnector = tableau.makeConnector();

<<<<<<< HEAD
      // Init function for connector, called during every phase
    myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;
        initCallback();
    }
    


    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "name",
            alias: "name",
=======
  // Init function for connector, called during every phase but
  // only called when running inside the simulator or tableau
  myConnector.init = function(initCallback) {
      tableau.authType = tableau.authTypeEnum.basic;

   
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "fundingTotal",
            alias: "fundingTotal",
>>>>>>> origin/master
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
<<<<<<< HEAD
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startDate",
            alias: "startDate",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "endDate",
            alias: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "category",
            alias: "category",
            dataType: tableau.dataTypeEnum.float  
        }, {
            id: "year",
            alias: "year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "revisedRequirements",
            alias: "revisedRequirements",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "locations",
            alias: "locations",
=======
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
>>>>>>> origin/master
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
<<<<<<< HEAD
                    "id": val[i].fundingTotal,
                    "name": val[i].id,
                    "code": val[i].description,
                    "startDate": val[i].status,
                    "endDate": val[i].date,
                    "emergencies": val[i].amountUSD,
                    "years": val[i].originalCurrency,
                    "locations": val[i].budgetYear,
                    "categories": val[i].amountUSD,
                    "revisedRequirements": val[i].originalCurrency,
=======
                    "fundingTotal": val[i].fundingTotal,
                    "id": val[i].id,
                    "description": val[i].description,
                    "status": val[i].status,
                    "date": val[i].date,
                    "amountUSD": val[i].amountUSD,
                    "originalCurrency": val[i].originalCurrency,
                    "budgetYear": val[i].budgetYear,
>>>>>>> origin/master
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
<<<<<<< HEAD
})();
=======
          // Init function for connector, called during every phase
    myConnector.init = function(initCallback) {

        tableau.authType = tableau.authTypeEnum.custom;
        

    }
}();
>>>>>>> origin/master
