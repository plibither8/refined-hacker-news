const path = require('path');
const ghRelease = require('gh-release');

const version = process.argv[2];
const assetsPath = path.join(__dirname, '../releases', version);

const options = {
	tag_name: version,
	target_commitish: 'master',
	name: version,
	repo: 'refined-hacker-news',
	owner: 'plibither8',
	endpoint: 'https://api.github.com',
	auth: process.env.GITHUB_TOKEN,
	assets: ['zip', 'crx'].map(ext => `${assetsPath}/${version}.${ext}`)
};

(async () => {
	// Release to GitHub
	ghRelease(options, (err, res) => {
		if (err) {
			throw err;
		}

		console.log(result);
	});
})();
