module.exports = (ctx) => ({
    plugins: {
        'autoprefixer': {
            browsers: [
                '> 1%',
                'last 3 version',
                'ie >= 10',
            ]
        },
        'cssnano' : true
    }
});