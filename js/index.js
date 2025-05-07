let data = [];
let counter = 0;
let buttonAddTask = document.getElementById("addTask");// button add task

function addTask(){ // -----> function لاضافة مهمة جديدة
  let taskInput = document.getElementById("taskInput");// -----> input element لادخال المهمة
  let valueInput = taskInput.value.trim(); // -----> القيمة المدخلة في input , و trim لازالة المسافات الزائدة
  // console.log('value' , valueInput);
  data.push({ // -----> هنا استخدمت push لاضافة عنصر جديد في المصفوفة
    id: counter, // -----> id لتمييز كل عنصر عن الاخر
    task: valueInput, // ال task اللي تم ادخلها في ال input
    completed: false // -----> completed لتحديد task هل اتكلملت ام لا
  });
  localStorage.setItem("data" ,JSON.stringify(data) ); // -----> استخدمت localstorage لتخزين المهام حتي لو تم قفل او تحميل الصفحة تفضل متاحة 
  // console.log('data', data);
  counter++; // -----> زيادة ال counter كلما تم اضافة مهمة جديدة
  taskInput.value = ""; // -----> هنا بعد ما اضيف المهمة الجديدة امسح القيمة المدخلة في ال input
  display(data) // -----> هنا عملت call لل function display لعرض المهام في صفحة ال HTML
}
buttonAddTask.addEventListener("click", addTask); //-----> هنا عملت event listener لل button عشان مجرد ما اضغط عليه ينفذ ال function addTask
function display(dataLocal){ // -----> هنا عملت function لعرض المهام في صفحة ال HTML (display)
  // console.log('dataLocalDisplay', dataLocal);
  
  let taskList = document.getElementById("taskList");
  let templateContent = ""; // -----> هنا عملت variable عشان احفظ فيه ال tags اللي هتظهر ف ال HTML
  for (let i = 0; i < dataLocal.length; i++){ // -----> هنا عملت loop عشان اظهر كل المهام اللي موجودة في المصفوفة
    templateContent += //
    `
    <li>
      <input type="checkbox" name="done" value="task" class="checkbox" onclick="checkTask(${i} , this) "} ${dataLocal[i].completed ? "checked" : ""}> 
      <span style="text-decoration: ${dataLocal[i].completed ? "line-through" : "none"}">${dataLocal[i].task}</span>
      <i class="fa-solid fa-trash" onclick="deleteTask(${i})"></i>
    </li>
    `
    ;
  }
  taskList.innerHTML = templateContent; 
  taskList.textContent.trim() === "" ? taskList.style.border = "none" : taskList.style.border = "rgba(0, 0, 0, 0.216) solid 1px"; // --> هنا ب check لو عنصر ال ul فاضي ولا لا عشان لو فاضي يشيل ال border
}
function deleteTask(index){ // -----> فانكشن لحذف المهمة التي تم ضغط علي ال icon السلة 
  data.splice(index, 1);// ---> استخدام method splice مع تحديد بداية العنصر بال index بتاعه
  localStorage.setItem("data" ,JSON.stringify(data) ); // --> اعادة حفظ الداتا في localstorage بعد الحذف 
  display(data); // ---> اعادة استدعاء دالة ال display ل اظهار العناصر بدون التي تم حذفها 
}
function checkTask(index , term){ // ---> ال term هنا مقصود بيها العنصر نفسه اللي هو ال this عشان اعرف استخدم كل عنصر لوحده
  // console.log('term', term);
  let nextElementSibling = term.nextElementSibling; // ---> عشان اعرف access علي عنصر ال span اللي ورا ال عنصر ال check input
  if(term.checked) { 
    data[index].completed = true;
    nextElementSibling.style.textDecoration = "line-through";
    console.log("checked" );
  } else {
    data[index].completed = false;
    console.log("unchecked" );
    nextElementSibling.style.textDecoration = "none";
  }
  localStorage.setItem("data" ,JSON.stringify(data));
}
function loadData(){ // الدالة ديه عشان اول لما افتح الصفحة المهام المحفوظة في ال localstorage تتعرض علي طول في الصفحة 
  let dataLocal = JSON.parse(localStorage.getItem("data")) || []; // 
    display(dataLocal); // لعرض المهام اللي في localstorage 
    // console.log('dataLocal', dataLocal);
    data = dataLocal; // -----> هنا عملت assign لل data بال dataLocl عشان لما الصفحة بتتقفل و اجي افتحها و احط مهمة جديدة بيتحذف المهام اللي كانت في ال localstorage
    counter = dataLocal.length; // هنا عشان يكمل علي اخر id موجود في ال localstorage و يزود عليه 1
  }
loadData();
