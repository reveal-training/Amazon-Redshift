var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();
app.use(cors()); 

const userContextProvider = (request) => {
  // this can be used to store values coming from the request, like user id, etc
  // use these property values to customize the data returned to the user
  const props = new Map();
  props.set("some-property", "some-value"); 
  return new reveal.RVUserContext("user identifier", props);
};

const authenticationProvider = async (userContext, dataSource) => {
    console.log("Enter Authentication Provider");
    if (dataSource instanceof reveal.RVRedshiftDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("YOUR USERNAME", "YOUR PASSWORD"); }
  }
  
  const dataSourceProvider = async (userContext, dataSource) => {  
     if (dataSource instanceof reveal.RVRedshiftDataSource) {

      // this is the data source that will be used to connect to the data
      // and will show the database to the user if it's in the callback
      // array on the client  
      console.log("in Redshift dataSource");  
      dataSource.id = "reshiftDsId";
      dataSource.title = "Redshift Data Source";
      dataSource.database = "reveal";
      dataSource.host = "YOUR-SERVER-INSTANCE.redshift.amazonaws.com";
    }
    return dataSource;
  }
  
  const dataSourceItemProvider = async (userContext, dataSourceItem) => {  
    if (dataSourceItem instanceof reveal.RVRedshiftDataSourceItem) {      

      // Maps to the dataSourceItem on the client, you can have as many of 
      // these as you need to build your curated data options to the user
      dataSourceProvider(userContext, dataSourceItem.dataSource)
      if (dataSourceItem.id == "Invoices") {
        console.log("in Redshift dataSourceItem");  
        dataSourceItem.database = "reveal";
        dataSourceItem.table = "northwindinvoices";
        dataSourceItem.customQuery = "SELECT * FROM northwindinvoices";
        console.log("dataSourceItem.customQuery", dataSourceItem.customQuery);
      }
    }
    return dataSourceItem;
  }

  const revealOptions = {
      authenticationProvider: authenticationProvider,
      dataSourceProvider: dataSourceProvider,
      dataSourceItemProvider: dataSourceItemProvider,
      userContextProvider: userContextProvider,
      localFileStoragePath: "data"
  }
  
app.use('/', reveal(revealOptions));

app.listen(5111, () => {
    console.log(`Reveal server accepting http requests`);
});