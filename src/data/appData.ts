export const regions = {
  'ДНР': ['Донецк', 'Макеевка', 'Мариуполь', 'Шахтёрск', 'Снежное', 'Харцызск', 'Енакиево', 'Дебальцево', 'Мангуш', 'Новоазовск', 'Старобешево', 'Волноваха', 'Горловка', 'Амвросиевка', 'Тельманово', 'Зугрэс', 'Мелекино', 'Ялта', 'Урзуф', 'Володарское', 'Ясиноватая', 'Торез', 'Иловайск'],
  'ЛНР': ['Луганск'],
  'Херсонская область': ['Херсон'],
  'Запорожская область': ['Запорожье'],
  'Крым': ['Симферополь', 'Севастополь', 'Ялта', 'Керчь', 'Евпатория', 'Феодосия'],
  'Ростовская область': ['Ростов-на-Дону', 'Таганрог', 'Шахты', 'Новочеркасск', 'Волгодонск'],
  'Краснодарский край': ['Краснодар', 'Сочи', 'Новороссийск', 'Анапа', 'Геленджик']
};

export const lostItems = [
  {
    id: 1,
    type: 'lost',
    category: 'Вещи',
    title: 'iPhone 14 Pro в чёрном чехле',
    description: 'Потерял телефон в районе Невского проспекта, около метро Гостиный двор. В чехле была банковская карта.',
    location: 'Невский пр., м. Гостиный двор',
    date: '26 янв',
    emoji: '📱'
  },
  {
    id: 2,
    type: 'found',
    category: 'Животные',
    title: 'Найден рыжий кот',
    description: 'Нашли рыжего кота около Исаакиевского собора. Очень ласковый, в ошейнике, но без бирки.',
    location: 'Исаакиевская пл.',
    date: '25 янв',
    emoji: '🐱'
  },
  {
    id: 3,
    type: 'lost',
    category: 'Вещи',
    title: 'Кожаный кошелёк коричневый',
    description: 'Утерян кожаный кошелёк коричневого цвета в парке 300-летия. Внутри документы на имя Иванов А.С.',
    location: 'Парк 300-летия',
    date: '24 янв',
    emoji: '👛'
  },
  {
    id: 4,
    type: 'found',
    category: 'Вещи',
    title: 'Найдены ключи с брелоком BMW',
    description: 'Найдены ключи от машины с брелоком BMW около ТРК "Галерея". На связке 4 ключа.',
    location: 'ТРК "Галерея"',
    date: '23 янв',
    emoji: '🔑'
  },
  {
    id: 5,
    type: 'lost',
    category: 'Животные',
    title: 'Пропала собака породы хаски',
    description: 'Пропала собака хаски, сине-белого окраса, кличка Буран. Очень активный, любит детей. Вознаграждение гарантировано!',
    location: 'Московский район',
    date: '22 янв',
    emoji: '🐕'
  },
  {
    id: 6,
    type: 'found',
    category: 'Люди',
    title: 'Найден ребёнок 5-6 лет',
    description: 'На Дворцовой площади найден ребёнок примерно 5-6 лет, мальчик в синей куртке. Находится в полиции.',
    location: 'Дворцовая пл.',
    date: '26 янв',
    emoji: '👦'
  },
  {
    id: 7,
    type: 'lost',
    category: 'Вещи',
    title: 'Рюкзак чёрный с ноутбуком',
    description: 'Забыл рюкзак в маршрутке №3. Внутри ноутбук MacBook Pro и документы. Очень нужен для работы!',
    location: 'Маршрутка №3',
    date: '25 янв',
    emoji: '🎒'
  },
  {
    id: 8,
    type: 'found',
    category: 'Вещи',
    title: 'Найдены очки в футляре',
    description: 'Нашла очки в футляре около Казанского собора. Футляр серого цвета, очки в тонкой оправе.',
    location: 'Казанский собор',
    date: '24 янв',
    emoji: '👓'
  }
];

export const categories = [
  { id: 1, name: 'Музеи', icon: 'Building2', count: 24, gradient: 'from-[#A62531] to-[#8B1E28]' },
  { id: 2, name: 'Парки', icon: 'TreePine', count: 18, gradient: 'from-[#171B1F] to-[#2C3238]' },
  { id: 3, name: 'Рестораны', icon: 'UtensilsCrossed', count: 156, gradient: 'from-[#A62531] to-[#171B1F]' },
  { id: 4, name: 'Развлечения', icon: 'Sparkles', count: 42, gradient: 'from-[#8B1E28] to-[#A62531]' },
];

export const events = [
  {
    id: 1,
    title: 'Выставка "Импрессионисты"',
    type: 'Выставка',
    date: '28 янв',
    dateTime: '2026-01-28',
    time: '10:00 - 20:00',
    location: 'Эрмитаж',
    locationId: 1,
    price: 'от 600 ₽',
    image: '🎨',
    verified: true,
    rating: 4.9,
    reviews: 342,
    description: 'Уникальная выставка произведений французских импрессионистов из частных коллекций.',
    distance: '1.2 км'
  },
  {
    id: 2,
    title: 'Концерт "Времена года"',
    type: 'Концерт',
    date: '29 янв',
    dateTime: '2026-01-29',
    time: '19:00',
    location: 'Мариинский театр',
    locationId: null,
    price: 'от 2000 ₽',
    image: '🎻',
    verified: true,
    rating: 5.0,
    reviews: 156,
    description: 'Концерт классической музыки. Исполняется произведение Вивальди "Времена года".',
    distance: '3.5 км'
  },
  {
    id: 3,
    title: 'Спектакль "Евгений Онегин"',
    type: 'Театр',
    date: '30 янв',
    dateTime: '2026-01-30',
    time: '18:30',
    location: 'Александринский театр',
    locationId: null,
    price: 'от 1500 ₽',
    image: '🎭',
    verified: true,
    rating: 4.8,
    reviews: 234,
    description: 'Классическая постановка по роману в стихах А.С. Пушкина.',
    distance: '2.1 км'
  },
  {
    id: 4,
    title: 'Фестиваль света',
    type: 'Фестиваль',
    date: '1 фев',
    dateTime: '2026-02-01',
    time: '18:00 - 23:00',
    location: 'Дворцовая площадь',
    locationId: null,
    price: 'Бесплатно',
    image: '💡',
    verified: true,
    rating: 4.9,
    reviews: 567,
    description: 'Грандиозное световое шоу на Дворцовой площади. Проекции на фасады зданий.',
    distance: '0.8 км'
  },
  {
    id: 5,
    title: 'Мастер-класс по живописи',
    type: 'Мастер-класс',
    date: '2 фев',
    dateTime: '2026-02-02',
    time: '14:00 - 17:00',
    location: 'Русский музей',
    locationId: null,
    price: 'от 800 ₽',
    image: '🖌️',
    verified: false,
    rating: 4.7,
    reviews: 89,
    description: 'Научитесь основам живописи маслом под руководством профессионального художника.',
    distance: '1.8 км'
  },
  {
    id: 6,
    title: 'Джазовый вечер',
    type: 'Концерт',
    date: '3 фев',
    dateTime: '2026-02-03',
    time: '20:00',
    location: 'JFC Jazz Club',
    locationId: null,
    price: 'от 1000 ₽',
    image: '🎷',
    verified: true,
    rating: 4.8,
    reviews: 178,
    description: 'Вечер живой джазовой музыки с известными российскими музыкантами.',
    distance: '2.7 км'
  },
  {
    id: 7,
    title: 'Кинопоказ под открытым небом',
    type: 'Кино',
    date: '28 янв',
    dateTime: '2026-01-28',
    time: '21:00',
    location: 'Летний сад',
    locationId: 2,
    price: 'Бесплатно',
    image: '🎬',
    verified: false,
    rating: 4.6,
    reviews: 234,
    description: 'Показ классического советского кино в парке. Берите пледы!',
    distance: '0.8 км'
  },
  {
    id: 8,
    title: 'Экскурсия "Тайны Петербурга"',
    type: 'Экскурсия',
    date: '29 янв',
    dateTime: '2026-01-29',
    time: '11:00 - 14:00',
    location: 'Невский проспект',
    locationId: null,
    price: 'от 500 ₽',
    image: '🚶',
    verified: true,
    rating: 4.9,
    reviews: 445,
    description: 'Пешеходная экскурсия по историческому центру с профессиональным гидом.',
    distance: '0.5 км'
  }
];

export const objects = [
  {
    id: 1,
    name: 'Эрмитаж',
    category: 'Музей',
    rating: 4.9,
    reviews: 2847,
    distance: '1.2 км',
    verified: true,
    safetyZone: 'safe',
    image: '🏛️',
    audioAvailable: true,
    description: 'Один из крупнейших и значимых художественных и культурно-исторических музеев России и мира.',
  },
  {
    id: 2,
    name: 'Летний сад',
    category: 'Парк',
    rating: 4.7,
    reviews: 1523,
    distance: '0.8 км',
    verified: true,
    safetyZone: 'safe',
    image: '🌳',
    audioAvailable: true,
    description: 'Парк в центре Санкт-Петербурга, памятник садово-паркового искусства первой трети XVIII века.',
  },
  {
    id: 3,
    name: 'Кафе "Пушкинъ"',
    category: 'Ресторан',
    rating: 4.8,
    reviews: 892,
    distance: '0.3 км',
    verified: true,
    safetyZone: 'safe',
    image: '🍽️',
    audioAvailable: false,
    description: 'Легендарный ресторан русской кухни с аутентичной атмосферой XIX века.',
  },
];

export const routes = [
  {
    id: 1,
    title: 'Классический Петербург',
    description: 'Главные достопримечательности центра города за один день',
    duration: '4-5 часов',
    distance: '8.5 км',
    difficulty: 'Легкий',
    image: '🏛️',
    rating: 4.9,
    reviews: 1247,
    stops: 8,
    category: 'Культура',
    isFavorite: false,
    points: [
      { id: 1, name: 'Дворцовая площадь', time: '30 мин', emoji: '🏰' },
      { id: 2, name: 'Эрмитаж', time: '90 мин', emoji: '🎨' },
      { id: 3, name: 'Невский проспект', time: '45 мин', emoji: '🚶' },
      { id: 4, name: 'Казанский собор', time: '20 мин', emoji: '⛪' },
      { id: 5, name: 'Храм Спаса на Крови', time: '30 мин', emoji: '🕌' },
      { id: 6, name: 'Марсово поле', time: '15 мин', emoji: '🌳' },
      { id: 7, name: 'Летний сад', time: '30 мин', emoji: '🌿' },
      { id: 8, name: 'Михайловский замок', time: '20 мин', emoji: '🏰' }
    ]
  },
  {
    id: 2,
    title: 'Романтика Петербурга',
    description: 'Живописные места для прогулок и фотографий',
    duration: '3-4 часа',
    distance: '5.2 км',
    difficulty: 'Легкий',
    image: '💕',
    rating: 4.8,
    reviews: 892,
    stops: 6,
    category: 'Романтика',
    isFavorite: true,
    points: [
      { id: 1, name: 'Дворцовый мост', time: '20 мин', emoji: '🌉' },
      { id: 2, name: 'Стрелка Васильевского острова', time: '30 мин', emoji: '🏛️' },
      { id: 3, name: 'Набережная Мойки', time: '40 мин', emoji: '🛶' },
      { id: 4, name: 'Исаакиевский собор', time: '45 мин', emoji: '⛪' },
      { id: 5, name: 'Юсуповский сад', time: '30 мин', emoji: '🌳' },
      { id: 6, name: 'Набережная Фонтанки', time: '25 мин', emoji: '💧' }
    ]
  },
  {
    id: 3,
    title: 'Петербург Достоевского',
    description: 'Литературный маршрут по местам из романов писателя',
    duration: '5-6 часов',
    distance: '10.3 км',
    difficulty: 'Средний',
    image: '📚',
    rating: 4.7,
    reviews: 567,
    stops: 10,
    category: 'Литература',
    isFavorite: false,
    points: [
      { id: 1, name: 'Дом Раскольникова', time: '25 мин', emoji: '🏚️' },
      { id: 2, name: 'Сенная площадь', time: '20 мин', emoji: '🏛️' },
      { id: 3, name: 'Канал Грибоедова', time: '30 мин', emoji: '🌊' },
      { id: 4, name: 'Дом старухи-процентщицы', time: '15 мин', emoji: '🏘️' },
      { id: 5, name: 'Кокушкин мост', time: '10 мин', emoji: '🌉' },
      { id: 6, name: 'Вознесенский проспект', time: '25 мин', emoji: '🚶' },
      { id: 7, name: 'Музей Достоевского', time: '60 мин', emoji: '📖' },
      { id: 8, name: 'Владимирская площадь', time: '15 мин', emoji: '⛪' },
      { id: 9, name: 'Кузнечный переулок', time: '20 мин', emoji: '🔨' },
      { id: 10, name: 'Некрополь мастеров искусств', time: '30 мин', emoji: '🪦' }
    ]
  },
  {
    id: 4,
    title: 'Гастрономический тур',
    description: 'Лучшие рестораны и кафе с русской кухней',
    duration: '6-7 часов',
    distance: '4.8 км',
    difficulty: 'Легкий',
    image: '🍽️',
    rating: 4.9,
    reviews: 1034,
    stops: 5,
    category: 'Еда',
    isFavorite: true,
    points: [
      { id: 1, name: 'Кафе "Пушкинъ"', time: '90 мин', emoji: '☕' },
      { id: 2, name: 'Ресторан "Палкинъ"', time: '120 мин', emoji: '🍴' },
      { id: 3, name: 'Пышечная на Большой Конюшенной', time: '20 мин', emoji: '🥐' },
      { id: 4, name: 'Чайная "Придворная кондитерская"', time: '60 мин', emoji: '🍰' },
      { id: 5, name: 'Ресторан "Теремокъ"', time: '90 мин', emoji: '🥞' }
    ]
  },
  {
    id: 5,
    title: 'Парки и сады',
    description: 'Зелёные оазисы города для отдыха и прогулок',
    duration: '4 часа',
    distance: '12.5 км',
    difficulty: 'Средний',
    image: '🌳',
    rating: 4.6,
    reviews: 723,
    stops: 7,
    category: 'Природа',
    isFavorite: false,
    points: [
      { id: 1, name: 'Летний сад', time: '45 мин', emoji: '🌿' },
      { id: 2, name: 'Михайловский сад', time: '30 мин', emoji: '🏞️' },
      { id: 3, name: 'Таврический сад', time: '40 мин', emoji: '🌲' },
      { id: 4, name: 'Екатерингофский парк', time: '35 мин', emoji: '🍃' },
      { id: 5, name: 'Юсуповский сад', time: '30 мин', emoji: '🌺' },
      { id: 6, name: 'Александровский парк', time: '40 мин', emoji: '🦁' },
      { id: 7, name: 'Парк 300-летия', time: '50 мин', emoji: '⛲' }
    ]
  },
  {
    id: 6,
    title: 'Ночной Петербург',
    description: 'Развод мостов и ночная подсветка достопримечательностей',
    duration: '3 часа',
    distance: '6.2 км',
    difficulty: 'Легкий',
    image: '🌙',
    rating: 5.0,
    reviews: 1521,
    stops: 5,
    category: 'Вечерний',
    isFavorite: true,
    points: [
      { id: 1, name: 'Дворцовый мост', time: '40 мин', emoji: '🌉' },
      { id: 2, name: 'Троицкий мост', time: '30 мин', emoji: '🌃' },
      { id: 3, name: 'Литейный мост', time: '25 мin', emoji: '🏙️' },
      { id: 4, name: 'Благовещенский мост', time: '30 мин', emoji: '✨' },
      { id: 5, name: 'Дворцовая набережная', time: '45 мин', emoji: '🌟' }
    ]
  }
];

export const menuItems = [
  { id: 'home', name: 'Главная', emoji: '🏠' },
  { id: 'map', name: 'Карта', emoji: '🗺️' },
  { id: 'routes', name: 'Маршруты', emoji: '🗺️' },
  { id: 'events', name: 'Афиша / События', emoji: '🎭' },
  { id: 'quests', name: 'Квесты', emoji: '🎯' },
  { id: 'lost', name: 'Потеряшки', emoji: '🔍' },
  { id: 'news', name: 'Новости', emoji: '📰' },
  { id: 'sos', name: 'SOS Помощь', emoji: '🚨' },
  { id: 'faq', name: 'Вопросы и ответы', emoji: '❓' },
  { id: 'documents', name: 'Документы / Памятки', emoji: '📄' },
  { id: 'profile', name: 'Профиль', emoji: '👤' }
];

export const quests = [
  {
    id: 1,
    title: 'Исследователь Петербурга',
    description: 'Посетите 10 музеев города',
    progress: 7,
    total: 10,
    reward: '500 бонусов',
    emoji: '🏛️',
    category: 'Музеи'
  },
  {
    id: 2,
    title: 'Гурман',
    description: 'Попробуйте блюда в 5 ресторанах русской кухни',
    progress: 3,
    total: 5,
    reward: '300 бонусов',
    emoji: '🍽️',
    category: 'Рестораны'
  },
  {
    id: 3,
    title: 'Театральный ценитель',
    description: 'Посетите 3 театральных представления',
    progress: 1,
    total: 3,
    reward: '400 бонусов',
    emoji: '🎭',
    category: 'Театр'
  },
  {
    id: 4,
    title: 'Знаток парков',
    description: 'Прогуляйтесь по 8 паркам города',
    progress: 5,
    total: 8,
    reward: '250 бонусов',
    emoji: '🌳',
    category: 'Парки'
  },
  {
    id: 5,
    title: 'Помощник',
    description: 'Помогите найти 5 потерянных вещей',
    progress: 2,
    total: 5,
    reward: '600 бонусов',
    emoji: '🔍',
    category: 'Потеряшки'
  },
  {
    id: 6,
    title: 'Фотограф',
    description: 'Сделайте фото в 15 знаковых местах',
    progress: 8,
    total: 15,
    reward: '700 бонусов',
    emoji: '📸',
    category: 'Общее'
  }
];

export const news = [
  {
    id: 1,
    title: 'Открытие нового крыла Эрмитажа',
    description: 'В Эрмитаже открылось новое крыло, посвященное искусству Древней Греции.',
    date: '27 янв 2026',
    image: '🏛️',
    category: 'Культура'
  },
  {
    id: 2,
    title: 'Фестиваль "Белые ночи" 2026',
    description: 'Анонсирована программа летнего фестиваля "Белые ночи". Ожидается участие мировых звезд.',
    date: '26 янв 2026',
    image: '🎭',
    category: 'События'
  },
  {
    id: 3,
    title: 'Новые парковки в центре',
    description: 'В историческом центре города открылись три новые парковки для туристов.',
    date: '25 янв 2026',
    image: '🚗',
    category: 'Инфраструктура'
  },
  {
    id: 4,
    title: 'Реставрация Исаакиевского собора',
    description: 'Началась масштабная реставрация главного купола Исаакиевского собора.',
    date: '24 янв 2026',
    image: '⛪',
    category: 'Культура'
  },
  {
    id: 5,
    title: 'Скидки для туристов',
    description: 'Многие музеи и рестораны запустили специальные предложения для туристов до конца февраля.',
    date: '23 янв 2026',
    image: '💰',
    category: 'Акции'
  }
];