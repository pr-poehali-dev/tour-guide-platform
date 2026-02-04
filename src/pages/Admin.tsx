import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';

const API_URL = 'https://functions.poehali.dev/2b8dd058-45da-4658-a7aa-8e77eb3b1d2e';
const AUTH_URL = 'https://functions.poehali.dev/57106f04-c97d-4656-b384-0b9befd29e45';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('banners');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${AUTH_URL}?action=verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok && data.valid) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      await fetch(`${AUTH_URL}?action=logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const loadData = async (resource: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=${resource}`);
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить данные',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  const handleSave = async (item: any) => {
    try {
      const method = item.id ? 'PUT' : 'POST';
      const url = item.id ? `${API_URL}?resource=${activeTab}&id=${item.id}` : `${API_URL}?resource=${activeTab}`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        toast({
          title: 'Успешно сохранено',
          description: 'Изменения применены'
        });
        loadData(activeTab);
        setEditingItem(null);
      }
    } catch (error) {
      toast({
        title: 'Ошибка сохранения',
        description: 'Не удалось сохранить изменения',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}?resource=${activeTab}&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: 'Удалено',
          description: 'Элемент успешно удален'
        });
        loadData(activeTab);
      }
    } catch (error) {
      toast({
        title: 'Ошибка удаления',
        description: 'Не удалось удалить элемент',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  if (!authenticated) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#171B1F]">Админ-панель</h1>
            <p className="text-[#8B9199] mt-1">Управление контентом сайта</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-[#8B9199]">
              {JSON.parse(localStorage.getItem('admin_user') || '{}').username}
            </span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <Icon name="LogOut" className="mr-2" size={16} />
              Выйти
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline" size="sm">
              <Icon name="Home" className="mr-2" size={16} />
              На главную
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-9 gap-2 h-auto p-2 bg-white">
            <TabsTrigger value="banners" className="flex flex-col items-center p-2">
              <Icon name="Image" size={20} />
              <span className="text-xs mt-1">Баннеры</span>
            </TabsTrigger>
            <TabsTrigger value="objects" className="flex flex-col items-center p-2">
              <Icon name="MapPin" size={20} />
              <span className="text-xs mt-1">Объекты</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex flex-col items-center p-2">
              <Icon name="Calendar" size={20} />
              <span className="text-xs mt-1">События</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex flex-col items-center p-2">
              <Icon name="Route" size={20} />
              <span className="text-xs mt-1">Маршруты</span>
            </TabsTrigger>
            <TabsTrigger value="quests" className="flex flex-col items-center p-2">
              <Icon name="Trophy" size={20} />
              <span className="text-xs mt-1">Квесты</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col items-center p-2">
              <Icon name="Newspaper" size={20} />
              <span className="text-xs mt-1">Новости</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex flex-col items-center p-2">
              <Icon name="MessageSquare" size={20} />
              <span className="text-xs mt-1">Отзывы</span>
            </TabsTrigger>
            <TabsTrigger value="lost_found" className="flex flex-col items-center p-2">
              <Icon name="Search" size={20} />
              <span className="text-xs mt-1">Находки</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex flex-col items-center p-2">
              <Icon name="FolderTree" size={20} />
              <span className="text-xs mt-1">Категории</span>
            </TabsTrigger>
          </TabsList>

          {['banners', 'objects', 'events', 'routes', 'quests', 'news', 'reviews', 'lost_found', 'categories'].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Управление {getTabTitle(tab)}</CardTitle>
                  <Button onClick={() => setEditingItem({})}>
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Icon name="Loader2" className="animate-spin" size={32} />
                    </div>
                  ) : editingItem !== null ? (
                    <EditForm
                      item={editingItem}
                      resource={tab}
                      onSave={handleSave}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <DataTable
                      data={data}
                      resource={tab}
                      onEdit={setEditingItem}
                      onDelete={handleDelete}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

const getTabTitle = (tab: string) => {
  const titles: Record<string, string> = {
    banners: 'баннерами',
    objects: 'объектами',
    events: 'событиями',
    routes: 'маршрутами',
    quests: 'квестами',
    news: 'новостями',
    reviews: 'отзывами',
    lost_found: 'находками',
    categories: 'категориями'
  };
  return titles[tab] || tab;
};

const EditForm = ({ item, resource, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderFields = () => {
    const fields: Record<string, any[]> = {
      banners: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'subtitle', label: 'Подзаголовок', type: 'textarea' },
        { name: 'button_text', label: 'Текст кнопки', type: 'text' },
        { name: 'button_link', label: 'Ссылка кнопки', type: 'text' },
        { name: 'image_url', label: 'URL изображения', type: 'image', folder: 'banners' },
        { name: 'position', label: 'Позиция', type: 'number' },
        { name: 'is_active', label: 'Активен', type: 'switch' }
      ],
      objects: [
        { name: 'name', label: 'Название', type: 'text', required: true },
        { name: 'category', label: 'Категория', type: 'text' },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'emoji', label: 'Эмодзи', type: 'text' },
        { name: 'image', label: 'Изображение', type: 'image', folder: 'objects' },
        { name: 'rating', label: 'Рейтинг', type: 'number', step: '0.1' },
        { name: 'reviews', label: 'Отзывов', type: 'number' },
        { name: 'distance', label: 'Расстояние', type: 'text' },
        { name: 'verified', label: 'Проверено', type: 'switch' },
        { name: 'audio_available', label: 'Аудио', type: 'switch' },
        { name: 'is_active', label: 'Активен', type: 'switch' }
      ],
      events: [
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'type', label: 'Тип', type: 'text' },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'date', label: 'Дата (текст)', type: 'text' },
        { name: 'date_time', label: 'Дата', type: 'date' },
        { name: 'time', label: 'Время', type: 'text' },
        { name: 'location', label: 'Место', type: 'text' },
        { name: 'price', label: 'Цена', type: 'text' },
        { name: 'emoji', label: 'Эмодзи', type: 'text' },
        { name: 'rating', label: 'Рейтинг', type: 'number', step: '0.1' },
        { name: 'distance', label: 'Расстояние', type: 'text' },
        { name: 'verified', label: 'Проверено', type: 'switch' },
        { name: 'is_active', label: 'Активен', type: 'switch' }
      ],
      routes: [
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'duration', label: 'Длительность', type: 'text' },
        { name: 'distance', label: 'Расстояние', type: 'text' },
        { name: 'difficulty', label: 'Сложность', type: 'text' },
        { name: 'emoji', label: 'Эмодзи', type: 'text' },
        { name: 'rating', label: 'Рейтинг', type: 'number', step: '0.1' },
        { name: 'verified', label: 'Проверено', type: 'switch' },
        { name: 'is_active', label: 'Активен', type: 'switch' }
      ],
      quests: [
        { name: 'title', label: 'Название', type: 'text', required: true },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'difficulty', label: 'Сложность', type: 'text' },
        { name: 'duration', label: 'Длительность', type: 'text' },
        { name: 'points', label: 'Баллы', type: 'number' },
        { name: 'emoji', label: 'Эмодзи', type: 'text' },
        { name: 'is_active', label: 'Активен', type: 'switch' }
      ],
      news: [
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'excerpt', label: 'Краткое описание', type: 'textarea' },
        { name: 'content', label: 'Содержание', type: 'textarea' },
        { name: 'category', label: 'Категория', type: 'text' },
        { name: 'image_url', label: 'URL изображения', type: 'image', folder: 'news' },
        { name: 'published_date', label: 'Дата публикации', type: 'date' },
        { name: 'is_active', label: 'Активна', type: 'switch' }
      ],
      reviews: [
        { name: 'author_name', label: 'Автор', type: 'text', required: true },
        { name: 'text', label: 'Текст отзыва', type: 'textarea' },
        { name: 'rating', label: 'Оценка', type: 'number', min: 1, max: 5 },
        { name: 'object_id', label: 'ID объекта', type: 'number' },
        { name: 'event_id', label: 'ID события', type: 'number' },
        { name: 'route_id', label: 'ID маршрута', type: 'number' },
        { name: 'is_moderated', label: 'Модерировано', type: 'switch' },
        { name: 'is_approved', label: 'Одобрено', type: 'switch' }
      ],
      lost_found: [
        { name: 'type', label: 'Тип (lost/found)', type: 'text', required: true },
        { name: 'category', label: 'Категория', type: 'text' },
        { name: 'title', label: 'Заголовок', type: 'text', required: true },
        { name: 'description', label: 'Описание', type: 'textarea' },
        { name: 'location', label: 'Место', type: 'text' },
        { name: 'date', label: 'Дата', type: 'text' },
        { name: 'emoji', label: 'Эмодзи', type: 'text' },
        { name: 'contact_info', label: 'Контакты', type: 'text' },
        { name: 'is_moderated', label: 'Модерировано', type: 'switch' },
        { name: 'is_active', label: 'Активно', type: 'switch' }
      ],
      categories: [
        { name: 'name', label: 'Название', type: 'text', required: true },
        { name: 'icon', label: 'Иконка', type: 'text' },
        { name: 'count', label: 'Количество', type: 'number' },
        { name: 'gradient', label: 'Градиент', type: 'text' },
        { name: 'is_active', label: 'Активна', type: 'switch' }
      ]
    };

    return (fields[resource] || []).map(field => (
      <div key={field.name} className="space-y-2">
        {field.type === 'image' ? (
          <ImageUpload
            value={formData[field.name] || ''}
            onChange={(url) => handleChange(field.name, url)}
            folder={field.folder || 'images'}
            label={field.label}
          />
        ) : (
          <>
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
              />
            ) : field.type === 'switch' ? (
              <Switch
                checked={formData[field.name] || false}
                onCheckedChange={(checked) => handleChange(field.name, checked)}
              />
            ) : (
              <Input
                id={field.name}
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, field.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                step={field.step}
                min={field.min}
                max={field.max}
              />
            )}
          </>
        )}
      </div>
    ));
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

const DataTable = ({ data, resource, onEdit, onDelete }: any) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-[#8B9199]">
        <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Нет данных для отображения</p>
      </div>
    );
  }

  const getColumns = () => {
    const cols: Record<string, string[]> = {
      banners: ['title', 'subtitle', 'position', 'is_active'],
      objects: ['name', 'category', 'rating', 'verified', 'is_active'],
      events: ['title', 'type', 'date', 'location', 'verified', 'is_active'],
      routes: ['title', 'duration', 'difficulty', 'rating', 'is_active'],
      quests: ['title', 'difficulty', 'points', 'is_active'],
      news: ['title', 'category', 'published_date', 'is_active'],
      reviews: ['author_name', 'rating', 'is_moderated', 'is_approved'],
      lost_found: ['type', 'title', 'location', 'date', 'is_moderated'],
      categories: ['name', 'icon', 'count', 'is_active']
    };
    return cols[resource] || ['id', 'name'];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            {getColumns().map(col => (
              <th key={col} className="text-left p-3 text-sm font-medium text-[#171B1F]">
                {col.replace('_', ' ').toUpperCase()}
              </th>
            ))}
            <th className="text-right p-3 text-sm font-medium text-[#171B1F]">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="border-b hover:bg-[#F8F8F8]">
              {getColumns().map(col => (
                <td key={col} className="p-3 text-sm text-[#171B1F]">
                  {typeof item[col] === 'boolean' ? (
                    <Badge variant={item[col] ? 'default' : 'secondary'}>
                      {item[col] ? 'Да' : 'Нет'}
                    </Badge>
                  ) : (
                    String(item[col] || '-').substring(0, 50)
                  )}
                </td>
              ))}
              <td className="p-3 text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;