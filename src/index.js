"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_manager_1 = require("@google-cloud/secret-manager");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const client = new secret_manager_1.SecretManagerServiceClient();
        const projectId = 'your-project-id'; // Replace with your Google Cloud project ID
        const parent = `projects/${projectId}`;
        const envFilePath = path.join(__dirname, '.env'); // Path to the .env file
        let envContents = '';
        try {
            const [secrets] = yield client.listSecrets({ parent });
            for (const secret of secrets) {
                if (!secret.name) {
                    continue;
                }
                const [secretVersion] = yield client.accessSecretVersion({
                    name: `${secret.name}/versions/latest`,
                });
                const payload = (_b = (_a = secretVersion.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.toString();
                const secretName = secret.name.split('/').pop();
                if (payload && secretName) {
                    envContents += `${secretName}=${payload}\n`;
                }
            }
            // Write the .env contents to a file
            fs.writeFileSync(envFilePath, envContents);
            console.log(`Secrets written to ${envFilePath}`);
        }
        catch (error) {
            console.error('Error accessing secret manager:', error);
        }
    });
}
main();
