const scripts = [
	'clean',
	'build',
	'version',
	'changelog',
	'release:amo',
	'zip',
	'dev-dashboard',
	'create-git-tag'
];

process.stdout.write(scripts.join('|'));
