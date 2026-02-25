import { existsSync } from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';
import SftpClient from 'ssh2-sftp-client';

dotenv.config();

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REQUIRED_VARS = ['SFTP_HOST', 'SFTP_USER', 'SFTP_PASSWORD', 'SFTP_REMOTE_PATH'] as const;

function loadConfig() {
	const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
	if (missing.length > 0) {
		console.error(`\n  Missing environment variables: ${missing.join(', ')}`);
		console.error('  Copy .env.example to .env and fill in your values.\n');
		process.exit(1);
	}
	return {
		host: process.env.SFTP_HOST as string,
		username: process.env.SFTP_USER as string,
		password: process.env.SFTP_PASSWORD as string,
		remotePath: process.env.SFTP_REMOTE_PATH as string,
	};
}

// ---------------------------------------------------------------------------
// Deploy
// ---------------------------------------------------------------------------

async function deploy() {
	const config = loadConfig();
	const distPath = path.resolve('./dist');

	if (!existsSync(distPath)) {
		console.error('\n  dist/ not found — run `bun run build` first.\n');
		process.exit(1);
	}

	const sftp = new SftpClient();
	let uploadCount = 0;

	sftp.on('upload', (info: { source: string }) => {
		uploadCount++;
		const rel = path.relative(distPath, info.source);
		console.log(`  uploading  ${rel}`);
	});

	try {
		console.log(`\nConnecting to ${config.host}...`);
		await sftp.connect({
			host: config.host,
			username: config.username,
			password: config.password,
		});
		console.log('Connected.\n');

		console.log(`Uploading dist/ → ${config.remotePath}`);
		console.log('─'.repeat(50));

		await sftp.uploadDir(distPath, config.remotePath);

		console.log('─'.repeat(50));
		console.log(`\nDone. ${uploadCount} file(s) uploaded to ${config.host}${config.remotePath}\n`);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		console.error(`\nDeployment failed: ${message}\n`);
		process.exit(1);
	} finally {
		await sftp.end();
	}
}

deploy();
