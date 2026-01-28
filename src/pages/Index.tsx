import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'map' | 'object' | 'lost' | 'profile'>('home');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

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

  const objects = [
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

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              OTAguide
            </h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="User" size={24} />
            </Button>
          </div>
          
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Поиск достопримечательностей, мест..." 
              className="pl-10 pr-12 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 gradient-primary"
              onClick={() => setActiveView('map')}
            >
              <Icon name="Map" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Категории</h2>
            <Button variant="link" className="text-primary">
              Все <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card 
                key={cat.id} 
                className="overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
              >
                <CardContent className={`p-6 bg-gradient-to-br ${cat.gradient} text-white`}>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon name={cat.icon as any} size={24} />
                    </div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm opacity-90">{cat.count} мест</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Рядом с вами</h2>
            <Badge variant="secondary" className="gradient-accent text-white">
              <Icon name="Navigation" size={14} className="mr-1" />
              Геолокация включена
            </Badge>
          </div>
          
          <div className="space-y-4">
            {objects.map((obj) => (
              <Card 
                key={obj.id}
                className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                onClick={() => {
                  setSelectedObject(obj);
                  setActiveView('object');
                }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-4">
                    <div className="text-6xl flex-shrink-0">{obj.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{obj.name}</h3>
                            {obj.verified && (
                              <Icon name="BadgeCheck" size={18} className="text-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{obj.category}</p>
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Heart" size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Star" size={18} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{obj.rating}</span>
                          <span className="text-muted-foreground">({obj.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Navigation" size={14} />
                          <span>{obj.distance}</span>
                        </div>
                        {obj.audioAvailable && (
                          <Badge variant="outline" className="border-primary text-primary">
                            <Icon name="Headphones" size={12} className="mr-1" />
                            Аудио
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          obj.safetyZone === 'safe' ? 'bg-safety-safe' :
                          obj.safetyZone === 'warning' ? 'bg-safety-warning' : 'bg-safety-danger'
                        }`} />
                        <span className="text-xs text-muted-foreground">Безопасная зона</span>
                      </div>
                    </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-red-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
              <Icon name="MapPin" size={48} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Интерактивная карта</h3>
              <p className="text-muted-foreground">
                Здесь будет карта с достопримечательностями<br />
                и цветовыми зонами безопасности
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 right-4 z-10">
          <Input 
            placeholder="Поиск на карте..." 
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
                    Санкт-Петербург
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

  return (
    <>
      {activeView === 'home' && renderHome()}
      {activeView === 'map' && renderMap()}
      {activeView === 'object' && renderObject()}
      {activeView === 'lost' && renderLost()}
      {activeView === 'profile' && renderProfile()}
    </>
  );
};

export default Index;