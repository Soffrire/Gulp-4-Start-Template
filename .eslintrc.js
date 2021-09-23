module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
		jquery: true
	},
	extends: ['standard', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'generator-star-spacing': 'off',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'never'
			}
		],
		curly: ['error', 'multi']
	}
}
