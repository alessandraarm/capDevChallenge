const cds = require('@sap/cds')

class CatalogService extends cds.ApplicationService {
    async init() {

        const remote = await cds.connect.to('RemoteService')
        this.on('*', 'Players', (req) => {
            return remote.run(req.query)
        })

        this.before(['CREATE'], 'Holes', async (req, next) => {
            switch (req.data.score - req.data.par) {
                case -3:
                    req.data.result = 'albatross';
                    break;
                case -2:
                    req.data.result = 'eagle';
                    break;
                case -1:
                    req.data.result = 'birdie';
                    break;
                case 0:
                    req.data.result = 'par';
                    break;
                case 1:
                    req.data.result = 'bogey';
                    break;
                case 2:
                    req.data.result = 'double bogey';
                    break;
                case 3:
                    req.data.result = 'triple bogey';
                    break;

            };
            if (req.data.score === 1) {
                req.data.result = 'hole in one'
            }
        })

        return super.init()
    }
}

module.exports = { CatalogService }