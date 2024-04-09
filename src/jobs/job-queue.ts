async function run() {

    const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')
    const auth = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64')

    fetch(`${process.env.URL}/api/jobs/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': auth
        },
    }).catch(error => {
        console.error({message: "error when running job", error})
    })
}

run()