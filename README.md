# SAMPLE CLOUD

## Описание

SAMPLE CLOUD - это платформа для использования и создания библиотек с сэмплами. Платформа является источником для творчества музыкантов, саундпродюссеров, битмейкеров, звукоинженеров, а также просто любителей музыки. Пакеты с семплами созданны в самый разнообразных жанрах от хип-хопа, хауса, техно, кинематографии и всех стилей между ними.

### `РЕГИСТРАЦИЯ`

@import "Снимок экрана 2022-01-27 в 22.41.47.png"

### `АВТОРИЗАЦИЯ`

Вход в приложение по email и паролю.

@import "Снимок экрана 2022-01-27 в 22.42.05.png"

### `PROFILE`

Странница для редактирования профайла пользователя.

@import "profile-page.png"

<br/>

1.`Нажав на аватар, попадаем на странницу редактирования аватара.`

@import "avatar-arrow.png"

<br/>

@import "avatar-page.png"

`Все что нам нужно, это сделать дроп изображения. В результате получаем возможность вырезать нужный фрагмент из фото и сохранить результат.`

2. `Следующий блок предназначен для редактирования почты и инициалов пользователя.`

@import "update-username.png"

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

###### `ЗАГРУЗКА СЕМПЛОВ В БИБЛИОТЕКУ(PACK).`

Для загрузки семплов в библиотеку заходим на странницу `PROFILE`

@import "profile.png"

<br/>

`далее выбираем раздел Packs`

<br/>

@import "packs-arrow.png"

Пользователь попадает на странницу созданных им библиотек(Packs). Здесь можно добавлять семплы просто дропнув их в соответствующую библоиотеку.

@import "user-packs.png"

На этом этапе я позволю себе более детально описать решения по оптимизации данного процесса.

1. `Получение, фильтрация и нормализация данных из загруженных пользователем      файлов.`
   Когда пользователь загружает семплы в пакет(библиотеку семплов),

    @import "drop-samples.png"
    мы получаем массив аудио файлов. От каждого из этий файлов нам нужно получить массив координат, для отрисовки визуальной части аудио трека.

    <br/>

    К счастью браузер предоставляет возможность получить такие данные при помощи Web Audio API. Мы получаем так называемый AudioBuffer(массив данных аудио).

    @import "audio-array.png"
    Далее нам нужно оптимизировать этот большой миллионный массив чисел, перед отрисовкой визуализации наших аудио.

    <br/>

    Алгоритм фильтрайции разделяет данные на 550 равных частей и вычисляет среднее значение выборок, а также убирает отрицательные числа. В итоге вместо миллионого массива данных, мы получаем массив из 550 чисел.

    ```javascript
    private filterData(audioBuffer: AudioBuffer) {
		const rawData = audioBuffer.getChannelData(0);
		const samples: number = 550;
		const blockSize: number = Math.floor(rawData.length / samples);
		const filteredData: number[] = [];

		for (let i = 0; i < samples; i++) {
			let blockStart = blockSize * i;

			let sum = 0;
			for (let j = 0; j < blockSize; j++) {
				sum = sum + Math.abs(rawData[blockStart + j]);
			}
			filteredData.push(sum / blockSize);
		}
		return filteredData;
	}
    ```
    `Остается сделать нормализацию данных`. В массиве 550 дробных чисел от 0 до 1. Наш canvas имеет высоту 50 пикселей. Соответственно изменияем масштаб данных в промежутке от 1 до 50 и округляем дробные числа. В результате мы имеем массив из 50ти целых чисел.

    ```javascript
    private normalizeData(filteredData: number[]) {
		const multiplier = 50 / Math.max(...filteredData);
		return filteredData.map((n: number) => ((n * multiplier) + 1).toFixed());
	}
    ```

    Итог. Данная оптимизации позволяет во много раз уменьшить обьем массива, который будет храниться в базе данных по каждому семплу(аудио треку), а также подготовить целые числа для отрисовки(избегаем субпиксельного рендеринга на canvas).

    ***

2. `Webworker`.
   Цель данного этапа, отрисовка и создание png изображений по каждому загруженному треку.

    Имея массив координат, полученный на первом этапе, создаем холст при помощи технологии OffscreenCanvas и вместе с координатами отправяем postMessage в webworker. Отрисовываем данные на холсте по каждому семплу и при помощи canvas.convertToBlob() создаем изображения для отправки на сервер.

    <br/>

    ```javascript
    canvas.convertToBlob({ type: 'image/png' }).then((blob) => fileCreator(blob));

    function fileCreator(blob) {
    	const imageFile = new File([blob], 'png', { type: 'png' });

    	postMessage({ imageFile, audioFile, audioCoordinates, packId, fileId });
    }
    ```

     <br/>

    `Итог:`

    @import "audio-wave-update.png"

    Мы получаем png изображения, заранее отрисованной аудио волны, по каждому семплу. При загрузке странницы с семплами, нам не придется каждый раз повторять процесс вычисления и отрисовки. Либо если все же понадобиться отрисовывать на canvas, эти изображения послужат маской, которая может ставиться перед реальной отрисовкой в рантайме.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
