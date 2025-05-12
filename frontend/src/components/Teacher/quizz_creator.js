import React, { useState } from 'react';
import DeleteIcon from '../../assets/delete.svg';

export default function QuizCreator() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '',
      points: 5,
      required: true,
      oneAnswerOnly: false,
      choices: [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
      ]
    }
  ]);
  const [randomizeOrder, setRandomizeOrder] = useState(false);

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, {
      id: newId,
      text: '',
      points: 1,
      required: false,
      oneAnswerOnly: false,
      choices: []
    }]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addChoice = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newChoiceId = q.choices.length > 0 ? Math.max(...q.choices.map(c => c.id)) + 1 : 1;
        return {
          ...q,
          choices: [...q.choices, { id: newChoiceId, text: '' }]
        };
      }
      return q;
    }));
  };

  const updateChoice = (questionId, choiceId, text) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          choices: q.choices.map(c =>
            c.id === choiceId ? { ...c, text } : c
          )
        };
      }
      return q;
    }));
  };

  const deleteChoice = (questionId, choiceId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          choices: q.choices.filter(c => c.id !== choiceId)
        };
      }
      return q;
    }));
  };

  const handleCreateQuiz = () => {
    console.log("Creating quiz with:", { questions, randomizeOrder });
  };

  const ToggleSwitch = ({ isOn, handleToggle, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
      <div
        style={{
          position: 'relative',
          width: '36px',
          height: '20px',
          backgroundColor: isOn ? '#3F8CAA' : '#ccc',
          borderRadius: '20px',
          transition: 'background-color 0.2s',
          marginRight: '8px',
          cursor: 'pointer'
        }}
        onClick={handleToggle}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: isOn ? '18px' : '2px',
            width: '16px',
            height: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.2s'
          }}
        />
      </div>
      <span style={{ color: isOn ? '#3F8CAA' : '#666', fontSize: '14px' }}>{label}</span>
    </div>
  );

  const CustomDeleteIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#3F8CAA"/>
    </svg>
  );

  const styles = {
    container: {
      fontFamily: 'Inter, sans-serif',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '0',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#fff',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    header: {
      color: '#3F8CAA',
      fontSize: '18px',
      textAlign: 'center',
      padding: '15px',
      borderBottom: '1px solid #e0e0e0',
      fontWeight: '500'
    },
    content: {
      padding: '15px'
    },
    questionBlock: {
      marginBottom: '15px',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    label: {
      color: '#3F8CAA',
      fontSize: '14px',
      marginBottom: '5px',
      display: 'block'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '15px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      paddingRight: '40px',
      border: '1px solid #3F8CAA',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
      color: '#30393D',
      outline: 'none'
    },
    pointsRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px'
    },
    pointsInputContainer: {
      position: 'relative',
      width: '120px',
      marginRight: '20px'
    },
    pointsInput: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #3F8CAA',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
      color: '#30393D',
      outline: 'none'
    },
    choiceContainer: {
      position: 'relative',
      marginBottom: '8px'
    },
    choiceInput: {
      width: '100%',
      padding: '8px 12px',
      paddingRight: '40px',
      border: '1px solid #3F8CAA',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#30393D',
      outline: 'none',
      boxSizing: 'border-box'
    },
    deleteButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      color: '#3F8CAA'
    },
    addButton: {
      backgroundColor: '#e6f0f3',
      border: '1px solid #3F8CAA',
      color: '#3F8CAA',
      borderRadius: '4px',
      padding: '8px',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15px'
    },
    createButton: {
      backgroundColor: 'white',
      border: '1px solid #3F8CAA',
      color: '#3F8CAA',
      borderRadius: '4px',
      padding: '8px 20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      display: 'block',
      margin: '15px auto 0'
    },
    toggleContainer: {
      display: 'flex'
    },
    questionHeader: {
      marginBottom: '5px'
    },
    answersSection: {
      borderRadius: '4px',
      padding: '10px',
      marginTop: '10px'
    },
    randomizeContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '15px',
      padding: '10px 0',
      borderTop: '1px solid #e5e7eb',
      marginTop: '10px'
    }
  };

  const PlusIcon = () => (
    <span style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '16px' }}>+</span>
  );

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input, input[type="text"], input[type="number"] {
        color: #30393D !important;
        -webkit-text-fill-color: #30393D !important;
      }
      
      input:focus, input[type="text"]:focus, input[type="number"]:focus {
        color: #30393D !important;
        -webkit-text-fill-color: #30393D !important;
      }
      
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus {
        -webkit-text-fill-color: #30393D !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Quiz Q/A</h2>

      <div style={styles.content}>
        {questions.map((question) => (
          <div key={question.id} style={styles.questionBlock}>
            <div style={styles.questionHeader}>
              <label style={styles.label}>Question</label>
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                style={styles.input}
                value={question.text}
                onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                placeholder="Enter a question"
              />
              <button
                style={styles.deleteButton}
                onClick={() => deleteQuestion(question.id)}
                aria-label="Delete question"
              >
                <CustomDeleteIcon />
              </button>
            </div>

            <div>
              <label style={styles.label}>Points</label>
              <div style={styles.pointsRow}>
                <div style={styles.pointsInputContainer}>
                  <input
                    type="number"
                    style={styles.pointsInput}
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, 'points', Number(e.target.value))}
                    min="1"
                  />
                </div>

                <div style={styles.toggleContainer}>
                  <ToggleSwitch
                    isOn={question.required}
                    handleToggle={() => updateQuestion(question.id, 'required', !question.required)}
                    label="Required"
                  />

                  <ToggleSwitch
                    isOn={question.oneAnswerOnly}
                    handleToggle={() => updateQuestion(question.id, 'oneAnswerOnly', !question.oneAnswerOnly)}
                    label="One answer only"
                  />
                </div>
              </div>
            </div>

            <div style={styles.answersSection}>
              <label style={styles.label}>Answers choices</label>
              {question.choices.map((choice) => (
                <div key={choice.id} style={styles.choiceContainer}>
                  <input
                    type="text"
                    style={styles.choiceInput}
                    value={choice.text}
                    onChange={(e) => updateChoice(question.id, choice.id, e.target.value)}
                    placeholder="Enter an answer choice"
                  />
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteChoice(question.id, choice.id)}
                    aria-label="Delete choice"
                  >
                    <CustomDeleteIcon />
                  </button>
                </div>
              ))}
              <button
                style={styles.addButton}
                onClick={() => addChoice(question.id)}
              >
                <PlusIcon /> Add choice
              </button>
            </div>
          </div>
        ))}

        <button
          style={styles.addButton}
          onClick={addQuestion}
        >
          <PlusIcon /> Add question
        </button>

        <div style={styles.randomizeContainer}>
          <ToggleSwitch
            isOn={randomizeOrder}
            handleToggle={() => setRandomizeOrder(!randomizeOrder)}
            label="Randomize questions order"
          />
        </div>

        <button
          style={styles.createButton}
          onClick={handleCreateQuiz}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}