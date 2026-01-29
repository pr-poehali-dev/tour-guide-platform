import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { routes as routesData, menuItems } from '@/data/appData';

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'map' | 'object' | 'lost' | 'profile' | 'search' | 'events' | 'event' | 'quests' | 'news' | 'sos' | 'faq' | 'documents' | 'routes' | 'route' | 'favorites' | 'category'>('home');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Эрмитаж', 'Летний сад', 'Рестораны у Невского']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsOffline, setEventsOffline] = useState(false);
  const [eventDateFilter, setEventDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [eventTypeFilter, setEventTypeFilter] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('ДНР');
  const [selectedCity, setSelectedCity] = useState('Донецк');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [routeFilters, setRouteFilters] = useState<string[]>([]);
  const [favoriteTab, setFavoriteTab] = useState<'objects' | 'routes' | 'collections'>('objects');
  const [favoriteSearchQuery, setFavoriteSearchQuery] = useState('');
  const [routes, setRoutes] = useState(routesData);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [categoryNotifications, setCategoryNotifications] = useState({
    museums: true,
    parks: true,
    restaurants: true,
    entertainment: true,
    lost: true
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [routeSearchQuery, setRouteSearchQuery] = useState('');

  const regions = {
    'ДНР': ['Донецк', 'Макеевка', 'Мариуполь', 'Шахтёрск', 'Снежное', 'Харцызск', 'Енакиево', 'Дебальцево', 'Мангуш', 'Новоазовск', 'Старобешево', 'Волноваха', 'Горловка', 'Амвросиевка', 'Тельманово', 'Зугрэс', 'Мелекино', 'Ялта', 'Урзуф', 'Володарское', 'Ясиноватая', 'Торез', 'Иловайск'],
    'ЛНР': ['Луганск'],
    'Херсонская область': ['Херсон'],
    'Запорожская область': ['Запорожье'],
    'Крым': ['Симферополь', 'Севастополь', 'Ялта', 'Керчь', 'Евпатория', 'Феодосия'],
    'Ростовская область': ['Ростов-на-Дону', 'Таганрог', 'Шахты', 'Новочеркасск', 'Волгодонск'],
    'Краснодарский край': ['Краснодар', 'Сочи', 'Новороссийск', 'Анапа', 'Геленджик']
  };

  const lostItems = [
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

  const categories = [
    { id: 1, name: 'Музеи', icon: 'Building2', count: 24, gradient: 'from-[#A62531] to-[#8B1E28]' },
    { id: 2, name: 'Парки', icon: 'TreePine', count: 18, gradient: 'from-[#171B1F] to-[#2C3238]' },
    { id: 3, name: 'Рестораны', icon: 'UtensilsCrossed', count: 156, gradient: 'from-[#A62531] to-[#171B1F]' },
    { id: 4, name: 'Развлечения', icon: 'Sparkles', count: 42, gradient: 'from-[#8B1E28] to-[#A62531]' },
  ];

  const events = [
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
      verified: true,
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

  const objects = [
    {
      id: 1,
      name: 'Донецкий республиканский областной художественный музей',
      category: 'Музей',
      rating: 4.9,
      reviews: 847,
      distance: '1.2 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎨',
      audioAvailable: true,
      description: 'Крупнейший художественный музей Донбасса с богатой коллекцией живописи и скульптуры.',
    },
    {
      id: 2,
      name: 'Центральный парк культуры и отдыха имени А. С. Щербакова',
      category: 'Парк',
      rating: 4.8,
      reviews: 1523,
      distance: '0.8 км',
      verified: true,
      safetyZone: 'safe',
      image: '🌳',
      audioAvailable: true,
      description: 'Главный парк Донецка с аттракционами, зелёными аллеями и зонами отдыха для всей семьи.',
    },
    {
      id: 3,
      name: 'Татарочка',
      category: 'Ресторан',
      rating: 4.7,
      reviews: 392,
      distance: '0.5 км',
      verified: true,
      safetyZone: 'safe',
      image: '🍽️',
      audioAvailable: false,
      description: 'Ресторан татарской кухни с домашней атмосферой и аутентичными блюдами.',
    },
    {
      id: 4,
      name: 'Парк кованых фигур',
      category: 'Парк',
      rating: 4.9,
      reviews: 1247,
      distance: '1.5 км',
      verified: true,
      safetyZone: 'safe',
      image: '⚒️',
      audioAvailable: true,
      description: 'Уникальный парк с коллекцией кованых скульптур и арт-объектов под открытым небом.',
    },
    {
      id: 5,
      name: 'Хмели-летели',
      category: 'Ресторан',
      rating: 4.6,
      reviews: 567,
      distance: '0.7 км',
      verified: true,
      safetyZone: 'safe',
      image: '🍺',
      audioAvailable: false,
      description: 'Пивной ресторан с широким выбором напитков и европейской кухней.',
    },
    {
      id: 6,
      name: 'Донецкий государственный академический театр оперы и балета имени А. Б. Соловьяненко',
      category: 'Развлечение',
      rating: 5.0,
      reviews: 934,
      distance: '2.1 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎭',
      audioAvailable: true,
      description: 'Главный оперный театр Донбасса с богатой историей и великолепными постановками.',
    },
    {
      id: 7,
      name: 'Парк славянской культуры и письменности',
      category: 'Парк',
      rating: 4.7,
      reviews: 678,
      distance: '2.3 км',
      verified: true,
      safetyZone: 'safe',
      image: '📖',
      audioAvailable: true,
      description: 'Культурно-исторический парк, посвящённый славянской письменности и культуре.',
    },
    {
      id: 8,
      name: 'Чача Пури',
      category: 'Ресторан',
      rating: 4.8,
      reviews: 423,
      distance: '1.1 км',
      verified: true,
      safetyZone: 'safe',
      image: '🇬🇪',
      audioAvailable: false,
      description: 'Ресторан грузинской кухни с хачапури, хинкали и другими традиционными блюдами.',
    },
    {
      id: 9,
      name: 'Донецкий республиканский краеведческий музей',
      category: 'Музей',
      rating: 4.7,
      reviews: 512,
      distance: '1.4 км',
      verified: true,
      safetyZone: 'safe',
      image: '🏛️',
      audioAvailable: true,
      description: 'Музей истории Донбасса с экспозициями о природе, археологии и культуре региона.',
    },
    {
      id: 10,
      name: 'Цирк "Космос"',
      category: 'Развлечение',
      rating: 4.9,
      reviews: 1156,
      distance: '1.8 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎪',
      audioAvailable: false,
      description: 'Донецкий цирк с яркими представлениями и программами для всей семьи.',
    },
    {
      id: 11,
      name: 'Штальман',
      category: 'Ресторан',
      rating: 4.8,
      reviews: 689,
      distance: '0.9 км',
      verified: true,
      safetyZone: 'safe',
      image: '🥩',
      audioAvailable: false,
      description: 'Стейк-хаус с премиальным мясом и авторскими блюдами.',
    },
    {
      id: 12,
      name: 'Парк "Гуливер"',
      category: 'Парк',
      rating: 4.6,
      reviews: 834,
      distance: '2.7 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎢',
      audioAvailable: false,
      description: 'Семейный парк развлечений с аттракционами и игровыми площадками.',
    },
    {
      id: 13,
      name: 'Аквапарк «Аквасфера»',
      category: 'Развлечение',
      rating: 4.8,
      reviews: 1423,
      distance: '3.2 км',
      verified: true,
      safetyZone: 'safe',
      image: '🏊',
      audioAvailable: false,
      description: 'Современный аквапарк с горками, бассейнами и зонами отдыха.',
    },
    {
      id: 14,
      name: 'Дивино',
      category: 'Ресторан',
      rating: 4.7,
      reviews: 345,
      distance: '1.3 км',
      verified: true,
      safetyZone: 'safe',
      image: '🍷',
      audioAvailable: false,
      description: 'Ресторан итальянской кухни с винной картой и уютной атмосферой.',
    },
    {
      id: 15,
      name: 'Художественный музей Арт-Донбасс',
      category: 'Музей',
      rating: 4.6,
      reviews: 267,
      distance: '1.7 км',
      verified: true,
      safetyZone: 'safe',
      image: '🖼️',
      audioAvailable: true,
      description: 'Современный художественный музей с выставками местных и зарубежных художников.',
    },
    {
      id: 16,
      name: 'Вулкан Парк',
      category: 'Развлечение',
      rating: 4.5,
      reviews: 892,
      distance: '2.5 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎰',
      audioAvailable: false,
      description: 'Развлекательный центр с игровыми автоматами и зонами отдыха.',
    },
    {
      id: 17,
      name: 'Кинотеатр "Звёздочка"',
      category: 'Развлечение',
      rating: 4.7,
      reviews: 634,
      distance: '1.0 км',
      verified: true,
      safetyZone: 'safe',
      image: '🎬',
      audioAvailable: false,
      description: 'Современный кинотеатр с удобными залами и новинками проката.',
    },
  ];

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-24">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <img 
              src="https://cdn.poehali.dev/files/64a49d6f-83f4-44d5-b7da-71b61d2d24f4.jpg" 
              alt="OTA Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                OTAguide
              </h1>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedCity}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 px-1 text-xs text-primary"
                  onClick={() => setLocationModalOpen(true)}
                >
                  изменить
                </Button>
              </div>
            </div>
            <div className="w-10"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Музеи, парки, рестораны..." 
                className="pl-10 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
                onFocus={() => setActiveView('search')}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-12 w-12 rounded-full flex-shrink-0"
              onClick={() => setActiveView('favorites')}
            >
              <Icon name="Heart" size={24} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => {
                setSelectedCategory(cat.name);
                setActiveView('category');
              }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${cat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <Icon name={cat.icon as any} size={26} />
              </div>
              <span className="text-xs font-medium text-center">{cat.name}</span>
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Специальные предложения</h2>
            <Button variant="link" className="text-primary text-sm p-0">
              Всё <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            <Card 
              className="min-w-[85%] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow snap-start border-2 border-primary/20"
              onClick={() => setActiveView('events')}
            >
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-to-r from-[#A62531] via-[#8B1E28] to-[#171B1F] flex items-center justify-between px-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-9xl">🎭</div>
                  </div>
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white border-0 mb-2">
                      <Icon name="Sparkles" size={12} className="mr-1" />
                      Популярное
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">Афиша / События</h3>
                    <p className="text-sm text-white/90 mb-3">Концерты, выставки, театры</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>Сегодня {events.filter(e => e.date === '28 янв').length} событий</span>
                    </div>
                  </div>
                  <div className="text-5xl relative z-10">🎫</div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-[85%] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow snap-start">
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-to-br from-[#A62531] to-[#8B1E28] flex items-center justify-between px-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -bottom-8 -right-8 text-9xl">%</div>
                  </div>
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white border-0 mb-2">
                      <Icon name="Zap" size={12} className="mr-1" />
                      Выгодно
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">Акции</h3>
                    <p className="text-sm text-white/90 mb-3">Скидки до 50% в ресторанах и музеях</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Tag" size={14} />
                      <span>12 активных предложений</span>
                    </div>
                  </div>
                  <div className="text-5xl relative z-10">🎁</div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-[85%] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow snap-start">
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-to-br from-[#171B1F] to-[#2C3238] flex items-center justify-between px-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-9xl">📅</div>
                  </div>
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white border-0 mb-2">
                      <Icon name="Star" size={12} className="mr-1" />
                      Рекомендуем
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">Мероприятия</h3>
                    <p className="text-sm text-white/90 mb-3">Квесты, фестивали, мастер-классы</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>На этой неделе 8 событий</span>
                    </div>
                  </div>
                  <div className="text-5xl relative z-10">🎪</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Рекомендуем для вас</h2>
            <Button variant="link" className="text-primary text-sm p-0">
              Всё <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {objects.filter(obj => [6, 10, 13, 17].includes(obj.id)).map((obj) => (
              <Card 
                key={obj.id}
                className="min-w-[280px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-4">
                  <div className="text-5xl mb-3">{obj.image}</div>
                  <h3 className="font-bold mb-1 line-clamp-2">{obj.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span className="font-medium">{obj.rating}</span>
                      <span className="text-muted-foreground">({obj.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">{obj.distance}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Популярное сейчас</h2>
            <Button variant="link" className="text-primary text-sm p-0">
              Всё <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {objects.filter(obj => [1, 2, 4, 7, 9].includes(obj.id)).map((obj) => (
              <Card 
                key={obj.id}
                className="min-w-[280px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-4">
                  <div className="text-5xl mb-3">{obj.image}</div>
                  <h3 className="font-bold mb-1 line-clamp-2">{obj.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span className="font-medium">{obj.rating}</span>
                      <span className="text-muted-foreground">({obj.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">{obj.distance}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Рядом с вами</h2>
            <Badge variant="secondary" className="gradient-accent text-white">
              <Icon name="Navigation" size={14} className="mr-1" />
              В радиусе 3 км
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {objects.filter(obj => [3, 5, 8, 11, 14].includes(obj.id)).map((obj) => (
              <Card 
                key={obj.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{obj.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold line-clamp-1">{obj.name}</h3>
                        {obj.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span className="font-medium">{obj.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Navigation" size={14} />
                          <span>{obj.distance}</span>
                        </div>
                        {obj.audioAvailable && (
                          <Badge variant="outline" className="border-primary text-primary text-xs">
                            <Icon name="Headphones" size={10} className="mr-1" />
                            Аудио
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="gradient-primary text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Icon name="MapPinned" size={48} />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Карта рядом со мной</h3>
                <p className="text-sm opacity-90">Найдите интересные места поблизости</p>
              </div>
              <Button 
                variant="secondary" 
                size="lg"
                className="rounded-full"
                onClick={() => setActiveView('map')}
              >
                Открыть
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Рекомендуем для вас</h2>
            <Button variant="link" className="text-primary text-sm p-0">
              Ещё <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { name: 'Петергоф', emoji: '⛲', type: 'Дворец', rating: 4.9 },
              { name: 'Мариинский театр', emoji: '🎭', type: 'Театр', rating: 4.8 },
              { name: 'Невский проспект', emoji: '🏙️', type: 'Улица', rating: 4.7 }
            ].map((place, i) => (
              <Card key={i} className="min-w-[240px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl mb-2">{place.emoji}</div>
                  <h3 className="font-bold text-sm mb-1">{place.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{place.type}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Icon name="Star" size={12} className="text-yellow-500" />
                    <span className="font-medium">{place.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Рядом с вами</h2>
            <Badge variant="secondary" className="gradient-accent text-white">
              <Icon name="Navigation" size={14} className="mr-1" />
              1.2 км
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {objects.slice(0, 2).map((obj) => (
              <Card 
                key={obj.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{obj.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{obj.name}</h3>
                        {obj.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span className="font-medium">{obj.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Navigation" size={14} />
                          <span>{obj.distance}</span>
                        </div>
                        {obj.audioAvailable && (
                          <Badge variant="outline" className="border-primary text-primary text-xs">
                            <Icon name="Headphones" size={10} className="mr-1" />
                            Аудио
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="gradient-primary text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Скачайте город офлайн</h3>
                <p className="text-white/90 text-sm mb-4">
                  Пользуйтесь картами и аудиогидами без интернета
                </p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать Санкт-Петербург
                </Button>
              </div>
              <Icon name="MapPin" size={64} className="opacity-20" />
            </div>
          </CardContent>
        </Card>

        <div className="bg-white border-t pt-6 -mx-4 px-4 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-sm mb-3">О сервисе</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><button className="hover:text-primary">О нас</button></li>
                  <li><button className="hover:text-primary">Команда</button></li>
                  <li><button className="hover:text-primary">Партнёры</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-3">Документы</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><button className="hover:text-primary">Пользовательское соглашение</button></li>
                  <li><button className="hover:text-primary">Политика конфиденциальности</button></li>
                  <li><button className="hover:text-primary">Условия использования</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-bold text-sm mb-3">Поддержка</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <button className="flex items-center gap-2 hover:text-primary">
                  <Icon name="Mail" size={16} />
                  support@otaguide.ru
                </button>
                <button className="flex items-center gap-2 hover:text-primary">
                  <Icon name="MessageCircle" size={16} />
                  Онлайн-чат
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2026 OTAguide. Все права защищены. Версия 1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('home')}
            >
              <Icon name="Home" size={24} className="text-primary" />
              <span className="text-xs font-medium">Главная</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('map')}
            >
              <Icon name="Map" size={24} />
              <span className="text-xs">Карта</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('routes')}
            >
              <Icon name="Route" size={24} />
              <span className="text-xs">Маршруты</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('lost')}
            >
              <Icon name="Search" size={24} />
              <span className="text-xs">Потеряшки</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('profile')}
            >
              <Icon name="User" size={24} />
              <span className="text-xs">Профиль</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h2 className="font-bold text-lg">Карта</h2>
            <Button variant="ghost" size="icon">
              <Icon name="Filter" size={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative h-[calc(100vh-140px)]">
        <img 
          src="https://cdn.poehali.dev/projects/786dd0b8-782a-4dcd-b737-2f176ce8049c/bucket/f59cec38-2f76-44dd-807f-4b150a124f99.jpg" 
          alt="Карта Донецка"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4 right-4 z-10">
          <Input 
            placeholder="Поиск адреса на карте..." 
            className="bg-white shadow-lg border-0"
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Зоны безопасности</span>
              <Button variant="ghost" size="sm">
                <Icon name="Info" size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-safety-safe" />
                <span className="text-sm">Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-safety-warning" />
                <span className="text-sm">Осторожно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-safety-danger" />
                <span className="text-sm">Опасно</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          size="icon"
          className="absolute top-20 right-4 z-10 rounded-full h-12 w-12 gradient-primary shadow-lg"
        >
          <Icon name="Navigation" size={24} />
        </Button>

        <Button 
          size="icon"
          variant="destructive"
          className="absolute top-36 right-4 z-10 rounded-full h-12 w-12 shadow-lg animate-pulse-glow"
        >
          <Icon name="AlertTriangle" size={24} />
        </Button>
      </div>
    </div>
  );

  const renderObject = () => {
    if (!selectedObject) return null;

    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveView('home')}
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Share2" size={24} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Heart" size={24} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Star" size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative h-64 gradient-primary flex items-center justify-center text-white">
            <div className="text-9xl opacity-50">{selectedObject.image}</div>
            {selectedObject.verified && (
              <Badge className="absolute top-4 right-4 bg-white text-primary">
                <Icon name="BadgeCheck" size={16} className="mr-1" />
                Проверено
              </Badge>
            )}
          </div>

          <div className="px-4 py-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{selectedObject.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{selectedObject.rating}</span>
                  <span className="text-muted-foreground">({selectedObject.reviews} отзывов)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Navigation" size={16} />
                  <span>{selectedObject.distance}</span>
                </div>
              </div>
            </div>

            {selectedObject.audioAvailable && (
              <Card className="gradient-accent text-white overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Button 
                        size="icon" 
                        variant="secondary"
                        className="rounded-full h-12 w-12"
                        onClick={() => setAudioPlaying(!audioPlaying)}
                      >
                        <Icon name={audioPlaying ? "Pause" : "Play"} size={24} />
                      </Button>
                      <div>
                        <p className="font-semibold">Аудиоэкскурсия</p>
                        <p className="text-sm opacity-90">12:34 мин</p>
                      </div>
                    </div>
                    <Icon name="Headphones" size={32} className="opacity-50" />
                  </div>
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="font-bold text-lg mb-2">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedObject.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="gradient-primary h-12">
                <Icon name="Navigation" size={20} className="mr-2" />
                Как добраться
              </Button>
              <Button variant="outline" className="h-12">
                <Icon name="MapPin" size={20} className="mr-2" />
                На карте
              </Button>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="info">Информация</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                <TabsTrigger value="photos">Фото</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Часы работы</p>
                      <p className="text-sm text-muted-foreground">10:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Телефон</p>
                      <p className="text-sm text-muted-foreground">+7 (812) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Globe" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Сайт</p>
                      <p className="text-sm text-muted-foreground">example.com</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-center text-muted-foreground py-8">
                  Отзывы появятся здесь
                </p>
              </TabsContent>
              <TabsContent value="photos" className="mt-4">
                <p className="text-center text-muted-foreground py-8">
                  Фотографии появятся здесь
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  const renderLost = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-xl font-bold">Потеряшки</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <Card className="gradient-primary text-white overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Нашли или потеряли?</h2>
            <p className="text-white/90 mb-4">
              Помогите вернуть потерянное или найдите своё
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1 bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  const section = document.getElementById('lost-form');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon name="Search" size={18} className="mr-2" />
                Я потерял
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1 bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  const section = document.getElementById('lost-form');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon name="CheckCircle" size={18} className="mr-2" />
                Я нашел
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Всё
            </TabsTrigger>
            <TabsTrigger value="people" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Люди
            </TabsTrigger>
            <TabsTrigger value="things" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Вещи
            </TabsTrigger>
            <TabsTrigger value="animals" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Животные
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {lostItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge 
                            variant={item.type === 'lost' ? 'destructive' : 'default'}
                            className="mb-2"
                          >
                            {item.type === 'lost' ? 'Потерян' : 'Найден'}
                          </Badge>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="people" className="space-y-4 mt-6">
            {lostItems.filter(item => item.category === 'Люди').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge 
                            variant={item.type === 'lost' ? 'destructive' : 'default'}
                            className="mb-2"
                          >
                            {item.type === 'lost' ? 'Потерян' : 'Найден'}
                          </Badge>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="things" className="space-y-4 mt-6">
            {lostItems.filter(item => item.category === 'Вещи').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge 
                            variant={item.type === 'lost' ? 'destructive' : 'default'}
                            className="mb-2"
                          >
                            {item.type === 'lost' ? 'Потерян' : 'Найден'}
                          </Badge>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="animals" className="space-y-4 mt-6">
            {lostItems.filter(item => item.category === 'Животные').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge 
                            variant={item.type === 'lost' ? 'destructive' : 'default'}
                            className="mb-2"
                          >
                            {item.type === 'lost' ? 'Потерян' : 'Найден'}
                          </Badge>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card id="lost-form" className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Подать объявление</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Тип объявления</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                    <Icon name="Search" size={24} className="text-primary" />
                    <span>Я потерял</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                    <span>Я нашел</span>
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Категория</label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                    <span className="text-2xl">👤</span>
                    <span className="text-xs">Люди</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                    <span className="text-2xl">📱</span>
                    <span className="text-xs">Вещи</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                    <span className="text-2xl">🐕</span>
                    <span className="text-xs">Животные</span>
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Название</label>
                <Input placeholder="Например: Чёрный кожаный кошелёк" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Описание</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background resize-none"
                  placeholder="Опишите подробно, где и когда потеряли/нашли..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Место</label>
                <Input placeholder="Где именно? (улица, район)" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Дата</label>
                <Input type="date" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Контакты</label>
                <Input placeholder="Телефон или Telegram" />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 h-12">
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать объявление
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('home')}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs">Главная</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('map')}
            >
              <Icon name="Map" size={24} />
              <span className="text-xs">Карта</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
              onClick={() => setActiveView('lost')}
            >
              <Icon name="Search" size={24} className="text-primary" />
              <span className="text-xs font-medium">Потеряшки</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 gap-1"
            >
              <Icon name="User" size={24} />
              <span className="text-xs">Профиль</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [categoryNotifications, setCategoryNotifications] = useState({
      museums: true,
      parks: true,
      restaurants: true,
      entertainment: true,
      lost: true
    });
    const [selectedLanguage, setSelectedLanguage] = useState('ru');
    const [selectedCurrency, setSelectedCurrency] = useState('RUB');

    const languages = [
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];

    const currencies = [
      { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
      { code: 'USD', name: 'Доллар США', symbol: '$' },
      { code: 'EUR', name: 'Евро', symbol: '€' },
      { code: 'GBP', name: 'Фунт стерлингов', symbol: '£' },
      { code: 'CNY', name: 'Китайский юань', symbol: '¥' }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-center">Профиль</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4 pb-24">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[#8B1E28] flex items-center justify-center text-white text-3xl font-bold">
                  АИ
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">Алексей Иванов</h2>
                  <p className="text-sm text-muted-foreground">alex.ivanov@example.com</p>
                  <Badge variant="secondary" className="mt-2">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {selectedCity}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Icon name="Settings" size={18} className="mr-2" />
                Редактировать профиль
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y">
                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Icon name="Heart" size={20} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Избранное</h3>
                      <p className="text-sm text-muted-foreground">15 объектов</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon name="History" size={20} className="text-gray-700" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">История</h3>
                      <p className="text-sm text-muted-foreground">Посещённые места</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon name="Download" size={20} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Офлайн-карты</h3>
                      <p className="text-sm text-muted-foreground">2 города загружено</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Globe" size={20} />
                Язык и регион
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Язык интерфейса</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Валюта</label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Выбранный язык: <span className="font-medium text-foreground">{languages.find(l => l.code === selectedLanguage)?.name}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Валюта: <span className="font-medium text-foreground">{currencies.find(c => c.code === selectedCurrency)?.name} ({currencies.find(c => c.code === selectedCurrency)?.symbol})</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Bell" size={20} />
                Настройки уведомлений
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Все уведомления</h3>
                    <p className="text-sm text-muted-foreground">Главный переключатель</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notificationsEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {notificationsEnabled && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-muted-foreground">Уведомления по категориям</h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Музеи</span>
                      <button
                        onClick={() => setCategoryNotifications({...categoryNotifications, museums: !categoryNotifications.museums})}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          categoryNotifications.museums ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            categoryNotifications.museums ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Парки</span>
                      <button
                        onClick={() => setCategoryNotifications({...categoryNotifications, parks: !categoryNotifications.parks})}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          categoryNotifications.parks ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            categoryNotifications.parks ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Рестораны</span>
                      <button
                        onClick={() => setCategoryNotifications({...categoryNotifications, restaurants: !categoryNotifications.restaurants})}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          categoryNotifications.restaurants ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            categoryNotifications.restaurants ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Развлечения</span>
                      <button
                        onClick={() => setCategoryNotifications({...categoryNotifications, entertainment: !categoryNotifications.entertainment})}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          categoryNotifications.entertainment ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            categoryNotifications.entertainment ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Потеряшки</span>
                      <button
                        onClick={() => setCategoryNotifications({...categoryNotifications, lost: !categoryNotifications.lost})}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          categoryNotifications.lost ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            categoryNotifications.lost ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y">
                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" size={20} className="text-gray-700" />
                    <div className="text-left">
                      <h3 className="font-semibold">Приватность и безопасность</h3>
                      <p className="text-sm text-muted-foreground">Управление данными</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="HelpCircle" size={20} className="text-gray-700" />
                    <div className="text-left">
                      <h3 className="font-semibold">Помощь и поддержка</h3>
                      <p className="text-sm text-muted-foreground">FAQ, контакты</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>

                <button 
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(true)}
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Menu" size={20} className="text-gray-700" />
                    <div className="text-left">
                      <h3 className="font-semibold">Все разделы</h3>
                      <p className="text-sm text-muted-foreground">Меню приложения</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>

                <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Info" size={20} className="text-gray-700" />
                    <div className="text-left">
                      <h3 className="font-semibold">О приложении</h3>
                      <p className="text-sm text-muted-foreground">Версия 1.0.0</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4 text-red-600 flex items-center gap-2">
                <Icon name="AlertTriangle" size={20} />
                Опасная зона
              </h2>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-orange-600 border-orange-300 hover:bg-orange-50">
                  <Icon name="UserX" size={18} className="mr-2" />
                  Деактивировать аккаунт
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Удалить аккаунт навсегда
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <Button 
                variant="ghost" 
                className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти из аккаунта
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-around">
              <Button 
                variant="ghost" 
                className="flex-col h-auto py-2 gap-1"
                onClick={() => setActiveView('home')}
              >
                <Icon name="Home" size={24} />
                <span className="text-xs">Главная</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex-col h-auto py-2 gap-1"
                onClick={() => setActiveView('map')}
              >
                <Icon name="Map" size={24} />
                <span className="text-xs">Карта</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex-col h-auto py-2 gap-1"
                onClick={() => setActiveView('lost')}
              >
                <Icon name="Search" size={24} />
                <span className="text-xs">Потеряшки</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex-col h-auto py-2 gap-1"
                onClick={() => setActiveView('profile')}
              >
                <Icon name="User" size={24} className="text-primary" />
                <span className="text-xs font-medium">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    const suggestions = [
      { text: 'Эрмитаж', type: 'Музей', icon: '🏛️' },
      { text: 'Летний сад', type: 'Парк', icon: '🌳' },
      { text: 'Петергоф', type: 'Дворец', icon: '⛲' },
      { text: 'Мариинский театр', type: 'Театр', icon: '🎭' },
      { text: 'Исаакиевский собор', type: 'Храм', icon: '⛪' },
      { text: 'Невский проспект', type: 'Улица', icon: '🏙️' }
    ];

    const allObjects = [
      ...objects,
      { id: 4, name: 'Петергоф', category: 'Дворец', rating: 4.9, reviews: 3421, distance: '12.3 км', image: '⛲', verified: true, audioAvailable: true },
      { id: 5, name: 'Исаакиевский собор', category: 'Храм', rating: 4.8, reviews: 2156, distance: '2.1 км', image: '⛪', verified: true, audioAvailable: true },
      { id: 6, name: 'Невский проспект', category: 'Улица', rating: 4.7, reviews: 1876, distance: '0.5 км', image: '🏙️', verified: true, audioAvailable: false }
    ];

    const filters = ['Музеи', 'Парки', 'Рестораны', 'Развлечения', 'С аудиогидом', 'Рядом со мной'];

    const filteredResults = searchQuery 
      ? allObjects.filter(obj => 
          obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          obj.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (query && !searchHistory.includes(query)) {
        setSearchHistory([query, ...searchHistory.slice(0, 4)]);
      }
    };

    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setActiveView('home');
                  setSearchQuery('');
                }}
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Поиск мест, маршрутов, событий..." 
                  className="pl-10 pr-10 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery('')}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <Badge
                  key={filter}
                  variant={selectedFilters.includes(filter) ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap ${
                    selectedFilters.includes(filter) 
                      ? 'gradient-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (selectedFilters.includes(filter)) {
                      setSelectedFilters(selectedFilters.filter(f => f !== filter));
                    } else {
                      setSelectedFilters([...selectedFilters, filter]);
                    }
                  }}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {!searchQuery && searchHistory.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">История поиска</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => setSearchHistory([])}
                >
                  <Icon name="Trash2" size={16} className="mr-1" />
                  Очистить
                </Button>
              </div>
              <div className="space-y-2">
                {searchHistory.map((query, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => handleSearch(query)}
                  >
                    <Icon name="Clock" size={20} className="text-muted-foreground" />
                    <span className="flex-1 text-left">{query}</span>
                    <Icon name="ArrowUpLeft" size={16} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && (
            <div>
              <h3 className="font-bold text-lg mb-4">Популярные запросы</h3>
              <div className="grid gap-3">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border hover:border-primary hover:bg-gray-50 transition-colors"
                    onClick={() => handleSearch(suggestion.text)}
                  >
                    <div className="text-3xl">{suggestion.icon}</div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold">{suggestion.text}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.type}</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить запрос или фильтры
              </p>
            </div>
          )}

          {searchQuery && filteredResults.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-4">
                Найдено: {filteredResults.length} {filteredResults.length === 1 ? 'результат' : 'результатов'}
              </h3>
              <div className="space-y-4">
                {filteredResults.map((obj) => (
                  <Card 
                    key={obj.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedObject(obj);
                      setActiveView('object');
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{obj.image}</div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{obj.name}</h3>
                            {obj.verified && (
                              <Icon name="BadgeCheck" size={16} className="text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-yellow-500" />
                              <span className="font-medium">{obj.rating}</span>
                              <span className="text-muted-foreground">({obj.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Navigation" size={14} />
                              <span>{obj.distance}</span>
                            </div>
                            {obj.audioAvailable && (
                              <Badge variant="outline" className="border-primary text-primary text-xs">
                                <Icon name="Headphones" size={10} className="mr-1" />
                                Аудио
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Icon name="Heart" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEvents = () => {
    const dateFilters = [
      { id: 'all', name: 'Все даты', icon: 'Calendar' },
      { id: 'today', name: 'Сегодня', icon: 'CalendarClock' },
      { id: 'week', name: 'На неделе', icon: 'CalendarDays' },
      { id: 'month', name: 'В этом месяце', icon: 'CalendarRange' }
    ];

    const typeFilters = ['Концерт', 'Выставка', 'Театр', 'Фестиваль', 'Мастер-класс', 'Экскурсия', 'Кино'];

    const filteredEvents = events.filter(event => {
      const typeMatch = eventTypeFilter.length === 0 || eventTypeFilter.includes(event.type);
      
      let dateMatch = true;
      if (eventDateFilter === 'today') {
        dateMatch = event.date === '28 янв';
      } else if (eventDateFilter === 'week') {
        dateMatch = ['28 янв', '29 янв', '30 янв'].includes(event.date);
      }
      
      return typeMatch && dateMatch;
    });

    if (eventsLoading) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-muted-foreground">Загружаем события...</p>
          </div>
        </div>
      );
    }

    if (eventsOffline) {
      return (
        <div className="min-h-screen bg-white">
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h1 className="text-2xl font-bold">Афиша / События</h1>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <Icon name="WifiOff" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-xl mb-2">Нет подключения к интернету</h3>
              <p className="text-muted-foreground mb-6">
                Показываем последние сохранённые события
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-yellow-600 mt-0.5" />
                  <div className="text-left text-sm">
                    <p className="font-medium text-yellow-800 mb-1">Кэшированные данные</p>
                    <p className="text-yellow-700">Информация может быть устаревшей. Подключитесь к интернету для обновления.</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => setEventsOffline(false)}>
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Повторить попытку
              </Button>
            </div>

            <div className="mt-8 space-y-4 opacity-60">
              {events.slice(0, 3).map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{event.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-24">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Афиша / События</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'событие' : 'событий'}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
            </div>

            <Tabs value={eventDateFilter} onValueChange={(v) => setEventDateFilter(v as any)} className="mb-4">
              <TabsList className="w-full grid grid-cols-4 h-auto p-1">
                {dateFilters.map(filter => (
                  <TabsTrigger 
                    key={filter.id} 
                    value={filter.id}
                    className="text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Icon name={filter.icon as any} size={14} className="mr-1" />
                    {filter.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {typeFilters.map((type) => (
                <Badge
                  key={type}
                  variant={eventTypeFilter.includes(type) ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap ${
                    eventTypeFilter.includes(type) 
                      ? 'gradient-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (eventTypeFilter.includes(type)) {
                      setEventTypeFilter(eventTypeFilter.filter(t => t !== type));
                    } else {
                      setEventTypeFilter([...eventTypeFilter, type]);
                    }
                  }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-xl mb-2">Нет событий</h3>
              <p className="text-muted-foreground mb-6">
                По выбранным фильтрам ничего не найдено
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setEventDateFilter('all');
                  setEventTypeFilter([]);
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedEvent(event);
                    setActiveView('event');
                  }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-4">
                      <div className="text-5xl">{event.image}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{event.title}</h3>
                          {event.verified && (
                            <Icon name="BadgeCheck" size={16} className="text-primary" />
                          )}
                        </div>
                        
                        <Badge variant="outline" className="mb-2 text-xs">
                          {event.type}
                        </Badge>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Calendar" size={14} />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="MapPin" size={14} />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-yellow-500" />
                              <span className="font-medium">{event.rating}</span>
                              <span className="text-muted-foreground">({event.reviews})</span>
                            </div>
                            <span className="font-semibold text-primary">{event.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => e.stopPropagation()}>
                        <Icon name="Heart" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-around">
              <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => setActiveView('home')}>
                <Icon name="Home" size={24} />
                <span className="text-xs">Главная</span>
              </Button>
              <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => setActiveView('map')}>
                <Icon name="Map" size={24} />
                <span className="text-xs">Карта</span>
              </Button>
              <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => setActiveView('lost')}>
                <Icon name="Search" size={24} />
                <span className="text-xs">Потеряшки</span>
              </Button>
              <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => setActiveView('profile')}>
                <Icon name="User" size={24} />
                <span className="text-xs">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEvent = () => {
    if (!selectedEvent) return null;

    const relatedObject = selectedEvent.locationId ? objects.find(obj => obj.id === selectedEvent.locationId) : null;

    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('events')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-xl font-bold flex-1">Событие</h1>
              <Button variant="ghost" size="icon">
                <Icon name="Share2" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="text-center">
            <div className="text-7xl mb-4">{selectedEvent.image}</div>
            <Badge variant="outline" className="mb-3">
              {selectedEvent.type}
            </Badge>
            <h1 className="text-2xl font-bold mb-2">{selectedEvent.title}</h1>
            
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span className="font-medium">{selectedEvent.rating}</span>
                <span className="text-muted-foreground">({selectedEvent.reviews} отзывов)</span>
              </div>
              {selectedEvent.verified && (
                <Badge variant="outline" className="border-primary text-primary">
                  <Icon name="BadgeCheck" size={12} className="mr-1" />
                  Проверено
                </Badge>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Calendar" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Дата и время</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.date} • {selectedEvent.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Место проведения</p>
                  <p className="text-sm text-muted-foreground mb-2">{selectedEvent.location}</p>
                  {relatedObject && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedObject(relatedObject);
                        setActiveView('object');
                      }}
                    >
                      <Icon name="Info" size={14} className="mr-1" />
                      Информация о месте
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Navigation" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Расстояние</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.distance} от вас</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Wallet" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Стоимость</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedEvent.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 pb-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveView('map')}
            >
              <Icon name="Navigation" size={18} className="mr-2" />
              Маршрут
            </Button>
            <Button 
              className="w-full gradient-primary"
              onClick={() => {
                alert('Переход на покупку билета');
              }}
            >
              <Icon name="Ticket" size={18} className="mr-2" />
              Купить билет
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const menuItems = [
    { id: 'routes', name: 'Маршруты', icon: 'Route', emoji: '🗺️' },
    { id: 'quests', name: 'Квесты, квизы', icon: 'Gamepad2', emoji: '🎮' },
    { id: 'events', name: 'Афиша', icon: 'Calendar', emoji: '🎭' },
    { id: 'news', name: 'Новости и безопасность', icon: 'Newspaper', emoji: '📰' },
    { id: 'sos', name: 'SOS', icon: 'AlertCircle', emoji: '🆘' },
    { id: 'lost', name: 'Потеряшки', icon: 'Search', emoji: '🔍' },
    { id: 'faq', name: 'Помощь/FAQ', icon: 'HelpCircle', emoji: '❓' },
    { id: 'documents', name: 'Документы', icon: 'FileText', emoji: '📄' }
  ];

  const renderQuests = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold">Квесты, квизы</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
        <p className="text-muted-foreground">Скоро здесь появятся увлекательные квесты и квизы по городу</p>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold">Новости и безопасность</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
        <p className="text-muted-foreground">Здесь будут новости города и советы по безопасности</p>
      </div>
    </div>
  );

  const renderSOS = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold">SOS</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🆘</div>
        <h2 className="text-2xl font-bold mb-2">Экстренная помощь</h2>
        <p className="text-muted-foreground mb-6">Раздел в разработке</p>
        <div className="space-y-3 max-w-md mx-auto">
          <Button variant="outline" className="w-full h-16 text-lg">
            <Icon name="Phone" size={24} className="mr-3" />
            112 - Единый номер экстренных служб
          </Button>
          <Button variant="outline" className="w-full h-16 text-lg">
            <Icon name="Ambulance" size={24} className="mr-3" />
            103 - Скорая помощь
          </Button>
          <Button variant="outline" className="w-full h-16 text-lg">
            <Icon name="ShieldAlert" size={24} className="mr-3" />
            102 - Полиция
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold">Помощь/FAQ</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">❓</div>
        <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
        <p className="text-muted-foreground">Скоро здесь появятся ответы на частые вопросы</p>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold">Документы</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
        <p className="text-muted-foreground">Здесь будут доступны важные документы и информация</p>
      </div>
    </div>
  );

  const renderRoutes = () => {
    const routeCategories = ['Все', 'Культура', 'Романтика', 'Литература', 'Еда', 'Природа', 'Вечерний'];
    let filteredRoutes = routeFilters.length === 0 || routeFilters.includes('Все')
      ? routes
      : routes.filter(route => routeFilters.includes(route.category));
    
    if (routeSearchQuery.trim()) {
      filteredRoutes = filteredRoutes.filter(route =>
        route.title.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(routeSearchQuery.toLowerCase())
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-24">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-2xl font-bold flex-1">Маршруты</h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveView('favorites')}
              >
                <Icon name="Heart" size={24} className="text-primary" />
              </Button>
            </div>

            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Поиск маршрутов..." 
                className="pl-10 pr-10 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
                value={routeSearchQuery}
                onChange={(e) => setRouteSearchQuery(e.target.value)}
              />
              {routeSearchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setRouteSearchQuery('')}
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {routeCategories.map((category) => (
              <Button
                key={category}
                variant={routeFilters.includes(category) || (category === 'Все' && routeFilters.length === 0) ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => {
                  if (category === 'Все') {
                    setRouteFilters([]);
                  } else {
                    setRouteFilters(
                      routeFilters.includes(category)
                        ? routeFilters.filter(f => f !== category)
                        : [...routeFilters, category]
                    );
                  }
                }}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredRoutes.map((route) => (
              <Card 
                key={route.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedRoute(route);
                  setActiveView('route');
                }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl">
                      {route.image}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{route.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {route.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRoutes(routes.map(r => 
                              r.id === route.id ? { ...r, isFavorite: !r.isFavorite } : r
                            ));
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18} 
                            className={route.isFavorite ? 'fill-red-500 text-red-500' : ''} 
                          />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {route.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Route" size={14} className="text-muted-foreground" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} className="text-muted-foreground" />
                          <span>{route.stops} точек</span>
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span className="font-medium">{route.rating}</span>
                          <span className="text-muted-foreground">({route.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRoute = () => {
    if (!selectedRoute) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('routes')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-xl font-bold flex-1 line-clamp-1">{selectedRoute.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setRoutes(routes.map(r => 
                    r.id === selectedRoute.id ? { ...r, isFavorite: !r.isFavorite } : r
                  ));
                  setSelectedRoute({ ...selectedRoute, isFavorite: !selectedRoute.isFavorite });
                }}
              >
                <Icon 
                  name="Heart" 
                  size={24} 
                  className={selectedRoute.isFavorite ? 'fill-red-500 text-red-500' : ''} 
                />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Share2" size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative h-64 bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 right-8 text-9xl">{selectedRoute.image}</div>
            </div>
            <div className="text-8xl relative z-10">{selectedRoute.image}</div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {selectedRoute.category}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">{selectedRoute.title}</h2>
                  <p className="text-muted-foreground">{selectedRoute.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{selectedRoute.duration}</p>
                    <p className="text-xs text-muted-foreground">Время</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="Route" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{selectedRoute.distance}</p>
                    <p className="text-xs text-muted-foreground">Длина</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{selectedRoute.difficulty}</p>
                    <p className="text-xs text-muted-foreground">Сложность</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Точки маршрута</h3>
                  <Badge variant="secondary">{selectedRoute.stops} точек</Badge>
                </div>
                <div className="space-y-3">
                  {selectedRoute.points.map((point: any, index: number) => (
                    <div key={point.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="text-3xl">{point.emoji}</div>
                      <div className="flex-1">
                        <p className="font-medium">{point.name}</p>
                        <p className="text-sm text-muted-foreground">{point.time}</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-200">
              <CardContent className="p-6 text-center">
                <Icon name="Map" size={48} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Интерактивная карта маршрута</p>
                <Button variant="outline" size="sm">
                  Открыть на карте
                </Button>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 text-sm">
              <Icon name="Star" size={16} className="text-yellow-500" />
              <span className="font-medium">{selectedRoute.rating}</span>
              <span className="text-muted-foreground">({selectedRoute.reviews} отзывов)</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full" size="lg">
                <Icon name="Play" size={18} className="mr-2" />
                Начать маршрут
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Download" size={18} className="mr-2" />
                Офлайн
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFavorites = () => {
    const favoriteRoutes = routes.filter(r => r.isFavorite);
    const favoriteObjects = objects.filter(obj => obj.id === 1 || obj.id === 2);

    let filteredItems: any[] = [];
    if (favoriteTab === 'routes') {
      filteredItems = favoriteRoutes.filter(r => 
        favoriteSearchQuery === '' || 
        r.title.toLowerCase().includes(favoriteSearchQuery.toLowerCase())
      );
    } else if (favoriteTab === 'objects') {
      filteredItems = favoriteObjects.filter(obj => 
        favoriteSearchQuery === '' || 
        obj.name.toLowerCase().includes(favoriteSearchQuery.toLowerCase())
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-2xl font-bold flex-1">Избранное</h1>
            </div>

            <div className="relative mb-4">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Поиск в избранном..." 
                className="pl-10 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
                value={favoriteSearchQuery}
                onChange={(e) => setFavoriteSearchQuery(e.target.value)}
              />
            </div>

            <Tabs value={favoriteTab} onValueChange={(v) => setFavoriteTab(v as any)}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="objects" className="gap-2">
                  <Icon name="MapPin" size={16} />
                  Объекты
                </TabsTrigger>
                <TabsTrigger value="routes" className="gap-2">
                  <Icon name="Route" size={16} />
                  Маршруты
                </TabsTrigger>
                <TabsTrigger value="collections" className="gap-2">
                  <Icon name="FolderHeart" size={16} />
                  Подборки
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {favoriteTab === 'objects' && (
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-bold text-xl mb-2">Нет избранных объектов</h3>
                  <p className="text-muted-foreground mb-6">
                    Добавляйте интересные места в избранное
                  </p>
                  <Button onClick={() => setActiveView('home')}>
                    Перейти к объектам
                  </Button>
                </div>
              ) : (
                filteredItems.map((obj) => (
                  <Card 
                    key={obj.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedObject(obj);
                      setActiveView('object');
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{obj.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{obj.name}</h3>
                            {obj.verified && (
                              <Icon name="BadgeCheck" size={16} className="text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{obj.category}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-yellow-500" />
                              <span className="font-medium">{obj.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Navigation" size={14} />
                              <span>{obj.distance}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {favoriteTab === 'routes' && (
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Route" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-bold text-xl mb-2">Нет избранных маршрутов</h3>
                  <p className="text-muted-foreground mb-6">
                    Сохраняйте интересные маршруты в избранное
                  </p>
                  <Button onClick={() => setActiveView('routes')}>
                    Перейти к маршрутам
                  </Button>
                </div>
              ) : (
                filteredItems.map((route) => (
                  <Card 
                    key={route.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedRoute(route);
                      setActiveView('route');
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl">
                          {route.image}
                        </div>
                        <div className="flex-1 p-4">
                          <h3 className="font-bold mb-1">{route.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                            {route.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <span>{route.duration}</span>
                            <span>•</span>
                            <span>{route.distance}</span>
                            <span>•</span>
                            <span>{route.stops} точек</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 mr-4 self-center">
                          <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {favoriteTab === 'collections' && (
            <div className="text-center py-12">
              <Icon name="FolderHeart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-bold text-xl mb-2">Подборки</h3>
              <p className="text-muted-foreground">
                Создавайте собственные подборки мест и маршрутов
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCategory = () => {
    const categoryMap: Record<string, string> = {
      'Музеи': 'Музей',
      'Парки': 'Парк',
      'Рестораны': 'Ресторан',
      'Развлечения': 'Развлечение'
    };
    const singularCategory = categoryMap[selectedCategory] || selectedCategory;
    const categoryObjects = objects.filter(obj => obj.category === singularCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-24">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setActiveView('home')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-2xl font-bold flex-1">{selectedCategory}</h1>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedFilters([selectedCategory]);
                  setActiveView('map');
                }}
              >
                <Icon name="Map" size={18} className="mr-2" />
                На карте
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
            <div className="text-3xl">
              {selectedCategory === 'Музеи' && '🏛️'}
              {selectedCategory === 'Парки' && '🌳'}
              {selectedCategory === 'Рестораны' && '🍽️'}
              {selectedCategory === 'Развлечения' && '🎭'}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{selectedCategory} в {selectedCity}</h2>
              <p className="text-sm text-muted-foreground">Найдено мест: {categoryObjects.length}</p>
            </div>
          </div>

          <div className="grid gap-4">
            {categoryObjects.map((obj) => (
              <Card 
                key={obj.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{obj.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold line-clamp-1">{obj.name}</h3>
                        {obj.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{obj.description}</p>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span className="font-medium">{obj.rating}</span>
                          <span className="text-muted-foreground">({obj.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Navigation" size={14} />
                          <span>{obj.distance}</span>
                        </div>
                        {obj.audioAvailable && (
                          <Badge variant="outline" className="border-primary text-primary text-xs">
                            <Icon name="Headphones" size={10} className="mr-1" />
                            Аудио
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
        <div className="max-w-7xl mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <button
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeView === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveView('home')}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeView === 'map' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveView('map')}
            >
              <Icon name="Map" size={24} />
              <span className="text-xs font-medium">Карта</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeView === 'routes' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveView('routes')}
            >
              <Icon name="Route" size={24} />
              <span className="text-xs font-medium">Маршруты</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeView === 'favorites' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveView('favorites')}
            >
              <Icon name="Heart" size={24} />
              <span className="text-xs font-medium">Избранное</span>
            </button>
            
            <button
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors text-muted-foreground"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="Menu" size={24} />
              <span className="text-xs font-medium">Меню</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeView === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveView('profile')}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </div>

      {locationModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[70] backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLocationModalOpen(false)}
        >
          <Card 
            className="w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Выбор региона</h2>
                  <Button variant="ghost" size="icon" onClick={() => setLocationModalOpen(false)}>
                    <Icon name="X" size={24} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Выберите регион и город</p>
              </div>

              <div className="overflow-y-auto max-h-[60vh]">
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                      Регион
                    </label>
                    <div className="space-y-2">
                      {Object.keys(regions).map((region) => (
                        <button
                          key={region}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            selectedRegion === region
                              ? 'border-primary bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedRegion(region);
                            setSelectedCity(regions[region as keyof typeof regions][0]);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{region}</span>
                            {selectedRegion === region && (
                              <Icon name="Check" size={20} className="text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                      Город
                    </label>
                    <div className="space-y-2">
                      {regions[selectedRegion as keyof typeof regions].map((city) => (
                        <button
                          key={city}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            selectedCity === city
                              ? 'border-primary bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedCity(city)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{city}</span>
                            {selectedCity === city && (
                              <Icon name="Check" size={20} className="text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <Button 
                  className="w-full gradient-primary"
                  onClick={() => setLocationModalOpen(false)}
                >
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Применить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  Меню
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">OTAguide {selectedCity}</p>
            </div>

            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  onClick={() => {
                    setActiveView(item.id as any);
                    setMenuOpen(false);
                  }}
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-muted-foreground text-center">
                <p>OTAguide v1.0</p>
                <p className="mt-1">© 2026 Все права защищены</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'home' && renderHome()}
      {activeView === 'map' && renderMap()}
      {activeView === 'object' && renderObject()}
      {activeView === 'lost' && renderLost()}
      {activeView === 'profile' && renderProfile()}
      {activeView === 'search' && renderSearch()}
      {activeView === 'events' && renderEvents()}
      {activeView === 'event' && renderEvent()}
      {activeView === 'quests' && renderQuests()}
      {activeView === 'news' && renderNews()}
      {activeView === 'sos' && renderSOS()}
      {activeView === 'faq' && renderFAQ()}
      {activeView === 'documents' && renderDocuments()}
      {activeView === 'routes' && renderRoutes()}
      {activeView === 'route' && renderRoute()}
      {activeView === 'favorites' && renderFavorites()}
      {activeView === 'category' && renderCategory()}
    </>
  );
};

export default Index;