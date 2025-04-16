import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../../styles/Summary.module.css';

const Summary = () => {
    const [timeFrame, setTimeFrame] = useState('year');
    const [activeCard, setActiveCard] = useState('total'); // 'total', 'b2b', 'b2c'
    const [activeTab, setActiveTab] = useState('company'); // 'employees', 'company', 'deals'

    // Function to generate random data
    const generateRandomData = (baseValue, variance, months = 12) => {
        return Array.from({ length: months }, (_, i) => {
            const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            const randomFactor = 1 + (Math.random() * variance * 2 - variance);
            const revenue = Math.round(baseValue * randomFactor);
            const expenses = Math.round(revenue * (0.6 + Math.random() * 0.3));
            const profit = revenue - expenses;
            const debt = Math.round(expenses * (Math.random() * 0.2));

            return {
                name: monthNames[i],
                revenue,
                expenses,
                profit,
                debt
            };
        });
    };

    // Generate data sets with different base values for each department
    const dataSets = useMemo(() => ({
        total: generateRandomData(1000000, 0.3),
        b2b: generateRandomData(800000, 0.4),
        b2c: generateRandomData(400000, 0.5)
    }), [timeFrame]); // Regenerate when timeFrame changes

    // Get current data based on active card
    const currentData = dataSets[activeCard];

    // Calculate totals for the current data set
    const totals = currentData.reduce((acc, curr) => ({
        revenue: acc.revenue + curr.revenue,
        expenses: acc.expenses + curr.expenses,
        profit: acc.profit + curr.profit,
        debt: acc.debt + curr.debt
    }), { revenue: 0, expenses: 0, profit: 0, debt: 0 });

    // Calculate percentage changes
    const calculatePercentage = (current, previous) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    };

    const totalPercentage = calculatePercentage(
        totals.revenue,
        dataSets.total[dataSets.total.length - 2]?.revenue || totals.revenue
    );

    const b2bPercentage = calculatePercentage(
        totals.revenue,
        dataSets.b2b[dataSets.b2b.length - 2]?.revenue || totals.revenue
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'employees':
                return (
                    <div className={styles['coming-soon']}>
                        <h2>Свод данных по сотрудникам</h2>
                        <p>Функционал данного раздела находится в разработке и будет доступен в ближайшее время.</p>
                    </div>
                );
            case 'company':
                return (
                    <>
                        <h1 className={styles['summary-title']}>Сводный отчет</h1>
                        
                        <div className={styles['summary-cards']}>
                            <div 
                                className={`${styles['main-card']} ${activeCard === 'total' ? styles.active : ''}`}
                                onClick={() => setActiveCard('total')}
                            >
                                <span className={styles.percentage}>{totalPercentage}%</span>
                                <h2 className={styles.amount}>₽ {totals.revenue.toLocaleString()}</h2>
                                <span className={styles.label}>Итоги</span>
                            </div>
                            
                            <div 
                                className={`${styles['sub-card']} ${activeCard === 'b2b' ? styles.active : ''}`}
                                onClick={() => setActiveCard('b2b')}
                            >
                                <span className={`${styles.percentage} ${styles.positive}`}>{b2bPercentage}%</span>
                                <h3 className={styles.amount}>₽ {totals.revenue.toLocaleString()}</h3>
                                <span className={styles.label}>B2B</span>
                            </div>
                            
                            <div 
                                className={`${styles['sub-card']} ${activeCard === 'b2c' ? styles.active : ''}`}
                                onClick={() => setActiveCard('b2c')}
                            >
                                <h3 className={`${styles.amount} ${totals.profit < 0 ? styles.negative : ''}`}>
                                    ₽ {totals.profit.toLocaleString()}
                                </h3>
                                <span className={styles.label}>B2C</span>
                            </div>
                        </div>

                        <div className={styles['chart-section']}>
                            <div className={styles['chart-controls']}>
                                <button 
                                    className={timeFrame === 'week' ? styles.active : ''} 
                                    onClick={() => setTimeFrame('week')}
                                >
                                    Неделя
                                </button>
                                <button 
                                    className={timeFrame === 'month' ? styles.active : ''} 
                                    onClick={() => setTimeFrame('month')}
                                >
                                    Месяц
                                </button>
                                <button 
                                    className={timeFrame === 'year' ? styles.active : ''} 
                                    onClick={() => setTimeFrame('year')}
                                >
                                    Год
                                </button>
                            </div>
                            <div className={styles.chart} style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip 
                                            formatter={(value) => `₽ ${value.toLocaleString()}`}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="#4CD4C0" 
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="expenses" 
                                            stroke="#FF4D4D" 
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="profit" 
                                            stroke="#6C5DD3" 
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="debt" 
                                            stroke="#FFCE73" 
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles['chart-legend']}>
                                <div className={styles['legend-item']}>
                                    <span className={`${styles.dot} ${styles.revenue}`}></span>
                                    <span>Выручка</span>
                                    <span className={styles.amount}>₽ {totals.revenue.toLocaleString()}</span>
                                </div>
                                <div className={styles['legend-item']}>
                                    <span className={`${styles.dot} ${styles.expenses}`}></span>
                                    <span>Затраты</span>
                                    <span className={styles.amount}>₽ {totals.expenses.toLocaleString()}</span>
                                </div>
                                <div className={styles['legend-item']}>
                                    <span className={`${styles.dot} ${styles.profit}`}></span>
                                    <span>Прибыль</span>
                                    <span className={styles.amount}>₽ {totals.profit.toLocaleString()}</span>
                                </div>
                                <div className={styles['legend-item']}>
                                    <span className={`${styles.dot} ${styles.debt}`}></span>
                                    <span>Задолженность</span>
                                    <span className={styles.amount}>₽ {totals.debt.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'deals':
                return (
                    <div className={styles['coming-soon']}>
                        <h2>Сводный отчет по сделкам</h2>
                        <p>Функционал данного раздела находится в разработке и будет доступен в ближайшее время.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles['summary-container']}>
            <header className={styles['summary-header']}>
                <div className={styles['nav-arrows']}>
                    <button aria-label="Previous">&lt;</button>
                    <button aria-label="Next">&gt;</button>
                </div>
                <div className={styles['nav-tabs']}>
                    <span 
                        className={`${styles.tab} ${activeTab === 'employees' ? styles.active : ''}`}
                        onClick={() => setActiveTab('employees')}
                    >
                        Свод данных по сотрудникам
                    </span>
                    <span 
                        className={`${styles.tab} ${activeTab === 'company' ? styles.active : ''}`}
                        onClick={() => setActiveTab('company')}
                    >
                        Сводный отчет внутри компании
                    </span>
                    <span 
                        className={`${styles.tab} ${activeTab === 'deals' ? styles.active : ''}`}
                        onClick={() => setActiveTab('deals')}
                    >
                        Сводный отчет по сдел.
                    </span>
                </div>
                <div className={styles.profile}>
                    <img src="/path-to-avatar" alt="Profile" />
                    <span>Kristina</span>
                </div>
            </header>

            <main className={styles['summary-content']}>
                <div className={styles['main-content']}>
                    {renderContent()}
                </div>

                {activeTab === 'company' && (
                    <div className={styles['problem-areas']}>
                        <h2>Проблемные зоны</h2>
                        <ul className={styles['problems-list']}>
                            <li className={`${styles['problem-item']} ${styles.critical}`}>
                                <span>Линейный персонал</span>
                                <span className={styles.amount}>₽ 300 3670</span>
                            </li>
                            <li className={`${styles['problem-item']} ${styles.critical}`}>
                                <span>Подразделение рабочих работ ФОТ</span>
                                <span className={styles.amount}>₽ 901 470</span>
                            </li>
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
};
 
export default Summary;