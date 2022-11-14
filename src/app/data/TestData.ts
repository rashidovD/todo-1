import { Category } from '../model/Category';
import { Priority } from '../model/Priority';
import { Task } from '../model/Task';

export class TestData {
  static categories: Category[] = [
    { id: 1, title: 'Работа' },
    { id: 2, title: 'Семья' },
    { id: 3, title: 'Учеба' },
    { id: 4, title: 'Отдых' },
    { id: 5, title: 'Спорт' },
    { id: 6, title: 'Еда' },
    { id: 7, title: 'Финансы' },
    { id: 8, title: 'Гаджеты' },
    { id: 9, title: 'Здоровье' },
    { id: 10, title: 'Автомобиль' },
  ];

  static priorities: Priority[] = [
    { id: 1, title: 'Низкий', color: '#e5e5e5' },
    { id: 2, title: 'Средний', color: '#85d1b2' },
    { id: 3, title: 'Высокий', color: '#f1828d' },
    { id: 4, title: 'Очень срочно!', color: '#f1128d' },
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'Залить полный бак',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2022-10-11'),
    },
    {
      id: 2,
      title: 'Передать отчеты начальнику',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2022-10-11'),
    },
    {
      id: 3,
      title: 'Убраться у себя в комнате',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1],
    },
    {
      id: 4,
      title: 'Сходить в парк с семьей',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2022-10-11'),
    },
    {
      id: 5,
      title: 'Стать ангуляр разрабом',
      completed: false,
      category: TestData.categories[0],
    },
    {
      id: 6,
      title: 'Кайфануть от души',
      priority: TestData.priorities[1],
      completed: true,
      category: TestData.categories[3],
    },
    {
      id: 7,
      title: 'Заняться 1 час в день спортом',
      priority: TestData.priorities[2],
      completed: false,
      // category: TestData.categories[4],
    },


    //
    {
      id: 8,
      title: 'Убраться у себя в комнате',
      priority: TestData.priorities[3],
      completed: true,
      category: TestData.categories[7],
    },
    {
      id: 9,
      title: 'Сходить в парк с семьей',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-10-11'),
    },
    {
      id: 10,
      title: 'Стать ангуляр разрабом',
      completed: false,
      category: TestData.categories[6],
    },
    {
      id: 11,
      title: 'Планировать переезд',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[3],
    },
    {
      id: 12,
      title: 'Заняться 1 час в день спортом',
      priority: TestData.priorities[2],
      completed: false,
      // category: TestData.categories[4],
      date: new Date('2022-11-02'),
    },
  ];
}
