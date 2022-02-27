# SAMPLE CLOUD

## Установка

[client](https://github.com/Georgy87/SPLICE_PL_CLIENT-REACT): `npm run start`
<br/>
[server](https://github.com/Georgy87/SPLICE_PL_SERVER): `npm run start`

## Оглавление

1. [Описание проекта](#Описание-проекта)
2. [Регистрация](#Регистрация)
3. [Вход](#Вход)
4. [Главная страница](#Главная-страница)
5. [Профайл библиотеки](#Профайл-библиотеки)
6. [Профайл пользователя](#Профайл-пользователя)
	- [Редактирование аватара](#Редактирование-аватара)
	- [Редактирование почты и инициалов пользователя](#Редактирование-почты-и-инициалов-пользователя)
	- [Создание библиотеки](#Создание-библиотеки)
	- [Загрузка семплов в библиотеку](#Загрузка-семплов-в-библиотеку)
7. [Секвенсор](#Секвенсор)
8. [Оптимизации](#Оптимизации)
	- [Загрузка файлов](#Загрузка-файлов)
    - [Webworker](#Webworker)
    - [Audio player](#Audio-player)
	- [Визуализация семпла](#Визуализация-семпла)
	- [Кроссбраузерность](#Кроссбраузерность)
	- [Секвенсор](#Секвенсор)
	
## `Описание проекта`
SAMPLE CLOUD - это платформа для использования и создания библиотек с сэмплами. Платформа является источником для творчества музыкантов, саундпродюссеров, битмейкеров, звукоинженеров, а также просто любителей музыки. Библиотеки с семплами созданы в самых разнообразных жанрах: от хип-хопа, хауса, техно, кинематографии до классической музыки.

## `Регистрация`

![регистрация](src/assets//readme-images/registration.png)

## `Вход`

Вход в приложение по email и паролю:

![авторизация](src/assets//readme-images/login.png)

## `Главная страница`

При удачной авторизации мы попадаем на главную страницу платформы. Здесь можно найти и прослушать демо библиотек с семплами(Packs).

<br/>

![main-page](src/assets//readme-images/main-page.png)

<br/>

`Поиск осуществляется по жанрам, а также авторам библиотек.`

![search](src/assets//readme-images/search.png)

`При нажатии на иконку play открывается плеер и включается проигрывание демо библиотеки.`

![player](src/assets//readme-images/player.png)

## `Профайл библиотеки`

`Выбрав библиотеку на странице main page открываем профайл с семплами.`

![sample-page](src/assets//readme-images/sample-page.png)

`Категорию семплов можно фильтровать по тегам`

`При наведении на семпл появляется возможность прослушать его, а также перемотать в нужное место при проигрывании.`

[демо](https://disk.yandex.ru/i/OJFzGtyJR7_Pkw)

Добавить категорию семпла, а также его bpm можно в модальном окне, которое открывается при нажатии на крайний правый вертикальный эллипсис семпла:

![category-bpm-modal](src/assets//readme-images/category-bpm-modal.png)

## `Профайл пользователя`

Страница для редактирования профайла пользователя.

![profile](src/assets//readme-images/profile.png)

<br/>

#### `Редактирование аватара`

![avatar](src/assets//readme-images/avatar.png)

<br/>

![avatar-pointer](src/assets//readme-images/avatar-pointer.png)

`Все, что нам нужно, это сделать дроп изображения. В результате получаем возможность вырезать нужный фрагмент из фото и сохранить результат.`

![avatar-editor](src/assets//readme-images/avatar-editor.png)

#### `Редактирование почты и инициалов пользователя`

![update-username](src/assets//readme-images/update-username.png)

<br/>

#### `Создание библиотеки`

- Заполняем форму(pack information).

![create-pack-info](src/assets//readme-images/create-pack-info.png)

<br/>

- Загружаем обложку для библиотеки.

![pack-upload-image](src/assets//readme-images/pack-upload-image.png)

<br/>

- Загружаем аудио для библиотеки.

![pack-audio-upload](src/assets//readme-images/pack-audio-upload.png)

`Далее попадаем на страницу библиотек(Packs), созданных пользователем(см.загрузка семплов в библиотеку(PACK)).`

#### `Загрузка семплов в библиотеку`

Для загрузки семплов в библиотеку заходим на странницу `PROFILE`

![profile-pointer](src/assets//readme-images/profile-pointer.png)

<br/>

`далее выбираем раздел Packs`

<br/>

![packs-pointer](src/assets//readme-images/packs-pointer.png)

Пользователь попадает на страницу созданных им библиотек(Packs). Здесь можно добавлять семплы просто дропнув их в соответствующую библиотеку.

![drop-samples-page](src/assets//readme-images/drop-samples-page.png)

На этом этапе я позволю себе более детально описать решения по оптимизации данного процесса.

## `Секвенсор`

![sequencer-page](src/assets//readme-images/sequencer-page.png)

Секвенсор - это функционал для проигрывания семплов. Он включает семпл в определенный момент времени и работает c определенной скоростью bpm. Работа движка секвенсора осуществляется в хуке [useSequencer](https://github.com/Georgy87/SPLICE_PL_CLIENT-REACT/blob/main/src/hooks/useSequencer.ts)

При включении секвенсора пользователь может переключить bpm на панели:

![bpm-controls](src/assets//readme-images/bpm-controls.png)

`Пример изменения скорости проигрывания секвенсора:`

[demo](https://disk.yandex.ru/i/_dmonx9ha0gZ2A)

Некоторые семплы представляют собой фрагмент музыки c определенной скоростью(bpm), поэтому, загружая такие семплы, нужно выставлять bpm в секвенсоре.

[demo](https://disk.yandex.ru/i/rosSYCfpDKq-Ug)

Семплы, которые пользователь отметил лайком, попадают на страницу секвенсора. Перетаскиваем семпл на любую дорожку секвенсора в зеленый бокс.

![drop-sequencer](src/assets//readme-images/drop-sequencer.png)

 и кликаем место, в котором семпл должен начинать свое проигрывание. Оно выделяется синим цветом. 

при адаптации на мобильные устройства, так как мы не можем перетащить семплы в зеленый дроп бокс секвенсора, при нажатии на бокс появляется модальное окно, откуда можно загрузить соответствующий семпл выбрав его.

![sample-modal-sequencer](src/assets//readme-images/MOBILE-SEQUENCER-SAMPLES.png)
###### Секвенсор позволяет пользователю прослушать понравившиеся ему семплы в сочетании друг с другом в работе, приближенной к реальному музыкальному редактору.

## `Оптимизации`

#### Загрузка файлов

   Когда пользователь загружает семплы в библиотеку семплов,

![drop-samples](src/assets//readme-images/drop-samples.png)
 
мы получаем массив аудио файлов. От каждого из этих файлов нам нужно получить массив координат для отрисовки визуальной части аудио трека.

<br/>

К счастью, браузер предоставляет возможность получить такие данные при помощи Web Audio API. Мы получаем, так называемый, AudioBuffer(массив данных по аудио файлу).

![array-buffer](src/assets//readme-images/array-buffer.png)
Далее нам нужно оптимизировать этот большой миллионный массив чисел перед отрисовкой визуализации наших аудио.

<br/>

Алгоритм фильтрации разделяет данные на 550 равных частей и вычисляет среднее значение выборок, а также убирает отрицательные числа. В итоге вместо миллионого массива данных мы получаем массив из 550 чисел.

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
`Остается сделать нормализацию данных`. В массиве 550 дробных чисел от 0 до 1. Наш canvas имеет высоту 50 пикселей. Соответственно изменияем масштаб данных в промежутке от 1 до 50ти и округляем дробные числа. В результате мы имеем массив из 550ти целых чисел от 1 до 50ти.

```javascript
private normalizeData(filteredData: number[]) {
	const multiplier = 50 / Math.max(...filteredData);
	return filteredData.map((n: number) => ((n * multiplier) + 1).toFixed());
}
```

Итог: Данная оптимизация позволяет во много раз уменьшить объем массива, который будет храниться в базе данных по каждому семплу(аудио треку), а также подготовить целые числа для отрисовки(избегаем субпиксельного рендеринга на canvas).

***

#### Webworker 
  Цель данного этапа - отрисовка и создание png изображений по каждому загруженному треку.

  Имея массив координат, полученный на первом этапе, создаем холст при помощи технологии OffscreenCanvas и вместе с координатами отправляем postMessage в webworker. Отрисовываем данные на холсте по каждому семплу и при помощи canvas.convertToBlob() создаем изображения для отправки на сервер.

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

  ![audio-wave](src/assets//readme-images/audio-wave.png)

  Мы получаем png изображения заранее отрисованной аудио волны по каждому семплу. При загрузке странницы с семплами, нам не придется каждый раз повторять процесс вычисления и отрисовки, либо, если все же понадобиться отрисовывать на canvas, эти изображения послужат маской, которая может ставиться перед реальной отрисовкой в real time.

#### Audio player

1. Для проигрования библиотек и семплов было решено использовать универсальный hook [useSound()](https://github.com/Georgy87/SPLICE_PL_CLIENT-REACT/blob/main/src/hooks/useSound.ts). Эта функциональность воспроизводит аудио и предоставляет данные либо для плеера, проигрывающего библиотеки, либо для для проигрования семплов. Для этих целей оптимальнее было использовать Context Api. Так как обьект new Audio() нерекомендуется использовать в redux state.

```javascript
export const defaultState = {
	audioPlayer: new Audio(),
	currentTrackIndex: null,
	isPlaying: false,
	currentTrackId: null,
	active: null,
	duration: 0,
	currentTime: 0,
	packCurrentTime: 0,
	volume: 2,
	percent: 0,
	packPercent: 0,
};

export const PlayerContextProvider: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);

	const [playerState, setPlayerState] = useState<ContextProps[0]>(defaultPlayerStateType);
	
	useEffect(() => {
		if (packs) {
			setPlayerState({
				...defaultState,
				packs: packs,
				samples: [],
			});
		}
	}, [packs]);

	return (
		<PlayerContext.Provider value={[playerState, setPlayerState]}>
			{children}
		</PlayerContext.Provider>
	);
};
```

2. `Работа со временем и анимацией.`

В процессе разработки функционала работы прогресс бара плеера
![progress-bar](src/assets//readme-images/footer-player.png)

а также прогресса проигрывания семплов:
![progress-bar](src/assets//readme-images/progress-samples.png)
  Cтояла задача во первых использовать время в миллисекундах, во вторых чтобы это время было максимально стабильно, а также анимация не выходила за пределы 60 кадров в секунду. Вместо setTimeout и setIntervel, испольпользуется requestAnimationFrame. Он работает максимально быстро и плавно в текущих условиях. Браузер также не тратит время на запуск, если по какой-то причине анимация выходит за пределы экрана и т.д.
  При нажатии на play плеера или семпла запускается данный механизм. Далее из контекста получаем данные для отрисовки.

  ```javascript
  const play = () => {
		if (playerState.isPlaying) {
			playerState.audioPlayer.pause();
		} else {
			playerState.audioPlayer.play();
		}
		setPlayerState((state: PlayerStateType) => ({
			...state,
			isPlaying: !playerState.isPlaying,
		}));
	};

	const onTimeUpdate = () => {
		setPlayerState((state: PlayerStateType) => {
			const { audioPlayer } = state;
			return {
				...state,
				currentTime: audioPlayer.currentTime,
				packCurrentTime: audioPlayer.currentTime,
				percent: (canvasWidth / audioPlayer.duration) * audioPlayer.currentTime,
				packPercent: (100 / audioPlayer.duration) * audioPlayer.currentTime,
			};
		});
	
		requestID = window.requestAnimationFrame(onTimeUpdate);
	};

  ```

#### Визуализация семпла

Статическая визуализация семпла приходит из сервера в виде png изображения, отрисованного при загрузке семпла на платформу. Это сильно ускоряет процесс отрисовки страницы библиотеки, так как таких семплов может быть большое количество. 

Когда начинается проигрование семпла, [сервис](https://github.com/Georgy87/SPLICE_PL_CLIENT-REACT/blob/main/src/services/canvasService.ts) отрисовывающий canvas, работает с хуком [useSound()](https://github.com/Georgy87/SPLICE_PL_CLIENT-REACT/blob/main/src/hooks/useSound.ts). Мы получаем процент прогресса проигрования аудио, а также готовые координаты для отрисовки. Холст отрисовывет прогресс по тем же координатам, которые использовались при загрузки семпла. 

Оптимизации, по работе со временем, работающие в хуке useSound помогают более оптимально и производительно рисовать холст по также нормализованным заранее координатам.

#### Кроссбраузерность

Приложение является кроссбраузерным, но в процессе теcтирования я столкнулся с некоторыми проблемами, которые хотел бы описать в этой главе.

1. `Процесс загрузки семплов в библиотеку.`

При загрузке файлов, описанной в главе [Webworker](#Webworker), технология [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
на данный момент оказалась не совместима с Safari, Firefox и IE. Была написана функциональность, которая при определении данных браузеров, осуществляет отрисовку canvas без применения технологии OffscreenCanvas и webworker.

```javascript
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

  canvas.width = cssCanvasWidth * dpr;
  canvas.height = cssCanvasHeight * dpr;

  ctx?.scale(dpr, dpr);
  ctx?.translate(0, cssCanvasHeight / 2);

  const barWidth: number = cssCanvasWidth / audioCoordinates.length;

  if (ctx === null) return;

  ctx.strokeStyle = '#ADD8E6';
  ctx.beginPath();

  let cycleLimiter: number = 0;
  
  drawingTarget === 'Image' ? (cycleLimiter = audioCoordinates.length) : (cycleLimiter = percent);

  for (let i = 0; i < cycleLimiter; i++) {
    const x: number = barWidth * i;
    let barHeight: number = audioCoordinates[i];
    drawLineSegment(ctx, x, barHeight, barWidth, rectangleWidth);
  }

  ctx.stroke();

  function drawLineSegment(ctx: CanvasRenderingContext2D, x: number, barHeight: number, barWidth: number, rectangleWidth: number) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x + barWidth / 2, -(barHeight / 2), rectangleWidth, barHeight);
  }
```

Также при получении изображения, содержащегося не холсте canvas вместо технологии [OffscreenCanvas.convertToBlob()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/convertToBlob) применяется [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/ru/docs/Web/API/HTMLCanvasElement/toDataURL) и затем уже утилитой:
```javascript
export const base64StringtoFile = (base64String: string, filename: string) => {
  let arr = base64String.split(','),
  
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
while (n--) {
  u8arr[n] = bstr.charCodeAt(n);
}
return new File([u8arr], mime, { type: 'png' });
};
```
создаем файл изображения для отправки на сервер.

2. `Движок секвенсора.`
При тестировании работы секвенсора, описанного в главе [Секвенсор](#Секвенсор), в Safari работа c [Web Audio API](https://developer.mozilla.org/ru/docs/Web/API/Web_Audio_API) дала сбой при запуске движка. Проблема была решена использованием [AudioContext.resume()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume)


***
[:arrow_up: Оглавление](#Оглавление)