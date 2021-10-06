const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  const results = await Promise.all(
    urls.map(async (url) => {
      return await httpGet(url).then(response => {
        const message = JSON.parse(response.body).message;
        return ((response.status === 200)? { ["Arnie Quote"]: message }: { ["FAILURE"]: message });
      }).catch(e => {
        console.log('OOPS something went wrong: ' + e.message);
      })
    })
  );
  return results;
};

module.exports = {
  getArnieQuotes,
};
