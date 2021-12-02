const createTaskBtn = document.querySelector("#create-task-btn");
const createTaskModal = document.querySelector("#createTaskModal");
const createTaskSpan = document.querySelector("#create-task-response");
const createTaskForm = document.querySelector("#createTaskForm");

// let user_id = localStorage.getItem('user_id')

// if (requestedType === `Reviewers`) {
//     console.log('here')
//     createTaskCon.classList.remove('d-none');
// } else {
//     console.log('here')
//     createTaskCon.classList.add('d-none');
// }
console.log('here')
const createTaskApi = (event) => {
    event.preventDefault();
    let user_id = localStorage.getItem('user_id')
    console.log(user_id);

    createTaskBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';
    const routes = new Routes();
    const url = `${routes.apiOrigin}${routes.createTask(user_id)}`;
    console.log(url);
    const formData = new FormData(createTaskForm);

    const errorHandling = response => {
        status = response.status;
        console.log(response);
        console.log(status);
        return response.json();
    };

    const getResponse = data => {
        switch (status) {
            case 404:
                $("#createTaskModal").modal("toggle");
                createTaskSpan.innerHTML = "Oops! Not Found";
                break;
            case 501:
                $("#createTaskModal").modal("toggle");
                createTaskSpan.innerHTML =
                    "Something went wrong. Please try again";
                break;
            case 200:
                $("#createTaskModal").modal("toggle");
                createTaskSpan.innerHTML =
                    "Task has been sent successfully";
                setTimeout(() => {
                    location.reload()
                }, 3000)
                break;
        }
    };
    const userData = JSON.parse(localStorage.getItem("DevelopND-user"));
    console.log(userData);
    const {
        token
    } = userData;

    fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                Authorization: token
            },
            body: formData
        })
        .then(response => errorHandling(response))
        .then(data => {
            console.log(data);
            getResponse(data);
            upgradeBtn.innerHTML = "UPGRADE USER";
        });
};

createTaskForm.addEventListener("submit", event =>
    createTaskApi(event), createTaskForm
);

const taskList = document.querySelector('#task-list')
const spinnerViewTasks = document.querySelector('#spinner-view-tasks')
const deleteTaskBtn = document.querySelector('#delete-task-btn')
const deleteTaskSpan = document.querySelector('#deleteTaskSpan')
const viewReviewerTasks = (user_id) => {

    user_id = localStorage.getItem('user_id')
    const routes = new Routes();
    const url = `${ routes.apiOrigin}${ routes.viewReviewerTask(user_id) }`;
    const data = JSON.parse(localStorage.getItem('DevelopND-user'));
    const {
        token
    } = data;
    console.log(certified)
    fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "aplication/json",
                "Authorization": token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(url);
            console.log(data);
            spinnerViewTasks.style.display = 'none';
            let reviewerTasksObject = data.task;
            if (reviewerTasksObject.length > 0) {
                reviewerTasksObject.map(reviewerTask => {
                    console.log(reviewerTask);
                    taskList.innerHTML = '';
                    taskList.innerHTML += `
                  <li class="list-group-item mt-2">${reviewerTask.task}<i class="fa fas fa-trash float-right" style="cursor:pointer" data-task-id=${reviewerTask.id}></i></li>
                          `;
                    const deleteTask = Array.from(document.querySelectorAll(`.fa-trash`));
                    deleteTask.map(x => {
                        x.addEventListener("click", event => {
                            deleteTaskFunc(event, x);
                        });
                    });
                });
            } else {
                taskList.innerHTML = `
                          <p class="mt-3" style="color: grey; font-weight: bold; text-align: center;">No Tasks Found!</p>
                        </div>`;
            }
        })
        .catch(err => console.error(err))
}
const deleteTaskApi = (event, task_id) => {
    event.preventDefault();
  
    deleteTaskBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';
    const routes = new Routes();
    const url = `${routes.apiOrigin}${routes.deleteTask(task_id)}`;
    console.log(url);
  
  
    const errorHandling = response => {
      status = response.status;
      console.log(response);
      console.log(status);
      return response.json();
    };
  
    const getResponse = data => {
      switch (status) {
        case 404:
            deleteTaskSpan.classList.remove('d-none')
          deleteTaskSpan.innerHTML = "Oops! Not Found";
          break;
        case 501:
            deleteTaskSpan.classList.remove('d-none')
          deleteTaskSpan.innerHTML =
            "Something went wrong. Please try again";
          break;
        case 200:
            deleteTaskSpan.classList.remove('d-none')
          deleteTaskSpan.innerHTML =
            "Task Deleted!";
          setTimeout(() => {
            location.reload()
          }, 3000)
          break;
      }
    };
    const userData = JSON.parse(localStorage.getItem("DevelopND-user"));
    console.log(userData);
    const {
      token
    } = userData;
  
    fetch(url, {
        method: "DEL",
        headers: {
          Accept: "application/json",
          Authorization: token
        }
      })
      .then(response => errorHandling(response))
      .then(data => {
        console.log(data);
        getResponse(data);
        deleteTaskBtn.innerHTML = "Delete";
      });
  };
deleteTaskFunc = (event, x) => {
    const task_id = x.dataset.taskId
    $("#deleteTaskModal").modal("toggle");
    deleteTaskBtn.addEventListener("click", event =>
        deleteTaskApi(event, task_id)
    );
}