module.exports = {
    baseUrl1: 'https://jsonplaceholder.typicode.com',
    baseUrl: process.env.BASE_URL || 'https://bookstore.demoqa.com',
    userAccPath: '/Account/v1/User',
    genAccTokenPath: '/Account/v1/GenerateToken',
    headers : {
        accept: 'application/json',
        'Content-Type': 'application/json'
    },
    uniqueUsername : `testUser_${new Date().getTime()}`,
    password : 'Pass_@507798',
    invalidPassword : '123456'

  };