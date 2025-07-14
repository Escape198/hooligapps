import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/history')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>История отправок</h1>
      {loading && <Spinner />}
      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Кол-во предыдущих записей</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
