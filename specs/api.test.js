import config from "../framework/config/config.js";
import {generateRequestData} from "../framework/fixtures/fixture.js"
import userCredentials from "../framework/fixtures/userCredentials.json";
import expect from "expect";
import {wtBearerResp, bearerGetResp, bearerDelResp} from "../framework/services/userService";


let path = '';
let UUID;
let token = '';
let requestData = generateRequestData();
//Тест для проверки все ли работает
// test('should return correct data from API', async () => {
//     console.log(config.baseUrl1)
//     const response = await axios.get(config.baseUrl1+'/todos/1');
//     console.log(response);
//     expect(response.data.userId).toEqual(1);
//     expect(response.data.id).toEqual(1);
//     expect(response.data.title).toEqual('delectus aut autem');
//     expect(response.data.completed).toEqual(false);
// });


/**
 * Тесты на создание пользователя и получения информации о нем
 */

describe('API tests create user', () => {
    /**
     * Проверка "Создание пользователя успешно"
     */
    test('should create a new user', async () => {
        path = config.userAccPath;
        let response = await wtBearerResp({requestData,path});
        UUID = response.data.userID;
        expect(response.status).toEqual(201);
        expect(response.statusText).toBe('Created')
        expect(response.data.userID).toBeDefined();
        expect(response.data.username).toEqual(requestData.userName);
        expect(response.data.books).toBeDefined();
        expect(Array.isArray(response.data.books)).toBe(true);
    });
    /**
     * Проверка "Создание пользователя c ошибкой, логин уже используется"
     */

    test('should return error message when sending existing userName', async () => {
        let response = await wtBearerResp({requestData,path});
        expect(response.status).toBe(406);
        expect(response.statusText).toBe('Not Acceptable')
        expect(response.data.code).toBe('1204');
        expect(response.data.message).toBe('User exists!');
    });
});

/**
 * Тесты на получения токена
 */

describe('API tests generate token', () => {

    /**
     * Проверка "Генерация токена успешно"
     */
    test('Should generate token for valid user', async () => {
        path = config.genAccTokenPath;
        let response = await wtBearerResp({requestData, path});
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK')
        expect(response.data.status).toBe('Success');
        expect(response.data.token).toBeTruthy();
        token = response.data.token;
    });
});
    /**
     * Очистка тестового контура
     */
describe('API tests clearing user data', () => {
        /**
         * Проверка авторизован ли пользователь
         */
    test('is the user authorized', async () => {
        path = config.authorizedUser;
        let response = await wtBearerResp({requestData, path});
        expect(response.status).toEqual(200);
        expect(response.statusText).toBe('OK')
        expect(response.data).toEqual(true);

    });
    /**
     * Получение информации о пользователе
     */
    /* Предполагаю что данная функция в сваггер запрограммирована неверно {UUID} передается как строка, а не как значениe*/
    test('should get a info about user by UUID', async () => {
        path = config.userAccPath + `/${UUID}`;
        let response = await bearerGetResp({path, token});
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK')
        expect(response.data.userId).toEqual(UUID);
        expect(response.data.username).toEqual(requestData.userName);
        expect(response.data.books).toBeDefined();
    });

    /**
     * Очистка пользовательских данных
     */
    /* Предполагаю что данная функция в сваггер запрограммирована неверно {UUID} передается как строка, а не как значениe*/
    test('clearing user data', async () => {
        let response = await bearerDelResp({path, token});
        expect(response.status).toBe(204);
        expect(response.statusText).toBe('No Content')
    });
    /**
     * Проверка удален ли пользователь
     */
    test('delete check user by UUID', async () => {
        let response = await bearerGetResp({path, token});
        expect(response.status).toBe(401);
        expect(response.statusText).toBe('Unauthorized')
        expect(response.data.code).toBe('1207');
        expect(response.data.message).toBe('User not found!');
    });
});


describe('invalid body tests', () => {
    /**
     * Проверка "Создание пользователя c ошибкой, пароль не подходит"
     */

    test('error message when sending empty password', async () => {
        requestData = {
            userName: userCredentials.uniqueUsername,
            password: userCredentials.invalidPassword,
        };
        path = config.userAccPath;
        let response = await wtBearerResp({requestData,path});
        expect(response.status).toEqual(400);
        expect(response.statusText).toBe('Bad Request')
        expect(response.data.code).toBe('1300');
        expect(response.data.message).toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.');
    });

    /**
     * Проверка "Генерация токена c ошибкой"
      */
    test('returns an error message when body are not provided', async () => {
        requestData = {
            userName: null,
            password: null,
        };
        path = config.genAccTokenPath;
        let response = await wtBearerResp({requestData, path});
        expect(response.status).toBe(400);
        expect(response.statusText).toBe('Bad Request')
        expect(response.data.code).toBe('1200');
        expect(response.data.message).toBe('UserName and Password required.');

    });
});


