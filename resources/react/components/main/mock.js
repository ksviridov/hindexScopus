const uuid = require('uuid')

module.exports = {
    get: {
        '/api': req => ({
            api: {
                hot: '/api/hot',
                search: '/api/search',
                promise: '/api/promise'
            }
        }),
        '/api/hot': req => ([
            {
                name: "Pljonkin A.P.",
                title: "The review of the commercial quantum key distribution system",
                publicationName: "PDGC 2018 - 2018 5th International Conference on Parallel, Distributed and Grid Computing",
                citesNeeded: 3,
                articleID: 85069438729
            },
            {
                name: "Rumyantsev K.E.",
                title: "Robust algorithm for detection of image features",
                publicationName: "Proceedings of 2016 IEEE East-West Design and Test Symposium, EWDTS 2016",
                citesNeeded: 4,
                articleID: 85015188757
            },
            {
                name: "Veselov G.E.",
                title: "Synergetic approach to quadrotor helicopter control with attractor-repeller strategy of nondeterministic obstacles avoidance",
                publicationName: "International Congress on Ultra Modern Telecommunications and Control Systems and Workshops",
                citesNeeded: 2,
                articleID: 84932177432
            },
            {
                name: "Petrov D.",
                title: "Universal robust algorithm for detection of image features",
                publicationName: "Proceedings of the World Congress on Intelligent Control and Automation (WCICA)",
                citesNeeded: 2,
                articleID: 84991594367
            }
        ])
    },
    post: {},
    put: {},
    delete: {}
}