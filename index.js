const fruitsList = document.querySelector('.fruits__list'); 
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn'); 
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
const sortKindLabel = document.querySelector('.sort__kind'); 
const sortTimeLabel = document.querySelector('.sort__time'); 
const sortChangeButton = document.querySelector('.sort__change__btn'); 
const sortActionButton = document.querySelector('.sort__action__btn'); 
const kindInput = document.querySelector('.kind__input'); 
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input'); 
const addActionButton = document.querySelector('.add__action__btn');

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

const display = () => {
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li');
    li.classList.add('fruit__item');
    if (fruits[i].color == 'фиолетовый') {
      li.classList.add('fruit_violet');
    }
    if (fruits[i].color == 'зеленый') {
      li.classList.add('fruit_green');
    }
    if (fruits[i].color == 'розово-красный') {
      li.classList.add('fruit_carmazin');
    }
    if (fruits[i].color == 'желтый') {
      li.classList.add('fruit_yellow');
    }
    if (fruits[i].color == 'светло-коричневый') {
      li.classList.add('fruit_lightbrown');
    }
    if (fruits[i].color == 'коричневый') {
      li.classList.add('fruit_brown');
    }
    if (fruits[i].color == 'красный') {
      li.classList.add('fruit_red');
    }
    if (fruits[i].color == 'оранжевый') {
      li.classList.add('fruit_orange');
    }
    if (fruits[i].color == 'салатовый') {
      li.classList.add('fruit_lightgreen');
    }

    fruitsList.appendChild(li);

    const div = document.createElement('div');
    div.classList.add('fruit__info');
    li.appendChild(div);

    div.innerHTML = `
    <div>index: ${i + 1}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>
    `;
  }
};
  
display();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];
  let newFruits = [...fruits];
  while (fruits.length > 0) {
    let randomFruits = getRandomInt(0, fruits.length - 1); 
    result.push(fruits[randomFruits]);    
    fruits.splice(randomFruits, 1);
  }
  fruits = result;

let notShuffled = fruits.every((element, index) => element == newFruits[index]);
  if (notShuffled) {
    alert("При перемешивании порядок не изменился. Повторите попытку.");
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

const filterFruits = () => {
  if (isNaN(maxWeight.value) || isNaN(minWeight.value)) {
    alert('Укажите число')
    return fruits;
  };

  return fruits.filter((item) => {
    if (parseInt(maxWeight.value) < parseInt(minWeight.value)) {
      [maxWeight.value, minWeight.value] = [minWeight.value, maxWeight.value];
    };
    return (item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value));
  });
  };

filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display();
});


let sortKind = 'bubbleSort';
let sortTime = '-'; 

const comparationColor = (a, b) => {
  const priorityColor = ['фиолетовый', 'зеленый', 'розово-красный', 'желтый', 'светло-коричневый'];
  const color1 = priorityColor.indexOf(a.color);
  const color2 = priorityColor.indexOf(b.color);
  return color1 > color2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          const tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    if (arr.length <= 1) {
      return arr;
    }
    let index = Math.floor(arr.length / 2);
    let currentItem = arr[index];
    let less = [];
    let more = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (i === index) {
        continue;
      }
      if (comparation(arr[i], currentItem)) {
        more.push(arr[i]);
      } else {
        less.push(arr[i])
      }
    }
    return [...sortAPI.quickSort(less, comparation), currentItem, ...sortAPI.quickSort(more, comparation)];
  },

  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

addActionButton.addEventListener('click', () => {
  if (kindInput.value === "" || colorInput.value === "" || weightInput.value === "") {
    alert('Необходимо заполнить все поля')
  } {
      fruits.push({
        kind: kindInput.value,
        color: colorInput.value,
        weight: weightInput.value
      })
  display();
}});
