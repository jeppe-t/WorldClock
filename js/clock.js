//World Clock exercise

//Api URL
const url = "http://worldtimeapi.org/api/timezone/";

let watchInterval;

//Connects the Html element with our event listener
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', setTimeZones);

//Fetches the URL. Then() method makes the method return a promise. Lambda expression converts the fetched data to JSON.
function getTimeZones() {
  return fetch(url).then(response => {
    return response.json()
  });
}

//User chooses and we set pass the values.
function setTimeZones() {
  dropdown.value;
  const setindex = dropdown.selectedIndex;
  const setTimeZone = dropdown.options[setindex];
  getTime(setTimeZone);
  return setTimeZone;
}

//Creates an element, then loads the timezones from the API and connect the elements to the dropdowm
function setDropDown(item, index) {
  const element = document.createElement("option");
  element.textContent = item;
  element.value = index;
  dropdown.appendChild(element);
}

// An async function assure us, that a promise is returned and the await makes the function wait for that promise.
// The foreach loops the fetched date and passes it to our dropdown
async function loopDropDown() {
  const timeZoneList = await getTimeZones();
  timeZoneList.forEach(setDropDown);
}

//This function passed displays the frontend watch and makes the watch dynamic by count interval.
async function getTime(timezone) {
  clearInterval(watchInterval);
  console.log(timezone); // this displays the number and name of the selected timezone
  let options = {
      timeZone: timezone.innerText,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    converter = new Intl.DateTimeFormat([], options);
  watchInterval = setInterval(() => {
    document.getElementById('time').innerText = converter.format(new Date());
  }, 1000);
}

loopDropDown();
