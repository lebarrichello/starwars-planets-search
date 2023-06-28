const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readFile } = require('fs').promises;

const componentList = [];

let coverageResult;
let runnerId;

const serializeCoverage = (data) => Object.keys(data).reduce((acc, fileName) => {
  const componentName = componentList.find((key) => fileName.match(`(/|\\\\)${key}((/|\\\\)index)?\.jsx?$`));
  const entry = fileName === 'total' ? fileName : componentName;

  if(!entry) return acc;

  if (acc[entry]) {
    throw new Error(`Mais de um arquivo ou pasta possui "${entry}" em seu nome`)
  }

  acc[entry] = data[fileName];

  return acc;
}, {});

const testCoverage = async (id) => {
  await exec('npm run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0')
  const dataSerialized = await readFile('coverage/coverage-summary.json', 'utf-8')
    .then(JSON.parse)
    .then(serializeCoverage)
  coverageResult = dataSerialized;
  runnerId = id;
  return coverageResult
};

const getCoverage = (id) => id === runnerId ? coverageResult : testCoverage(id);

module.exports = {
  getCoverage
}
