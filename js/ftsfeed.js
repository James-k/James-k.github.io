(function() {

    // Create the connector object
    var myConnector = tableau.makeConnector();

  // Init function for connector, called during every phase but
  // only called when running inside the simulator or tableau
  myConnector.init = function(initCallback) {
      tableau.authType = tableau.authTypeEnum.custom;

      // If we are in the auth phase we only want to show the UI needed for auth
      if (tableau.phase == tableau.phaseEnum.authPhase) {
        $("#getvenuesbutton").css('display', 'none');
      }

      if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
        // If API that WDC is using has an enpoint that checks
        // the validity of an access token, that could be used here.
        // Then the WDC can call tableau.abortForAuth if that access token
        // is invalid.
      }

      var accessToken = Cookies.get("accessToken");
      console.log("Access token is '" + accessToken + "'");
      var hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
      updateUIWithAuthState(hasAuth);

      initCallback();

      // If we are not in the data gathering phase, we want to store the token
      // This allows us to access the token in the data gathering phase
      if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
          if (hasAuth) {
              tableau.password = accessToken;

              if (tableau.phase == tableau.phaseEnum.authPhase) {
                // Auto-submit here if we are in the auth phase
                tableau.submit()
              }

              return;
          }
      }
  };

    
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
