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
            dataType: tableau.dataTypeEnum.string
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
            id: "Cluster",
            alias: "Cluster",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SubCluster",
            alias: "SubCluster",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Percentage",
            alias: "Percentage",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "ClusterBudget",
            alias: "ClusterBudget",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "CBPFCluster",
            alias: "CBPF Cluster API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/Cluster", function(resp) {
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
                    "Cluster": val[i].Cluster,
                    "SubCluster": val[i].SubCluster,
                    "Percentage": val[i].Percentage,
                    "ClusterBudget": val[i].ClusterBudget,
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
            tableau.connectionName = "CBPF Cluster API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
