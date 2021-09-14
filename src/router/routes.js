import Home from '../views/Home';

const routes = [
    {
        /**
         * Домашняя страница. Тут будет сама игра.
         */
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        /**
         * Таблица результатов.
         */
        path: '/results',
        name: 'ResultsTable',
        component: () => import('@/views/ResultsTable.vue'),
    }
]

export { routes }