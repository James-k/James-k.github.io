(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "PooledFundName", alias: "PooledFundName", dataType: tableau.dataTypeEnum.string }, 
            { id: "PooledFundId", alias: "PooledFundId", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationTypeId", alias: "AllocationTypeId", dataType: tableau.dataTypeEnum.string }, 
            { id: "ChfId", alias: "ChfId", dataType: tableau.dataTypeEnum.string },
            { id: "ChfProjectCode", alias: "ChfProjectCode", dataType: tableau.dataTypeEnum.string },
            { id: "ExternalProjectCode", alias: "ExternalProjectCode", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationType", alias: "AllocationType", dataType: tableau.dataTypeEnum.string },
            { id: "AllocationYear", alias: "AllocationYear", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationSourceId", alias: "AllocationSourceId", dataType: tableau.dataTypeEnum.float }, 
            { id: "AllocationSourceName", alias: "AllocationSourceName", dataType: tableau.dataTypeEnum.float },
            { id: "OrganizationName", alias: "OrganizationName", dataType: tableau.dataTypeEnum.string },
            { id: "OrganizationType", alias: "OrganizationType", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProjectTitle", alias: "ProjectTitle", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProjectStartDate", alias: "ProjectStartDate", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProjectEndDate", alias: "ProjectEndDate", dataType: tableau.dataTypeEnum.float }, 
            { id: "ProjectDuration", alias: "ProjectDuration", dataType: tableau.dataTypeEnum.float },
            { id: "Budget", alias: "Budget", dataType: tableau.dataTypeEnum.string }, 
            { id: "TotalDirectCost", alias: "TotalDirectCost", dataType: tableau.dataTypeEnum.string }, 
            { id: "DateSubmitted", alias: "DateSubmitted", dataType: tableau.dataTypeEnum.datetime },
            { id: "Men", alias: "Men", dataType: tableau.dataTypeEnum.float },
            { id: "Women", alias: "Women", dataType: tableau.dataTypeEnum.string }, 
            { id: "Boys", alias: "Boys", dataType: tableau.dataTypeEnum.string }, 
            { id: "Girls", alias: "Girls", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProjectSummary", alias: "ProjectSummary", dataType: tableau.dataTypeEnum.string },
            { id: "IndirectBeneficiaries", alias: "IndirectBeneficiaries", dataType: tableau.dataTypeEnum.string },
            { id: "CatchmentPopulation", alias: "CatchmentPopulation", dataType: tableau.dataTypeEnum.string }, 
            { id: "AllocationStrategy", alias: "AllocationStrategy", dataType: tableau.dataTypeEnum.string },
            { id: "HumanitarianContext", alias: "HumanitarianContext", dataType: tableau.dataTypeEnum.string }, 
            { id: "GrantRequestJustification", alias: "GrantRequestJustification", dataType: tableau.dataTypeEnum.float }, 
            { id: "DescriptionOfBeneficiaries", alias: "DescriptionOfBeneficiaries", dataType: tableau.dataTypeEnum.float },
            { id: "NeedsAssessment", alias: "NeedsAssessment", dataType: tableau.dataTypeEnum.string },
            { id: "Activities", alias: "Activities", dataType: tableau.dataTypeEnum.string }, 
            { id: "ImplementationPlan", alias: "ImplementationPlan", dataType: tableau.dataTypeEnum.string }, 
            { id: "Monitoring_Eval", alias: "Monitoring_Eval", dataType: tableau.dataTypeEnum.string }, 
            { id: "CrossCuttingIssues", alias: "CrossCuttingIssues", dataType: tableau.dataTypeEnum.float }, 
            { id: "EnvironmentMarker", alias: "EnvironmentMarker", dataType: tableau.dataTypeEnum.float },
            { id: "GenderMarker", alias: "GenderMarker", dataType: tableau.dataTypeEnum.string }, 
            { id: "GenderTheme", alias: "GenderTheme", dataType: tableau.dataTypeEnum.string }, 
            { id: "FieldSecurity", alias: "FieldSecurity", dataType: tableau.dataTypeEnum.float },
            { id: "Access", alias: "Access", dataType: tableau.dataTypeEnum.float },
            { id: "ActualStartDate", alias: "ActualStartDate", dataType: tableau.dataTypeEnum.string }, 
            { id: "ActualEndDate", alias: "ActualEndDate", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProjectStatus", alias: "ProjectStatus", dataType: tableau.dataTypeEnum.float }, 
            { id: "ProjectStatusId", alias: "ProjectStatusId", dataType: tableau.dataTypeEnum.float },
            { id: "ProjectStatusCode", alias: "ProjectStatusCode", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProcessStatus", alias: "ProcessStatus", dataType: tableau.dataTypeEnum.string }, 
            { id: "ProcessStatusId", alias: "ProcessStatusId", dataType: tableau.dataTypeEnum.float },
            { id: "PartnerCode", alias: "PartnerCode", dataType: tableau.dataTypeEnum.float }
        ];

        var tableSchema = {
            id: "CBPFprojectsummary",
            alias: "CBPF ProjectSummary API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cbpfapi.unocha.org/vo1/odata/ProjectSummary", function(resp) {
            var val = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = val.length; i < len; i++) {
                tableData.push({
                    "PooledFundName": val[i].PooledFundName,
                    "PooledFundId": val[i].PooledFundId,
                    "AllocationTypeId": val[i].AllocationTypeId,
                    "ChfId": val[i].ChfId,
                    "ChfProjectCode": val[i].ChfProjectCode,
                    "ExternalProjectCode": val[i].ExternalProjectCode,
                    "AllocationType": val[i].AllocationType,
                    "AllocationYear": val[i].AllocationYear,
                    "AllocationSourceId": val[i].AllocationSourceId,
                    "AllocationSourceName": val[i].AllocationSourceName,
                    "OrganizationName": val[i].OrganizationName,
                    "OrganizationType": val[i].OrganizationType,
                    "ProjectTitle": val[i].ProjectTitle,
                    "ProjectStartDate": val[i].ProjectStartDate,
                    "ProjectEndDate": val[i].ProjectEndDate,
                    "ProjectDuration": val[i].ProjectDuration,
                    "Budget": val[i].Budget,
                    "TotalDirectCost": val[i].TotalDirectCost,
                    "TotalSupportCost": val[i].TotalSupportCost,
                    "DateSubmitted": val[i].DateSubmitted,
                    "Men": val[i].Men,
                    "Women": val[i].Women,
                    "Boys": val[i].Boys,
                    "Girls": val[i].Girls,
                    "ProjectSummary": val[i].ProjectSummary,
                    "IndirectBeneficiaries": val[i].IndirectBeneficiaries,
                    "CatchmentPopulation": val[i].CatchmentPopulation,
                    "AllocationStrategy": val[i].AllocationStrategy,
                    "HumanitarianContext": val[i].HumanitarianContext,
                    "GrantRequestJustification": val[i].GrantRequestJustification,
                    "DescriptionOfBeneficiaries": val[i].DescriptionOfBeneficiaries,
                    "NeedsAssessment": val[i].NeedsAssessment,
                    "Activities": val[i].Activities,
                    "ImplementationPlan": val[i].ImplementationPlan,
                    "Monitoring_Eval": val[i].Monitoring_Eval,
                    "CrossCuttingIssues": val[i].CrossCuttingIssues,
                    "EnvironmentMarker": val[i].EnvironmentMarker,
                    "GenderMarker": val[i].GenderMarker,
                    "GenderTheme": val[i].GenderTheme,
                    "FieldSecurity": val[i].FieldSecurity,
                    "Access": val[i].Access,
                    "ActualStartDate": val[i].ActualStartDate,
                    "ActualEndDate": val[i].ActualEndDate,
                    "ProjectStatus": val[i].ProjectStatus,
                    "ProjectStatusId": val[i].ProjectStatusId,
                    "ProjectStatusCode": val[i].ProjectStatusCode,
                    "ProcessStatus": val[i].ProcessStatus,
                    "ProcessStatusId": val[i].ProcessStatusId,
                    "PartnerCode": val[i].PartnerCode,
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
            tableau.connectionName = "CBPF Project Summary API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
