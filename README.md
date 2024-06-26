# Google Secrets to .env

This utility automates fetching secrets from Google Secret Manager and generates a `.env` file with those secrets, formatted as `KEY=value` pairs. It's designed to streamline the process of managing secrets for development and production environments in Node.js applications.

## Features

- Fetches secrets directly from Google Secret Manager.
- Generates a `.env` file with fetched secrets.
- Simplifies secret management in development and production.

## Prerequisites

- Node.js (version 12 or higher recommended)
- Google Cloud SDK installed and configured
- Access to Google Cloud Secret Manager with appropriate permissions

## Getting Started

### Step 1: Set Up Your Google Cloud Project

1. **Create a Google Cloud Project** if you haven't already.
2. **Enable the Secret Manager API** for your project via the Cloud Console.
3. **Create a Service Account** with the necessary permissions to access Secret Manager.
4. **Download a JSON key file** for your service account and keep it secure.

### Step 2: Configure Authentication

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your service account JSON key file.

#### Linux/macOS:

```sh
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
```

#### Windows:

For Command Prompt:

```cmd
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your\service-account-file.json
```

For PowerShell:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\service-account-file.json"
```

### Step 3: Clone and Set Up the Project

```sh
git clone <repository-url>
cd google-secrets-to-env
npm install
```

Replace `<repository-url>` with the URL of this project's repository.

### Step 4: Running the Utility

To run the utility and generate the `.env` file:

```sh
npx ts-node --transpile-only src/index.ts
```

Alternatively, if you've set up a start script in your `package.json`:

```sh
npm start
```

This will fetch all secrets from your Google Secret Manager and write them to a `.env` file in the root of the project directory.

## Security Considerations

- Never commit the `.env` file or the service account JSON key file to source control.
- Always follow the principle of least privilege when assigning roles to your service account.
- Regularly rotate your service account keys.

## Contributing

Contributions are welcome! If you have suggestions for improving this utility, feel free to submit a pull request or open an issue. When contributing, please keep in mind that this project was initially generated using ChatGPT. While the project aims to be fully functional and well-documented, there may be areas that benefit from human insight and refinement.

## Disclaimer

This project was generated using ChatGPT, an AI developed by OpenAI. It serves as a starting point for working with Google Secret Manager to automate the creation of `.env` files. Users and contributors should review the codebase and documentation for any inaccuracies or improvements that could be made.

## License

This project is released under the [MIT License](LICENSE). By using or contributing to this project, you acknowledge and agree that the project was generated by ChatGPT and that the responsibility for any modifications or usage of the project lies with the individuals choosing to use or modify it.
