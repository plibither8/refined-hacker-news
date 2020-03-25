const scripts = [
	'clean',
	'build',
	'version',
	'release:amo',
	'zip',
	'crx',
	'dev-dashboard',
	'gh-release'
];

process.stdout.write(scripts.join('|'));
