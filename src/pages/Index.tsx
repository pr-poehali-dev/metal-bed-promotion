import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const sizes = ['80x190', '90x200', '120x200', '140x200', '160x200'];

const beds = [
  {
    id: 1,
    name: 'Лофт Классик',
    image: 'https://v3b.fal.media/files/b/penguin/0RjUMkYGNvwTCi6jTEA-j_output.png',
    basePrice: 15000,
    description: 'Классическая металлическая кровать в индустриальном стиле'
  },
  {
    id: 2,
    name: 'Лофт Премиум',
    image: 'https://v3b.fal.media/files/b/penguin/0RjUMkYGNvwTCi6jTEA-j_output.png',
    basePrice: 22000,
    description: 'Усиленная конструкция с дизайнерским изголовьем'
  }
];

const reviews = [
  { name: 'Анна М.', text: 'Отличное качество! Кровать выглядит стильно и очень прочная.', rating: 5 },
  { name: 'Дмитрий К.', text: 'Быстрая доставка, профессиональная сборка. Рекомендую!', rating: 5 },
  { name: 'Елена В.', text: 'Идеально вписалась в интерьер лофт. Спасибо!', rating: 5 }
];

const advantages = [
  { icon: 'Bed', title: 'Прочная сталь', text: 'Долговечная конструкция выдерживает до 250 кг' },
  { icon: 'Shield', title: '5 лет гарантии', text: 'Гарантируем качество на всю продукцию' },
  { icon: 'Truck', title: 'Доставка по РФ', text: 'Быстрая доставка в любой город России' },
  { icon: 'Wrench', title: 'Бесплатная сборка', text: 'Профессиональная сборка в день доставки' }
];

const Index = () => {
  const [selectedBed, setSelectedBed] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const calculatePrice = (basePrice: number, size: string) => {
    const sizeMultiplier = sizes.indexOf(size) * 2000;
    return basePrice + sizeMultiplier;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">ЛОФТ ПОДМРТНЫЙ</h1>
            <div className="hidden md:flex gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#advantages" className="hover:text-primary transition-colors">Преимущества</a>
              <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Металлические кровати<br />в стиле ЛОФТ
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Индустриальный дизайн, качественная сталь и надежность на десятилетия
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
            Смотреть каталог
            <Icon name="ChevronDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {beds.map((bed) => (
              <Card key={bed.id} className="overflow-hidden hover-scale transition-all border-2 hover:border-primary">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img src={bed.image} alt={bed.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{bed.name}</h3>
                  <p className="text-muted-foreground mb-4">{bed.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Размер</label>
                      <Select 
                        value={selectedBed === bed.id ? selectedSize : ''} 
                        onValueChange={(value) => {
                          setSelectedBed(bed.id);
                          setSelectedSize(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите размер" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>{size} см</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedBed === bed.id && selectedSize && (
                      <div className="flex items-center justify-between pt-4 border-t border-border animate-fade-in">
                        <span className="text-3xl font-bold text-primary">
                          {calculatePrice(bed.basePrice, selectedSize).toLocaleString()} ₽
                        </span>
                        <Button className="bg-primary hover:bg-primary/90">
                          Заказать
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={advantage.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <Icon name="Truck" size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Доставка</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• По Москве — 1-2 дня</li>
                  <li>• По МО — 2-3 дня</li>
                  <li>• По России — 5-14 дней</li>
                  <li>• Бесплатная сборка при заказе</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Icon name="CreditCard" size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Оплата</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Наличными курьеру</li>
                  <li>• Банковской картой</li>
                  <li>• Банковский перевод</li>
                  <li>• Рассрочка 0%</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.text}"</p>
                  <p className="font-semibold">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <Icon name="Shield" size={64} className="text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Гарантия качества</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Мы даем 5 лет гарантии на всю нашу продукцию. Каждая кровать проходит тщательный контроль качества перед отправкой.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">5 лет</p>
              <p className="text-muted-foreground">Гарантия</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">250 кг</p>
              <p className="text-muted-foreground">Макс. нагрузка</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">100%</p>
              <p className="text-muted-foreground">Качество</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Телефон</h3>
              <p className="text-muted-foreground">+7 (999) 123-45-67</p>
            </div>
            <div>
              <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">info@loft-beds.ru</p>
            </div>
            <div>
              <Icon name="MapPin" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Адрес</h3>
              <p className="text-muted-foreground">г. Москва, ул. Примерная, 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Лофт Подмртный. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
