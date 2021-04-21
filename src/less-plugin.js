const range = n => [...Array(n).keys()]

module.exports = {
    install: function (less, pluginManager, functions) {

        functions.add('gen-keyframes', function () {
            return range(101).map((v, i) =>`${i}% {
                background: linear-gradient(${i * 1.8}deg, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 251, 1) 16%, rgba(0, 20, 255, 1) 32%, rgba(0, 255, 241, 1) 48%, rgba(0, 255, 40, 1) 64%, rgba(255, 250, 0, 1) 80%, rgba(255, 0, 0, 1) 100%);
            }`).join('\n');
        });

    }
};