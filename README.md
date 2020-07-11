# Генерация отчётов Planfix при помощи Puppitier

![](https://github.com/planfix-community/planfix-report-gen-pptr/blob/master/sample.gif?raw=true)

Puppitier это nodejs-библиотека для автоматизации действий в браузере Chromium/Firefox. В основном работает в безоконном «headless» режиме и может осуществлять те же дейстивия что и пользователь.


Скрипт тестировался на macOS 10.15.6 и с русском интерфейса Планфикса. Таймауты в коде, например `page.waitFor(200);` очень условные, это скорее подстраховка, так как стоят ожидания появления элементов `page.waitForSelector` с которыми взаимодейтсвуем. 

### Установка и запуск

Требуется наличие [Node.js](https://nodejs.org/ru/download/)

В отдельную папку установите [Puppitier](https://github.com/puppeteer/puppeteer)

```bash
npm install puppeteer
```

Пропишите в файле `planfix-report-pptr.js` в переменную `reportUrl` - ссылку на ваш отчёт , `username` - ваш логин  и  `password` - ваш пароль.

Запускайте: 

```bash
node planfix-report-pptr.js
```

Для отладки можно запускать в оконном режиме `const browser = await puppeteer.launch({headless: false});`

В скрипте есть опциональное создание pdf или png, полезно если отчёт с графиками. Например, после генерации изображения можно сторонними утилитам  кропать изображение, ставить ватермарк и отправлять по почте.

Запуск по расписанию можно реализовать через `launchd` / `crontab` или иным способом.

