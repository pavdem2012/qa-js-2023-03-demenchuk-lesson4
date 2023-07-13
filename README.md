# -qa-js-2023-03-demenchuk-lesson4 copy from qajs-2022-11

## предварительно выполнить команду для установки необходимых зависимостей в node_modules 
`npm install` 

## Run specs
`npm run test`

## для запуска отчета аллюр последовательно выполнить команды
`allure generate --clean `
`cp -R allure-report/history allure-results`
`allure serve allure-results`

## При необходимости создания документации в "старом" формате выполнить команду типа
`documentation build specs/** -f html -o docs`

## При необходимости создания документации в "новом" формате выполнить команду типа
`jsdoc src/app.js`

### html-report доступен в корневой папке проекта в файле test-report.html после прохождения всех тестов локально

### jest-html-report и coverage report доступны в папке report после прохождения всех тестов локально для запуска отчета запустить файл index.html в папке report/jest-html-report

### Для получения информирования в телеграмм подключиться к группе: https://t.me/otus_qa_2023_03_demenchuk

### Артефакты тестирования доступны в виде архивов в каждом пайплайне
