(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Id",
            alias: "Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PoolfundName",
            alias: "PoolfundName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PoolfundCodeAbbrv",
            alias: "PoolfundCodeAbbrv",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Latitude",
            alias: "Latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Longitude",
            alias: "Longitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "CountryCode",
            alias: "CountryCode",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "CBPFPoolfund",
            alias: "CBPF Poolfund API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/Poolfund", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "Id": val[i].Id,
                    "PoolfundName": val[i].PoolfundName,
                    "PoolfundCodeAbbrv": val[i].PoolfundCodeAbbrv,
                    "Longitude": val[i].Longitude[0],
                    "Latitude": val[i].Latitude[1],
                    "CountryCode": val[i].CountryCode,
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
            tableau.connectionName = "CBPF Poolfund API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
