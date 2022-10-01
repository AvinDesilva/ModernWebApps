function check_and_refresh() {

  signupsDiv1Style = document.getElementById("signups-div").style.display;
  console.log("Signups Div style:" + signupsDiv1Style);
  if (signupsDiv1Style == "block") {

    setTimeout(() => {

      url = "/signups";

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true); // async=true -> asynchronous

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          fieldData = JSON.parse(this.responseText);
          console.log(fieldData);
          console.log("-------");
          students = fieldData['signups'];

          signupsDiv = document.getElementById("signups");

          for (i = 0; i < students.length; i++) {
            student = students[i];
            name = student['entity'];
            if (document.getElementById("student-" + name) == null) {
              studentItem = document.createElement("li");
              studentItem.setAttribute("id", "student-" + name);
              signupsDiv.appendChild(studentItem);
              studentItem.innerHTML = name;
            }
          }
        }
      }

      xhr.send();
      check_and_refresh();
    }, 5000); // 5 seconds
  }
}

function store_lesson() {
  lesson_name = document.getElementById("lesson-name-input").value;
  if (lesson_name == "") {
    alert("Lesson Name cannot be empty.");
    return;
  }
  lesson = document.createElement("li");
  lesson.setAttribute("id", lesson_name + "-li");
  lesson_anchor = document.createElement("a");
  lesson_anchor.setAttribute("href", "#");
  lesson_anchor.setAttribute("onclick", "show_lesson('" + lesson_name + "')");
  lesson_anchor.innerHTML = lesson_name;
  lesson.appendChild(lesson_anchor);
  document.getElementById("lesson_list").appendChild(lesson);
  lesson_details = {};

  demo_url = document.getElementById("demo-url").value;
  timings = document.querySelector('input[name="timings-radio"]:checked').value;
  days_of_week = get_days_of_week();

  lesson_details['demo_url'] = demo_url;
  lesson_details['days'] = days_of_week;
  lesson_details['timings'] = timings;
  lesson_details['instrument'] = lesson_name;
  lesson_details['instructor_name'] = instructor_name;

  // need to fix this by making call to application..py and updating lessons there
  
  lessons['lesson_name'] = lesson_details;
}

function take_input() {
  document.getElementById("welcome").setAttribute("style", "display:none");
  document.getElementById("take-input").setAttribute("style", "display:block");
}

// TODO: Add search music functionality; 
function search_music() {

  // Steps: Parse the input instrument; make AJAX call; show the results; create form to signup.")
    url = "/searchlessons";
    var params = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true); // async=true -> asynchronous
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        fieldData = JSON.parse(this.responseText);
        console.log(fieldData);
        console.log("-------");
        found_lessons = fieldData['lessons'];

        contentcolDiv = document.getElementById("contentcol");
        contentcolDiv.innerHTML = "";
        contentcolDiv.appendChild(document.createElement("br"));

        for (i = 0; i < found_lessons.length; i++) {
          lesson_details = found_lessons[i];
          foundItemList = document.createElement("li");
          contentcolDiv.appendChild(foundItemList);
          lessonDiv = document.createElement("div");
          lesson_name = lesson_details["name"];
          instrument = lesson_details["instrument"];
          demo_url = lesson_details["demo_url"];
          days = lesson_details["days"];
          timings = lesson_details["timings"];
          foundItemList.innerHTML = lesson_name + " " + instrument + " " + demo_url + " " + days + " " + timings;
        }

        yourNameLabel = document.createElement("label");
        yourNameLabel.setAttribute("class", "label");
        yourNameLabel.innerHTML = "Your Name:";

        yourNameBox = document.createElement("input");
        yourNameBox.setAttribute("type", "text");
        yourNameBox.setAttribute("id", "learner-name-input");

        lessonNameLabel = document.createElement("label");
        lessonNameLabel.setAttribute("class", "label");
        lessonNameLabel.innerHTML = "Lesson Name:"

        lessonNameBox = document.createElement("input");
        lessonNameBox.setAttribute("type", "text");
        lessonNameBox.setAttribute("id", "lesson-name-input");

        // EWHAT DO I CALL TO SEND THE DATA FROM HERE TO BACKEND
        learnerButton = document.createElement("button");
        learnerButton.innerHTML = "Register"
        learnerButton.setAttribute("onclick", "sign_up_student()");

        document.getElementById("contentcol").appendChild(yourNameLabel);
        document.getElementById("contentcol").appendChild(document.createElement("br"));
        document.getElementById("contentcol").appendChild(yourNameBox);
        document.getElementById("contentcol").appendChild(document.createElement("br"));
        document.getElementById("contentcol").appendChild(lessonNameLabel);
        document.getElementById("contentcol").appendChild(document.createElement("br"));
        document.getElementById("contentcol").appendChild(lessonNameBox);
        document.getElementById("contentcol").appendChild(document.createElement("br"));
        document.getElementById("contentcol").appendChild(learnerButton);

      }
    }
    search_content = document.getElementById("instrument-to-search").value;
    params.append('search_content', search_content);
    xhr.send(params);
  }

function sign_up_student(){
  url = "/signup";
    var params = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true); // async=true -> asynchronous
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // fieldData = JSON.parse(this.responseText);
        console.log(fieldData);
        console.log("-------");
        found_lessons = fieldData['lessons'];

        // contentcolDiv = document.getElementById("contentcol");
        // contentcolDiv.innerHTML = "";
        // contentcolDiv.appendChild(document.createElement("br"));

        // registeredNameLabel = document.createElement("label");
        // registeredNameLabel.setAttribute("class", "label");
        // registeredNameLabel.innerHTML = "Lesson Suck my Name:"

        // document.getElementById("contentcol").appendChild(yourNameLabel);
        // document.getElementById("contentcol").appendChild(document.createElement("br"));
      }
    }
    learner_name = document.getElementById("learner-name-input").value;
    lesson_name = document.getElementById("lesson-name-input").value;
    params.append('learner-name-input', learner_name);
    params.append('lesson-name-input', lesson_name);
    xhr.send(params);
}

function learn_music() {

  document.getElementById("contentcol").innerHTML = "";

  searchLabel = document.createElement("label");
  searchLabel.setAttribute("class", "label");
  searchLabel.innerHTML = "Instrument to search"

  searchBox = document.createElement("input");
  searchBox.setAttribute("type", "text");
  searchBox.setAttribute("id", "instrument-to-search");

  searchButton = document.createElement("button");
  searchButton.innerHTML = "Search"
  searchButton.setAttribute("onclick", "search_music()");

  document.getElementById("contentcol").appendChild(searchLabel);
  document.getElementById("contentcol").appendChild(document.createElement("br"));
  document.getElementById("contentcol").appendChild(searchBox);
  document.getElementById("contentcol").appendChild(document.createElement("br"));
  document.getElementById("contentcol").appendChild(searchButton);

}
