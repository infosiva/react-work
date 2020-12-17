const sleep = t => new Promise(res => {
    setTimeout(res, t)
})

sleep(10000).then(console.log('just after 100 sec..'));