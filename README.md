## **Тизер:**

Модульная система, которая умеет разделять видео на аудио дорожку и изображения, распознавать на них текст и возвращать в удобном для машины виде.
Node js стэк при поддержке ffmpeg, coqui-ai, tesseract, natural, mystem
Уникальное сочетание всей полноты информации от видео с простотой и доступностью разработкой.
Видео демонстрации в 2 разрешениях demo.mkv demo.mp4

**Тестировалось на Ubunto 18.04**

## **L3/natural** морфологический разбор текста (2 сервиса разбор результата от сервиса распознавания голосовой дорожки и сервиса распознования снепшотов)
Установка *cd L3/natural && npm i* 
-*node server.js* - запуск сервиса распознования результата от распознования снепшотов (создание обьекта с данными о кол-ве слов и повторении)
-*node audio_server.js* - запуск сервиса для распознования результата от сервиса распознования аудио (создание обьекта с данными о кол-ве слов и повторении)

## **L3/server** сервис разбиения видео на скриншоты и "вырезание видео" дребуется ffmpeg

Установка  *cd L3/server && npm i && node server.js*

## **L3/speech** сервис разбора аудиодорожки

скачать релиз для нужной ОС https://github.com/coqui-ai/STT/releases (native_client)
Установка *cd L3/speech && npm i && npm start*
**требуется скачать и положить в каталог L3/speech/models подготовленые модели**
- https://github.com/coqui-ai/STT-models/releases/download/russian/jemeyer/v0.1.0/model.tflite
- https://github.com/coqui-ai/STT-models/releases/download/russian/jemeyer/v0.1.0/model.pbmm
- https://github.com/coqui-ai/STT-models/releases/download/russian/jemeyer/v0.1.0/wiki-ru-6gram.scorer
- https://github.com/coqui-ai/STT-models/releases/download/russian/jemeyer/v0.1.0/alphabet.txt

## **L3/tesseract** сервис разбора снепшотов, добывание текста непосредственно из видео ряда

Установка *cd L3/tesseract && npm i && node server.js*

## Система морфологического анализаторa русского текста с поддержкой снятия морфологической неоднозначности (используется для формирования лемм выдергивания имен собственных гео локаций, и в целом морф. разбора)
Запускается в докер контейнере *docker run -p 2345:8080 -e TIMEOUT=800 azzzak/mystem* больше ничего не требуется
 
**Запуск распознавания видео:** 
1) Положить видео по адресу server/video
2) Запустить сервисы по адресу: speech/speetch.js natural/server.js, natural/server_audio.js, tesseract/server.js, server/server.js
3) Дождаться окончания работы всех сервисов
Результаты работы система складывает в папку data и её подпапки.
Итоговые JSON файлы по видео лежат по адресу data/stemmed_texts
 


результаты обработки появятся в каталоге **L3/data/result_texts**

По вопросам настройки и установки можно обратиться в телеграмм n0byk или написать issue тут

> Спасибо за внимание
