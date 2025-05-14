import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

export default function QuizDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Montserrat', sans-serif";

  const styles = {
    page: {
      backgroundColor: '#F8F8F8',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily,
    },
    mainTitle: {
      fontSize: '34px',
      fontWeight: 'bold',
      color: '#3B97B8',
      textAlign: 'center',
      marginBottom: '30px',
    },
    card: {
      backgroundColor: '#F8F8F8',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
      maxWidth: '800px',
      margin: '0 auto',
      overflow: 'hidden',
      fontFamily,
    },
    header: {
      display: 'flex',
      padding: '15px 25px',
      fontWeight: '500',
      fontSize: '18px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #eaeaea',
      fontFamily,
    },
    column: {
      flex: 1,
      textAlign: 'center',
    },
    list: {
      maxHeight: '600px',
      overflowY: 'auto',
    },
    row: {
      display: 'flex',
      padding: '15px 25px',
      fontSize: '16px',
      borderBottom: '1px solid #eaeaea',
      backgroundColor: '#fff',
      alignItems: 'center',
      fontFamily,
    },
    studentName: {
      flex: 1,
      textAlign: 'center',
      color: '#3B97B8',
      fontFamily,
    },
    studentScore: {
      flex: 1,
      textAlign: 'center',
      color: '#3B97B8',
      fontFamily,
    },
    seeAnswerButton: {
      backgroundColor: '#3F8CAA1A', 
      color: '#30393D',
      border: '1px solid #3F8CAA',
      borderRadius: '6px',
      padding: '6px 12px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontFamily,
      transition: 'background-color 0.2s ease',
    },
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const sampleData = Array(8).fill(null).map((_, index) => ({
          id: index + 1,
          name: 'Hchicha',
          score: '00/20',
        }));
        setStudents(sampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz details');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div style={styles.page}>Loading...</div>;
  if (error) return <div style={styles.page}>{error}</div>;

  return (
    <div style={styles.page}>
      <h1 style={styles.mainTitle}>Quiz 01</h1>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.column}>Student</div>
          <div style={styles.column}>Score</div>
          <div style={styles.column}>Answers</div>
        </div>
        <div style={styles.list}>
          {students.map((student) => (
            <div key={student.id} style={styles.row}>
              <div style={styles.studentName}>{student.name}</div>
              <div style={styles.studentScore}>{student.score}</div>
              <div style={styles.column}>
                <Link to="/teacher/quiz-answers">
                <button style={styles.seeAnswerButton}>See Answers</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
