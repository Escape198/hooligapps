import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';

export default function SubmitPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({
    date: '',
    first_name: '',
    last_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
      const date = searchParams.get('date') || '';
      const first_name = searchParams.get('first_name') || '';
      const last_name = searchParams.get('last_name') || '';
      if (date && first_name && last_name) {
        setForm({ date, first_name, last_name });
        setTimeout(() => {
          submitForm({ date, first_name, last_name });
        }, 500); // Полсекунды задержка
      }
    }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (data) => {
    setLoading(true);
    setErrors({});
    setResults([]);
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (!res.ok) {
        setErrors(json.error || {});
      } else {
        setResults(json.data || []);
        // Сохраним форму в URL
        setSearchParams(data);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: ['Ошибка запроса'] });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    submitForm(form);
  };

  return (
    <div>
      <h1>Форма</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Дата:
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Имя:
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
          </label>
          {errors.first_name && <div style={{color: 'red'}}>{errors.first_name.join(', ')}</div>}
        </div>
        <div>
          <label>
            Фамилия:
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
          </label>
          {errors.last_name && <div style={{color: 'red'}}>{errors.last_name.join(', ')}</div>}
        </div>
        <button type="submit">Отправить</button>
      </form>

      {loading && <Spinner />}

      {results.length > 0 && (
        <div>
          <h2>Результат:</h2>
          <ul>
            {results.map((item, i) => (
              <li key={i}>
                {item.date}: {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors.general && <div style={{color: 'red'}}>{errors.general.join(', ')}</div>}
    </div>
  );
}
