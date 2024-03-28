import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const client = new SecretManagerServiceClient();

  const projectId = 'your-project-id'; // Replace with your Google Cloud project ID
  const parent = `projects/${projectId}`;
  const envFilePath = path.join(__dirname, '.env'); // Path to the .env file

  let envContents = '';

  try {
    const [secrets] = await client.listSecrets({ parent });

    for (const secret of secrets) {
      if(!secret.name) {
        continue;
      }

      const [secretVersion] = await client.accessSecretVersion({
        name: `${secret.name}/versions/latest`,
      });

      const payload = secretVersion.payload?.data?.toString();
      const secretName = secret.name.split('/').pop();
      if (payload && secretName) {
        envContents += `${secretName}=${payload}\n`;
      }
    }

    // Write the .env contents to a file
    fs.writeFileSync(envFilePath, envContents);
    console.log(`Secrets written to ${envFilePath}`);
  } catch (error) {
    console.error('Error accessing secret manager:', error);
  }
}

main();
