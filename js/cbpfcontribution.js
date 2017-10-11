(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "PooledFundId",
            alias: "PooledFundId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PooledFundName",
            alias: "PoolFundName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PooledFundCodeAbbrv",
            alias: "PoolFundCodeAbbrv",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ContributionCode",
            alias: "ContributionCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "FiscalYear",
            alias: "FiscalYear",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DonorName",
            alias: "DonorName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DonorCode",
            alias: "DonorCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "GMSDonorID",
            alias: "GMSDonorID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "GMSDonorName",
            alias: "GMSDonorName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "CountryCode",
            alias: "CountryCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PledgeDate",
            alias: "PledgeDate",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "PledgeAmt",
            alias: "PledgeAmt",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "PipeLineDate",
            alias: "PipeLineDate",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "PaidDate",
            alias: "PaidDate",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "PaidAmt",
            alias: "PaidAmt",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "ExpectedDate",
            alias: "ExpectedDate",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "PledgeAmtLocalCurrency",
            alias: "PledgeAmtLocalCurrency",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "PledgeAmtCurrencyExchangeRate",
            alias: "PledgeAmtCurrencyExchangeRate",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "PaidAmtLocalCurrency",
            alias: "PaidAmtLocalCurrency",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "PaidAmtCurrencyExchangeRate",
            alias: "PaidAmtCurrencyExchangeRate",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "CBPFContribution",
            alias: "CBPF Contribution API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/Contribution", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "PooledFundId": val[i].PooledFundId,
                    "PooledFundName": val[i].PooledFundName,
                    "PooledFundCodeAbbrv": val[i].PooledFundCodeAbbrv,
                    "ContributionCode": val[i].ContributionCode,
                    "FiscalYear": val[i].FiscalYear,
                    "DonorName": val[i].DonorName,
                    "DonorCode": val[i].DonorCode,
                    "GMSDonorID": val[i].GMSDonorID,
                    "GMSDonorName": val[i].GMSDonorName,
                    "CountryCode": val[i].CountryCode,
                    "PledgeDate": val[i].PledgeDate,
                    "PledgeAmt": val[i].PledgeAmt,
                    "PipeLineDate": val[i].PipeLineDate,
                    "PaidDate": val[i].PaidDate,
                    "PaidAmt": val[i].PaidAmt,
                    "ExpectedDate": val[i].ExpectedDate,
                    "PledgeAmtLocalCurrency": val[i].PledgeAmtLocalCurrency,
                    "PledgeAmtCurrencyExchangeRate": val[i].PledgeAmtCurrencyExchangeRate,
                    "PaidAmtLocalCurrency": val[i].PaidAmtLocalCurrency,
                    "PaidAmtCurrencyExchangeRate": val[i].PaidAmtCurrencyExchangeRate,

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
            tableau.connectionName = "CBPF Contribution API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
    // Init function for connector, called during every phase
    myConnector.init = function(initCallback) {
      tableau.authType = tableau.authTypeEnum.basic;
      initCallback();
    }
})();
