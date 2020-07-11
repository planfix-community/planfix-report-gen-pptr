/**
 * © 2020 Igor Arkhipov.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



'use strict';

const puppeteer = require("puppeteer");

(async () => {

    let username = "__"
    let password = "__"
    let reportUrl = "__"

    
    // с окном(для отладки) или консольно(рабочий режим) 
    // const browser = await puppeteer.launch({headless: false}); 
    const browser = await puppeteer.launch({headless: true});

    console.log("Запустили браузер");

    const page = await browser.newPage();

    console.log("Создали вкладку");

    // загружаем страницу из переменной
    await page.goto(reportUrl+"&run=1");
    
    //задаём размер окна
    await page.setViewport({ width: 1440, height: 900 });

    // печатаем в поле логина и пароля из переменных
    await page.type("#tbUserName", username, { delay : 30});
    await page.type("#tbUserPassword", password, { delay: 30 });

    console.log("Ввели логин и пароль");

    // клик на кнопку входа
    await page.click(".right-side > .login-form-body > #fform > .login-form-content > .lf-btn");
    
    console.log("Начали логиниться");
 
    await page.waitForNavigation();

    console.log("Залогинились и ожидаем отработки отчёта");

    // тут надо ждём пока отчёт прогрузится
    await page.waitForSelector(`div[class*="report-wr"]`);
    await page.waitFor(2000); // и ещё пару секунд подождём 


        // опционально генерим PDF или полноэкранный скриншот из отчёта, если например нужны графики
        // console.log("Сохраняем изображение");
        //await page.pdf({path: `report-${Date.now()}.pdf`, format: "A4", landscape: true });
        //await page.screenshot({ path: `report-${Date.now()}.png`, fullPage: true }); 
    

    // клик Сохранить отчёт
    await page.waitForSelector(`input[value="Сохранить"]`);
    await page.click(`input[value="Сохранить"]`);
    await page.waitFor(2500); // очень условный таймаут

    console.log("Сохранили отчёт");

    // ниже настройки доступа к отчёту, пока выбор конкретных сотрудников не реализован, сейчас даёт доступ всем кому есть доступ в отчёт
    // клик в оранжевую стрелку
    await page.waitForSelector(`span[class*="b-ddl-menu-selected-arrow-orange"]`)
    await page.click(`span[class*="b-ddl-menu-selected-arrow-orange"]`) 
    await page.waitFor(500);

    // клик в Настроить доступ
    await page.waitForSelector(`li[data-acr="access"]`); 
    await page.click(`li[data-acr="access"]`); 
    await page.waitFor(500);

    // клик в Все сотрудники
    await page.waitForSelector(".js-user-serction > tbody > :nth-child(3) > .td-item > :nth-child(5)");
    await page.click(".js-user-serction > tbody > :nth-child(3) > .td-item > :nth-child(5)");
    console.log("Выдали доступ сотрудникам");
    await page.waitFor(200);

    // клик Сохранить доступ
    await page.waitForSelector(".js-btn-save")
    await page.click(".js-btn-save");
    await page.waitFor(100);
    console.log("Сохранили настройки доступа");

    await browser.close()

    console.log("Done!");
})()
