import React, { useState, useEffect } from 'react';

export default function ViewQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Montserrat', sans-serif";

  const styles = {
    container: {
      maxWidth: '670px',
      width: '100%',
      margin: '0 auto',
      fontFamily,
    },
    mainTitle: {
      fontFamily,
      fontSize: '34px',
      fontWeight: 'bold',
      color: '#3B97B8',
      textAlign: 'center',
      marginBottom: '30px',
    },
    quizBox: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
    },
    listTitle: {
      fontFamily,
      fontSize: '29px',
      fontWeight: '500',
      color: '#3B97B8',
      textAlign: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #eaeaea',
    },
    header: {
      display: 'flex',
      padding: '15px 25px',
      fontWeight: '500',
      fontSize: '20px',
      fontFamily,
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #eaeaea',
    },
    titleHeader: {
      flex: '1',
    },
    dateHeader: {
      width: '120px',
      textAlign: 'right',
    },
    quizList: {
      maxHeight: '600px',
      overflowY: 'auto',
    },
    quizItem: {
      display: 'flex',
      padding: '15px 25px',
      borderBottom: '1px solid #eaeaea',
      fontSize: '16px',
      fontFamily,
    },
    quizLinkWrapper: {
      display: 'flex',
      width: '100%',
      textDecoration: 'none',
      padding: '5px 0',
    },
    quizTitle: {
      flex: '1',
      color: '#3B97B8',
      fontFamily,
    },
    quizDate: {
      width: '120px',
      textAlign: 'right',
      color: '#3B97B8',
      fontFamily,
    },
    loading: {
      textAlign: 'center',
      padding: '30px',
      fontSize: '18px',
      fontFamily,
    },
    error: {
      textAlign: 'center',
      padding: '30px',
      color: '#e53e3e',
      fontSize: '18px',
      fontFamily,
    },
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const sampleQuizzes = Array(10).fill(null).map((_, index) => ({
          id: index + 1,
          title: `Quiz 01`,
          date: `${10 + index}/20`, 
        }));
        setQuizzes(sampleQuizzes);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quizzes');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div style={styles.loading}>Loading quizzes...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>View Quizzes</h1>

      <div style={styles.quizBox}>
        <h2 style={styles.listTitle}>Quiz List</h2>

        <div style={styles.header}>
          <div style={styles.titleHeader}>Quiz Title</div>
          <div style={styles.dateHeader}>Score</div>
        </div>

        <div style={styles.quizList}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} style={styles.quizItem}>
              <a
                href={`/quiz/${quiz.id}`}
                style={styles.quizLinkWrapper}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.parentElement.style.backgroundColor = '#f5f5f5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.parentElement.style.backgroundColor = '';
                }}
              >
                <div style={styles.quizTitle}>{quiz.title}</div>
                <div style={styles.quizDate}>{quiz.date}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
