import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { categories, objects, events, regions, menuItems } from '@/data/appData';

interface CorePagesProps {
  selectedCity: string;
  setLocationModalOpen: (open: boolean) => void;
  setActiveView: (view: any) => void;
  setSelectedObject: (obj: any) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  setSearchHistory: (history: string[]) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  categoryNotifications: any;
  setCategoryNotifications: (notifications: any) => void;
}

export const renderHome = ({
  selectedCity,
  setLocationModalOpen,
  setActiveView,
  setSelectedObject,
}: CorePagesProps) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-24">
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
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
        </div>
        
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Музеи, парки, рестораны..." 
            className="pl-10 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-primary"
            onFocus={() => setActiveView('search')}
          />
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="grid grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
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
          <h2 className="text-xl font-bold">Популярное сейчас</h2>
          <Button variant="link" className="text-primary text-sm p-0">
            Всё <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {objects.map((obj) => (
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
                <h3 className="font-bold mb-1">{obj.name}</h3>
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
            onClick={() => setActiveView('menu')}
          >
            <Icon name="Menu" size={24} />
            <span className="text-xs">Меню</span>
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
