const result = document.querySelector('#result');
const filter = document.querySelector('#filter');

const listItems = [];

const getData = async () => {
  const res = await fetch('https://randomuser.me/api/?results=50');
  const { results } = await res.json();

  //Clear result
  result.innerHTML = '';

  results.forEach((user) => {
    const { picture, name, location } = user;
    const li = document.createElement('li');

    listItems.push(li);

    li.innerHTML = `
		<img src="${picture.large}" alt="${name.first}">
		<div class="user-info">
			<h4>${name.first} ${name.last}</h4>
			<p>${location.city}, ${location.country}</p>
		</div>
		`;

    result.appendChild(li);
  });
};

getData();

const filterData = (searchTerm) => {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
};

filter.addEventListener('input', (e) => filterData(e.target.value));
