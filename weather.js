#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather("yaroslavl");
    console.log(weather);
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("Не верно указан город");
    } else if (error?.response?.status == 401) {
      printError("Не верно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const initCli = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    //сохраняем город
  }
  if (args.t) {
    return saveToken(args.t);
  }

  //вывод погоды
  getForecast();
};

initCli();
