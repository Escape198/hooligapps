import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Главная страница</h1>
      <nav>
        <ul>
          <li><Link to="/submit">Перейти на страницу формы</Link></li>
          <li><Link to="/history">Перейти на историю</Link></li>
        </ul>
      </nav>
    </div>
  );
}
