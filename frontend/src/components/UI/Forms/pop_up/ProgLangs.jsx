import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import classes from './ProgLangs.module.css'

const ProgLangs = ({selectedValues, setSelectedValues, setSelectedValuesNotValid}) => {

    const [options, setOptions] = useState([]); // Состояние для данных из Django API

    useEffect(() => {
    // Получение данных из Django API при монтировании компонента
    axios.get('http://127.0.0.1:8000/programming-languages/')
      .then(response => {
        setOptions(response.data); // Установка данных в состояние
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value]); // Добавление выбранного значения в состояние
    } else {
      setSelectedValues(selectedValues.filter(val => val !== value)); // Удаление выбранного значения из состояния
    }
    setSelectedValuesNotValid(false);
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>Выберите не меньше 3 языков программирования:</h4>
        <div className={classes.content}>
            {options.map(option => (
                <div key={option.name} className={classes.item}>
                    <label className={classes.checkbox + ' ' + classes.style_b}>
                        <input
                            className={classes.input}
                            type="checkbox"
                            value={option.name}
                            checked={selectedValues.includes(option.name)}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <div className={classes.checkbox__checkmark}></div>
                        <div className={classes.checkbox__body}>{option.name}</div>
                    </label>
                </div>
            ))}
        </div>
      <p className={classes.footer}>Выбранные языки: {selectedValues.join(', ')}</p>
    </div>
  );
}

export default ProgLangs;