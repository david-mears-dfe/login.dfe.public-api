const logger = require('./../../infrastructure/logger');
const niceware = require('niceware');

const getNewSecret = async (req, res) => {
  const { correlationId, clientCorrelationId } = req;

  try {
    logger.info(`Generating new secret (correlationId: ${correlationId}, client correlationId: ${clientCorrelationId})`, {
      correlationId,
      clientCorrelationId
    });
    const secret = niceware.generatePassphrase(8);
    return res.json(secret);

    } catch(e) {
    logger.error(`Error generating new secret (correlationId: ${correlationId}, client correlationId: ${clientCorrelationId}) - ${e.message}`, {
      correlationId,
      clientCorrelationId,
      stack: e.stack,
    });
    throw e;
  }
};

module.exports = getNewSecret;
