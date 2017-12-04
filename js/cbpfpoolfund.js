(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
    // Create a promise to get our Standard Connections List from a JSON file. This increases code readability since we
    // no longer need to define the lengthy object within our javascript itself.
    var standardConnections = new Promise(function(resolve, reject) {
    loadJSON("StandardConnectionsData", function(json) {
      var obj = JSON.parse(json);
      var connectionList = [];
      for (var connection in obj.connections) {
        connectionList.push(obj.connections[connection]);
      }
      resolve(connectionList);
    }, true);
    });
    // Create a promise to get our table schema info as well, just like above
    var tables = new Promise(function(resolve, reject) {
      loadJSON("StandardConnectionsTableInfoData", function(json) {
        var obj = JSON.parse(json);
        var tableList = [];
        for (var table in obj.tables) {
          tableList.push(obj.tables[table]);
        }
        resolve(tableList);
      }, true);
    });
    // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
    Promise.all([tables, standardConnections]).then(function(data) {
      schemaCallback(data[0], data[1]);
    });
  }

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
