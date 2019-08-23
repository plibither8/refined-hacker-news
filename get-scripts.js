const scripts = [
	'clean',
	'build',
	'version',
	'release:amo',
	'zip',
	'dev-dashboard',
	'create-git-tag'
];

process.stdout.write(scripts.join('|'));
