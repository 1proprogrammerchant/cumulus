import { s3PutObject } from '@cumulus/aws-client/S3';

/**
 * Store migration errors JSON file on S3.
 *
 * @param {string} bucket
 * @param {string[]} message
 * @param {string} recordClassification
 * @param {string | undefined} stackName
 * @returns {void}
 */
export const storeErrors = async (
  bucket: string,
  message: string[],
  recordClassification: string,
  stackName: string) => {
  const file = `{
    "errors": ${JSON.stringify(message)}
  }`;
  const filename = `data-migration2-${recordClassification}-errors.json`;
  const key = `${stackName}/${filename}`;
  await s3PutObject({
    Bucket: bucket,
    Key: key,
    Body: file,
  });
};
