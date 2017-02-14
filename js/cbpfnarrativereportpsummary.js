(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "PooledFundName", alias: "PooledFundName", dataType: tableau.dataTypeEnum.string }, 
            { id: "PooledfundId", alias: "PooledfundId", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationTypeId", alias: "AllocationTypeId", dataType: tableau.dataTypeEnum.string }, 
            { id: "ChfId", alias: "ChfId", dataType: tableau.dataTypeEnum.string },
            { id: "ChfProjectCode", alias: "ChfProjectCode", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationYear", alias: "AllocationYear", dataType: tableau.dataTypeEnum.int }, 
            { id: "AllocationSourceId", alias: "AllocationSourceId", dataType: tableau.dataTypeEnum.string },         
            { id: "ReportId", alias: "ReportId", dataType: tableau.dataTypeEnum.string },
            { id: "ReportType", alias: "ReportType", dataType: tableau.dataTypeEnum.string },
            { id: "ReportName", alias: "ReportName", dataType: tableau.dataTypeEnum.string }, 
            { id: "ActiveDate", alias: "ActiveDate", dataType: tableau.dataTypeEnum.datetime }, 
            { id: "DueDate", alias: "DueDate", dataType: tableau.dataTypeEnum.string }, 
            { id: "ReportStatus", alias: "ReportStatus", dataType: tableau.dataTypeEnum.string }, 
            { id: "ReportEndDate", alias: "ReportEndDate", dataType: tableau.dataTypeEnum.datetime },
            { id: "OverallProjectImplementationProgress", alias: "OverallProjectImplementationProgress", dataType: tableau.dataTypeEnum.string }, 
            { id: "ConclusionsAndLessonsLearnedComments", alias: "ConclusionsAndLessonsLearnedComments", dataType: tableau.dataTypeEnum.string }, 
            { id: "PlannedBeneficiariesMen", alias: "PlannedBeneficiariesMen", dataType: tableau.dataTypeEnum.float },
            { id: "PlannedBeneficiariesWomen", alias: "PlannedBeneficiariesWomen", dataType: tableau.dataTypeEnum.float }, 
            { id: "PlannedBeneficiariesBoys", alias: "PlannedBeneficiariesBoys", dataType: tableau.dataTypeEnum.float }, 
            { id: "PlannedBeneficiariesGirls", alias: "PlannedBeneficiariesGirls", dataType: tableau.dataTypeEnum.float }, 
            { id: "PlannedBeneficiariesTotal", alias: "PlannedBeneficiariesTotal", dataType: tableau.dataTypeEnum.float },
            { id: "ActualBeneficiariesMen", alias: "ActualBeneficiariesMen", dataType: tableau.dataTypeEnum.float },
            { id: "ActualBeneficiariesWomen", alias: "ActualBeneficiariesWomen", dataType: tableau.dataTypeEnum.float }, 
            { id: "ActualBeneficiariesBoys", alias: "ActualBeneficiariesBoys", dataType: tableau.dataTypeEnum.float },
            { id: "ActualBeneficiariesGirls", alias: "ActualBeneficiariesGirls", dataType: tableau.dataTypeEnum.float }, 
            { id: "ActualBeneficiariesTotal", alias: "ActualBeneficiariesTotal", dataType: tableau.dataTypeEnum.float }, 
            { id: "TotalFundsReceived", alias: "TotalFundsReceived", dataType: tableau.dataTypeEnum.float },
            { id: "EstimatedProjectExpenditure", alias: "EstimatedProjectExpenditure", dataType: tableau.dataTypeEnum.string },
            { id: "FundUtilizationBalanceAmount", alias: "FundUtilizationBalanceAmount", dataType: tableau.dataTypeEnum.string }, 
            { id: "FundUtilizationComments", alias: "FundUtilizationComments", dataType: tableau.dataTypeEnum.string } 
        ];

        var tableSchema = {
            id: "CBPFNarrativeReportSummary",
            alias: "CBPF Narrative Report Summary API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/NarrativeReportSummary", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "PooledFundName": val[i].PooledFundName,
                    "PooledfundId": val[i].PooledfundId,
                    "AllocationTypeId": val[i].AllocationTypeId,
                    "ChfId": val[i].ChfId,
                    "ChfProjectCode": val[i].ChfProjectCode,
                    "AllocationYear": val[i].AllocationYear,
                    "AllocationSourceId": val[i].AllocationSourceId,
                    "ReportId": val[i].ReportId,
                    "ReportType": val[i].ReportType,
                    "ReportName": val[i].ReportName,
                    "ActiveDate": val[i].ActiveDate,
                    "DueDate": val[i].DueDate,
                    "ReportStatus": val[i].ReportStatus,
                    "ReportEndDate": val[i].ReportEndDate,
                    "OverallProjectImplementationProgress": val[i].OverallProjectImplementationProgress,
                    "ConclusionsAndLessonsLearnedComments": val[i].ConclusionsAndLessonsLearnedComments,
                    "PlannedBeneficiariesMen": val[i].PlannedBeneficiariesMen,
                    "PlannedBeneficiariesWomen": val[i].PlannedBeneficiariesWomen,
                    "PlannedBeneficiariesBoys": val[i].PlannedBeneficiariesBoys,
                    "PlannedBeneficiariesGirls": val[i].PlannedBeneficiariesGirls,
                    "PlannedBeneficiariesTotal": val[i].PlannedBeneficiariesTotal,
                    "ActualBeneficiariesMen": val[i].ActualBeneficiariesMen,
                    "ActualBeneficiariesWomen": val[i].ActualBeneficiariesWomen,
                    "ActualBeneficiariesBoys": val[i].ActualBeneficiariesBoys,
                    "ActualBeneficiariesGirls": val[i].ActualBeneficiariesGirls,
                    "ActualBeneficiariesTotal": val[i].ActualBeneficiariesTotal,
                    "TotalFundsReceived": val[i].TotalFundsReceived,
                    "EstimatedProjectExpenditure": val[i].EstimatedProjectExpenditure,
                    "FundUtilizationBalanceAmount": val[i].FundUtilizationBalanceAmount,
                    "FundUtilizationComments": val[i].FundUtilizationComments,
                    
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
            tableau.connectionName = "CBPF Narrative Report Summary API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
