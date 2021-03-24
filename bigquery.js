// Import the Google Cloud client libraries
const {BigQuery} = require('@google-cloud/bigquery');

// Instantiate client
const bigquery = new BigQuery();

const datasetId = 'bridge_erc20_token'

async function loadJsonToBigquery(file, table) {
  const metadata = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON',
    location: 'US',
  };
  const [job] = await bigquery
    .dataset(datasetId)
    .table(table)
    .load(file, metadata)

  console.log(`Job ${job.id} completed.`)

  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }

}


exports.loadJsonToBigquery = loadJsonToBigquery
