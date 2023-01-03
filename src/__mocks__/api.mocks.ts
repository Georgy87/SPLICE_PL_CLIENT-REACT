export const mockedServerResponse = async (req: Request) => {
    console.log(req)
    if (req.url !== 'https://test-front-spa.mmtestprojectsfactory.com/api/' || !req.body) {
        return JSON.stringify({
            result: 'error',
            error: '404',
        });
    }

    if (
        req.body.toString() ===
        JSON.stringify({
            action: 'login',
            login: 'test@mail.ru',
            password: 'TestPassword123_',
        })
    ) {
        return JSON.stringify({ result: 'ok' });
    }
    return JSON.stringify({
        result: 'error',
        error: '404',
    });
}