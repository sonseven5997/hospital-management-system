const view = {};

view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case "registerScreen":
      document.getElementById("app").innerHTML = components.registerScreen;
      const registerForm = document.getElementById("form-register");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
          role: registerForm.role.value,
          gender: registerForm.gender.value,
          dob: registerForm.dob.value,
        };
        controller.register(registerInfo);
      });
      const redirectToLogin = document.getElementById("redirect-to-login");
      redirectToLogin.addEventListener("click", (e) => {
        view.setActiveScreen("loginScreen");
      });
      break;
    case "loginScreen":
      document.getElementById("app").innerHTML = components.loginScreen;
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const loginInfo = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(loginInfo);
      });
      const redirectToRegister = document.getElementById(
        "redirect-to-register"
      );
      redirectToRegister.addEventListener("click", (e) => {
        view.setActiveScreen("registerScreen");
      });
      break;
    case "mainScreen":
      if (
        model.currentUser.role == "doctor" ||
        model.currentUser.role == "nurse"
      ) {
        document.getElementById("app").innerHTML =
          components.clinicalMainScreen;
        view.showPatientList();
        document
          .getElementById("patientList")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showPatientList();
          });
        const addNewPatientForm = document.getElementById("addNewPatientForm");
        addNewPatientForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const newPatient = {
            name: document.getElementById("patient-name").value,
            gender: document.getElementById("patient-gender").value,
            dob: document.getElementById("patient-dob").value,
            pob: document.getElementById("patient-pob").value,
            occupation: document.getElementById("patient-occupation").value,
            email: document.getElementById("patient-email").value,
            phone: document.getElementById("patient-phone").value,
            patientType: document.getElementById("patientType").value,
            bloodType: document.getElementById("bloodType").value,
            referredBy: document.getElementById("patient-referred-by").value,
            referredDate: document.getElementById("patient-referred-date")
              .value,
            religion: document.getElementById("patient-religion").value,
            parentGuardian: document.getElementById("patient-parent-guardian")
              .value,
            timeCheckIn: new Date().toISOString(),
            timeCheckOut: "",
          };
          controller.addNewPatient(newPatient);
        });
        document.getElementById("doctor-in-charge").value =
          model.currentUser.name;
        const addNewAppointmentForm = document.getElementById(
          "addNewAppointmentForm"
        );
        addNewAppointmentForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const newAppointment = {
            name: document.getElementById("patient-name-schedule").value,
            startDate: document.getElementById("start-date").value,
            scheduleType: document.getElementById("schedule-type").value,
            disease: document.getElementById("disease").value,
            location: document.getElementById("location").value,
            note: document.getElementById("note-appointment").value,
            doctorInCharge: {
              id: model.currentUser.id,
              name: model.currentUser.name,
            },
          };
          controller.addNewAppointment(newAppointment);
        });
        document
          .getElementById("appointment-list")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showAppointmentListThisWeek(model.currentUser.role);
          });
        document
          .getElementById("today-appointment")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showTodayAppointment(model.currentUser.role);
          });
        const addNewLabRequest = document.getElementById("addLabRequestForm");
        addNewLabRequest.addEventListener("submit", (e) => {
          e.preventDefault();
          const newLabRequest = {
            patient: document.getElementById("patient-name-lab-request").value,
            type: document.getElementById("lab-type-request").value,
            note: document.getElementById("note-lab").value,
          };
          controller.addNewLabRequest(newLabRequest);
        });
        document
          .getElementById("lab-request-list")
          .addEventListener("click", (e) => {
            view.showLabRequestList();
          });
        document
          .getElementById("lab-request-completed")
          .addEventListener("click", (e) => {
            view.showLabCompletedList();
          });
        document.getElementById("signOutBtn").addEventListener("click", (e) => {
          e.preventDefault();
          firebase
            .auth()
            .signOut()
            .then(() => {
              view.setActiveScreen("registerScreen");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else if (
        model.currentUser.role == "hospital-admin" ||
        model.currentUser.role == "patient-admin"
      ) {
        document.getElementById("app").innerHTML = components.adminMainScreen;
        view.showPatientList();
        document
          .getElementById("patientList")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showPatientList();
          });
        const addNewPatientForm = document.getElementById("addNewPatientForm");
        addNewPatientForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const newPatient = {
            name: document.getElementById("patient-name").value,
            gender: document.getElementById("patient-gender").value,
            dob: document.getElementById("patient-dob").value,
            pob: document.getElementById("patient-pob").value,
            occupation: document.getElementById("patient-occupation").value,
            email: document.getElementById("patient-email").value,
            phone: document.getElementById("patient-phone").value,
            patientType: document.getElementById("patientType").value,
            bloodType: document.getElementById("bloodType").value,
            referredBy: document.getElementById("patient-referred-by").value,
            referredDate: document.getElementById("patient-referred-date")
              .value,
            religion: document.getElementById("patient-religion").value,
            parentGuardian: document.getElementById("patient-parent-guardian")
              .value,
            timeCheckIn: new Date().toISOString(),
            timeCheckOut: "",
          };
          controller.addNewPatient(newPatient);
        });
        document
          .getElementById("appointment-list")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showAppointmentListThisWeek(model.currentUser.role);
          });
        document
          .getElementById("today-appointment")
          .addEventListener("click", (e) => {
            e.preventDefault();
            view.showTodayAppointment(model.currentUser.role);
          });
        document
          .getElementById("lab-request-list")
          .addEventListener("click", (e) => {
            view.showLabRequestList();
          });
        document.getElementById("signOutBtn").addEventListener("click", (e) => {
          e.preventDefault();
          firebase
            .auth()
            .signOut()
            .then(() => {
              view.setActiveScreen("registerScreen");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else if (model.currentUser.role == "lab-technician") {
        document.getElementById("app").innerHTML = components.supportMainScreen;
        view.showLabRequestList();
        document
          .getElementById("lab-request-list")
          .addEventListener("click", (e) => {
            view.showLabRequestList();
          });
        document
          .getElementById("lab-request-completed")
          .addEventListener("click", (e) => {
            view.showLabCompletedList();
          });
        document.getElementById("signOutBtn").addEventListener("click", (e) => {
          e.preventDefault();
          firebase
            .auth()
            .signOut()
            .then(() => {
              view.setActiveScreen("registerScreen");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
      break;
    default:
      break;
  }
};

view.setErrorMessage = (elementID, message) => {
  document.getElementById(elementID).innerText = message;
};

view.showPatientList = () => {
  let patientList = [];
  firebase
    .firestore()
    .collection("patients")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let patient = { ...doc.data(), id: doc.id };
        patientList.push(patient);
      });
    })
    .then(() => {
      let tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-responsive");
      let table = document.createElement("table");
      table.classList.add("table");
      table.classList.add("table-striped");
      table.classList.add("table-sm");
      let tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>email</th>
                <th>Phone</th>
                <th>Time check-in</th>
                <th>Time check-out</th>
              </tr>
      `;
      table.appendChild(tableHeader);
      let tableBody = document.createElement("tbody");
      patientList.forEach((element) => {
        tableBody.innerHTML += `
              <tr class="cursor-pointer" id="${element.id}">
                <td>${patientList.indexOf(element) + 1}</td>
                <td>${element.name}</td>
                <td>${element.gender}</td>
                <td>${element.dob}</td>
                <td>${element.email}</td>
                <td>${element.phone}</td>
                <td>${moment(element.timeCheckIn).format("DD-MM-YYYY")}</td>
                <td>${
                  element.timeCheckOut !== ""
                    ? moment(element.timeCheckOut).format("DD-MM-YYYY")
                    : ""
                }</td>
              </tr>
        `;
      });

      table.appendChild(tableBody);
      tableWrapper.appendChild(table);
      document.getElementById("mainContent").innerHTML = `<div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">Patient list</h1>
    </div>`;
      document.getElementById("mainContent").appendChild(tableWrapper);
      patientList.forEach((element) => {
        document.getElementById(element.id).addEventListener("click", (e) => {
          e.preventDefault();
          view.showDetailPatient(element);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

view.hideModal = () => {
  document.querySelectorAll(".cancel-btn").forEach((e) => {
    e.click();
  });
};

view.showAppointmentListThisWeek = (role) => {
  if (role == "doctor" || role == "nurse") {
    let appointmentList = [];
    let appointmentThisWeekList = [];
    firebase
      .firestore()
      .collection("appointment")
      .where("doctorInCharge.id", "==", model.currentUser.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let patient = { ...doc.data(), id: doc.id };
          appointmentList.push(patient);
        });
      })
      .then(() => {
        console.log(appointmentList);
        appointmentList.forEach((element) => {
          if (
            moment(element.startDate) > moment().startOf("week").toDate() &&
            moment(element.startDate) < moment().endOf("week").toDate()
          ) {
            appointmentThisWeekList.push(element);
          }
        });
        console.log(appointmentThisWeekList);
      })
      .then(() => {
        let tableWrapper = document.createElement("div");
        tableWrapper.classList.add("table-responsive");
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-sm");
        let tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                </tr>
        `;
        console.log(tableHeader);
        table.appendChild(tableHeader);
        let tableBody = document.createElement("tbody");
        appointmentThisWeekList.forEach((element) => {
          tableBody.innerHTML += `
                <tr class="cursor-pointer" id="${element.id}">
                  <td>${moment(element.startDate).format(
                    "DD-MM-YYYY h:mm A"
                  )}</td>
                  <td>${element.name}</td>
                  <td>${element.scheduleType}</td>
                  <td>${element.location}</td>
                </tr>
          `;
        });
        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        document.getElementById("mainContent").innerHTML = `<div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 class="h2">Appointment list</h1>
      </div>`;
        if (appointmentThisWeekList.length !== 0) {
          document.getElementById("mainContent").appendChild(tableWrapper);
          appointmentThisWeekList.forEach((element) => {
            document
              .getElementById(element.id)
              .addEventListener("click", (e) => {
                e.preventDefault();
                view.showDetailAppointment(element);
              });
          });
        } else {
          document.getElementById("mainContent").innerHTML +=
            "<div>You have no appointment this week</div>";
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else if (role == "patient-admin" || role == "hospital-admin") {
    let appointmentList = [];
    let appointmentThisWeekList = [];
    firebase
      .firestore()
      .collection("appointment")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let patient = { ...doc.data(), id: doc.id };
          appointmentList.push(patient);
        });
      })
      .then(() => {
        console.log(appointmentList);
        appointmentList.forEach((element) => {
          if (
            moment(element.startDate) > moment().startOf("week").toDate() &&
            moment(element.startDate) < moment().endOf("week").toDate()
          ) {
            appointmentThisWeekList.push(element);
          }
        });
        console.log(appointmentThisWeekList);
      })
      .then(() => {
        let tableWrapper = document.createElement("div");
        tableWrapper.classList.add("table-responsive");
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-sm");
        let tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                </tr>
        `;
        table.appendChild(tableHeader);
        let tableBody = document.createElement("tbody");
        appointmentThisWeekList.forEach((element) => {
          tableBody.innerHTML += `
                <tr class="cursor-pointer" id="${element.id}">
                  <td>${moment(element.startDate).format(
                    "DD-MM-YYYY h:mm A"
                  )}</td>
                  <td>${element.name}</td>
                  <td>${element.scheduleType}</td>
                  <td>${element.location}</td>
                </tr>
          `;
        });
        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        document.getElementById("mainContent").innerHTML = `
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <h1 class="h2">Appointment list</h1>
          </div>`;
        if (appointmentThisWeekList.length !== 0) {
          document.getElementById("mainContent").appendChild(tableWrapper);
          appointmentThisWeekList.forEach((element) => {
            document
              .getElementById(element.id)
              .addEventListener("click", (e) => {
                e.preventDefault();
                view.showDetailAppointment(element);
              });
          });
        } else {
          document.getElementById("mainContent").innerHTML +=
            "<div>There is no appointment this week</div>";
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
};

view.showDetailPatient = (element) => {
  document.getElementById("mainContent").innerHTML =
    components.detailPatientMainScreen;
  if (
    model.currentUser.role !== "patient-admin" ||
    model.currentUser.role !== "hospital-admin"
  ) {
    document.getElementById("deletePatientBtn").style.display = "none";
  }
  document.getElementById("deletePatientBtn").addEventListener("click", (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("patients")
      .doc(element.id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
        view.showPatientList();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  });
  document.getElementById("patient-name").value = element.name;
  document.getElementById("patient-gender").value = element.gender;
  document.getElementById("patient-dob").value = element.dob;
  document.getElementById("patient-pob").value = element.pob;
  document.getElementById("patient-occupation").value = element.occupation;
  document.getElementById("patient-email").value = element.email;
  document.getElementById("patient-phone").value = element.phone;
  document.getElementById("patientType").value = element.patientType;
  document.getElementById("bloodType").value = element.bloodType;
  document.getElementById("patient-referred-by").value = element.referredBy;
  document.getElementById("patient-referred-date").value = element.referredDate;
  document.getElementById("patient-religion").value = element.religion;
  document.getElementById("patient-parent-guardian").value =
    element.parentGuardian;
  document.getElementById("editPatientForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const patientToEdit = {
      name: document.getElementById("patient-name").value,
      gender: document.getElementById("patient-gender").value,
      dob: document.getElementById("patient-dob").value,
      pob: document.getElementById("patient-pob").value,
      occupation: document.getElementById("patient-occupation").value,
      email: document.getElementById("patient-email").value,
      phone: document.getElementById("patient-phone").value,
      patientType: document.getElementById("patientType").value,
      bloodType: document.getElementById("bloodType").value,
      referredBy: document.getElementById("patient-referred-by").value,
      referredDate: document.getElementById("patient-referred-date").value,
      religion: document.getElementById("patient-religion").value,
      parentGuardian: document.getElementById("patient-parent-guardian").value,
      timeCheckOut: document.getElementById("checkOutOption").checked
        ? new Date().toISOString()
        : "",
    };
    controller.editPatient({ ...patientToEdit, id: element.id });
  });
  document
    .getElementById("cancelEditPatientBtn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      view.showPatientList();
    });
};

view.showDetailAppointment = (appointment) => {
  document.getElementById("mainContent").innerHTML =
    components.detailAppointmentMainScreen;
  document.getElementById("doctor-in-charge").value =
    appointment.doctorInCharge.name;
  document.getElementById("patient-name-schedule").value = appointment.name;
  document.getElementById("start-date").value = appointment.startDate;
  document.getElementById("schedule-type").value = appointment.scheduleType;
  document.getElementById("disease").value = appointment.disease;
  document.getElementById("location").value = appointment.location;
  document.getElementById("note-appointment").value = appointment.note;
  document
    .getElementById("editAppointmentForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const appointmentToEdit = {
        name: document.getElementById("patient-name-schedule").value,
        startDate: document.getElementById("start-date").value,
        scheduleType: document.getElementById("schedule-type").value,
        disease: document.getElementById("disease").value,
        location: document.getElementById("location").value,
        note: document.getElementById("note-appointment").value,
      };
      controller.editAppointment({ ...appointmentToEdit, id: appointment.id });
    });
  document
    .getElementById("cancelEditAppointmentBtn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      view.showAppointmentListThisWeek(model.currentUser.role);
    });
};

view.showLabRequestList = () => {
  let labRequestList = [];
  firebase
    .firestore()
    .collection("labs")
    .where("status", "==", "created")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let req = { ...doc.data(), id: doc.id };
        labRequestList.push(req);
      });
    })
    .then(() => {
      let tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-responsive");
      let table = document.createElement("table");
      table.classList.add("table");
      table.classList.add("table-striped");
      table.classList.add("table-sm");
      let tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
              <tr>
                <th>Date requested</th>
                <th>Patient name</th>
                <th>Requested by</th>
                <th>Lab type</th>
                <th>Note</th>
              </tr>
      `;
      console.log(tableHeader);
      table.appendChild(tableHeader);
      let tableBody = document.createElement("tbody");
      labRequestList.forEach((element) => {
        tableBody.innerHTML += `
              <tr class="cursor-pointer" id="${element.id}">
                <td>${moment(element.dateRequested).format(
                  "DD-MM-YYYY h:mm A"
                )}</td>
                <td>${element.patient}</td>
                <td>${element.requestedBy}</td>
                <td>${element.type}</td>
                <td>${element.note}</td>
              </tr>
        `;
      });
      table.appendChild(tableBody);
      tableWrapper.appendChild(table);
      document.getElementById("mainContent").innerHTML = `<div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">Lab request list</h1>
      </div>`;
      if (labRequestList.length !== 0) {
        document.getElementById("mainContent").appendChild(tableWrapper);
        labRequestList.forEach((element) => {
          document.getElementById(element.id).addEventListener("click", (e) => {
            e.preventDefault();
            view.showDetailLabRequest(element);
          });
        });
      } else {
        document.getElementById("mainContent").innerHTML +=
          "<div>There is no lab request</div>";
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

view.showLabCompletedList = () => {
  let labCompletedList = [];
  firebase
    .firestore()
    .collection("labs")
    .where("status", "==", "completed")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let req = { ...doc.data(), id: doc.id };
        labCompletedList.push(req);
      });
    })
    .then(() => {
      let tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-responsive");
      let table = document.createElement("table");
      table.classList.add("table");
      table.classList.add("table-striped");
      table.classList.add("table-sm");
      let tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
              <tr>
                <th>Date requested</th>
                <th>Patient name</th>
                <th>Requested by</th>
                <th>Lab type</th>
                <th>Note</th>
              </tr>
      `;
      console.log(tableHeader);
      table.appendChild(tableHeader);
      let tableBody = document.createElement("tbody");
      labCompletedList.forEach((element) => {
        tableBody.innerHTML += `
              <tr class="cursor-pointer" id="${element.id}">
                <td>${moment(element.dateRequested).format(
                  "DD-MM-YYYY h:mm A"
                )}</td>
                <td>${element.patient}</td>
                <td>${element.requestedBy}</td>
                <td>${element.type}</td>
                <td>${element.note}</td>
              </tr>
        `;
      });
      table.appendChild(tableBody);
      tableWrapper.appendChild(table);
      document.getElementById("mainContent").innerHTML = `<div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">Lab completed list</h1>
    </div>`;
      if (labCompletedList.length !== 0) {
        document.getElementById("mainContent").appendChild(tableWrapper);
        labCompletedList.forEach((element) => {
          document.getElementById(element.id).addEventListener("click", (e) => {
            e.preventDefault();
            view.showDetailLabCompleted(element);
          });
        });
      } else {
        document.getElementById("mainContent").innerHTML +=
          "<div>There is no lab request completed</div>";
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

view.showDetailLabRequest = (req) => {
  document.getElementById("mainContent").innerHTML =
    components.detailLabRequestMainScreen;
  if (model.currentUser.role !== "lab-technician") {
    document.getElementById("status").disabled = true;
    document.getElementById("lab-upload-data-wrapper").disabled = true;
  }
  document.getElementById("patient-name-lab-request").value = req.patient;
  document.getElementById("lab-type-request").value = req.type;
  document.getElementById("note-lab").value = req.note;
  document.getElementById("lab-date-requested").value = moment(
    req.dateRequested
  ).format("DD-MM-YYYY h:mm A");
  document.getElementById("lab-requested-by").value = req.requestedBy;
  document.getElementById("status").value = req.status;
  let dataAfterConvertFile, dataFFt
  document
    .getElementById("lab-add-data-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const inputUploadFile = document.getElementById("lab-upload-data");
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result.split("-----------------------------");
        data[1] = data[1].replace(" \n", "").split("\n");
        data[1].pop(); //data[1] la array
        dataAfterConvertFile = data[1].map((e) => parseFloat(e));
        console.log(dataAfterConvertFile);
      };
      reader.readAsText(inputUploadFile.files[0])
    });
    document.getElementById('lab-upload-data-btn').addEventListener('click',(e)=> {
      e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ data: dataAfterConvertFile }),
          redirect: "follow",
        };
        fetch("http://localhost:3000/", requestOptions)
          .then((response) => {
            response.json().then(data => {
              dataFFt = data
              console.log('dataFFt = ', dataFFt)
            })
          })
          .catch((error) => console.log("error", error));
    })
  document
    .getElementById("editLabRequestBtn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const labRequest = {
        patient: document.getElementById("patient-name-lab-request").value,
        type: document.getElementById("lab-type-request").value,
        note: document.getElementById("note-lab").value,
        status: document.getElementById("status").value,
        data: {dataRaw: dataAfterConvertFile, dataFFT: dataFFt}
      };
      controller.editLabRequest({ ...labRequest, id: req.id });
    });
  document
    .getElementById("cancel-lab-request")
    .addEventListener("click", (e) => {
      e.preventDefault();
      view.showLabRequestList();
    });
  document.getElementById("deleteRequestBtn").addEventListener("click", (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("labs")
      .doc(req.id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
        view.showLabRequestList();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  });
};

view.showDetailLabCompleted = (req) => {
  document.getElementById("mainContent").innerHTML =
    components.detailLabCompletedMainScreen;
  console.log(req);
  document.getElementById("patient-name-lab-request").value = req.patient;
  document.getElementById("lab-type-request").value = req.type;
  document.getElementById("note-lab").value = req.note;
  document.getElementById("lab-date-requested").value = moment(
    req.dateRequested
  ).format("DD-MM-YYYY h:mm A");
  document.getElementById("lab-requested-by").value = req.requestedBy;
  document.getElementById("status").value = req.status;
  document
    .getElementById("editLabRequestBtn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const labRequest = {
        patient: document.getElementById("patient-name-lab-request").value,
        type: document.getElementById("lab-type-request").value,
        note: document.getElementById("note-lab").value,
        status: document.getElementById("status").value,
      };
      controller.editLabRequest({ ...labRequest, id: req.id });
    });
  const graph1 = document.createElement("div");
  graph1.setAttribute("id", "graph1");
  graph1.style = "flex:1";
  Plotly.newPlot(graph1, [{ y: req.data.dataRaw }]);
  const graph2 = document.createElement("div");
  graph2.setAttribute("id", "graph2");
  graph2.style = "flex:1";
  Plotly.newPlot(graph2, [{ y: req.data.dataFFT }]);
  document.querySelector(".graph-wrapper").appendChild(graph1);
  document.querySelector(".graph-wrapper").appendChild(graph2);
  document
    .getElementById("cancel-lab-request")
    .addEventListener("click", (e) => {
      e.preventDefault();
      view.showLabRequestList();
    });
};

view.showTodayAppointment = (role) => {
  let appointmentList = [];
  let appointmentTodayList = [];
  if (role == "doctor" || role == "nurse") {
    firebase
      .firestore()
      .collection("appointment")
      .where("doctorInCharge", "==", model.currentUser.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let patient = { ...doc.data(), id: doc.id };
          appointmentList.push(patient);
        });
      })
      .then(() => {
        console.log(appointmentList);
        appointmentList.forEach((element) => {
          if (
            new Date(element.startDate).getDate() == new Date().getDate() &&
            new Date(element.startDate).getMonth() == new Date().getMonth() &&
            new Date(element.startDate).getFullYear() ==
              new Date().getFullYear()
          ) {
            appointmentTodayList.push(element);
          }
        });
        console.log(appointmentTodayList);
      })
      .then(() => {
        let tableWrapper = document.createElement("div");
        tableWrapper.classList.add("table-responsive");
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-sm");
        let tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
              </tr>
      `;
        console.log(tableHeader);
        table.appendChild(tableHeader);
        let tableBody = document.createElement("tbody");
        appointmentTodayList.forEach((element) => {
          tableBody.innerHTML += `
              <tr class="cursor-pointer" id="${element.id}">
                <td>${moment(element.startDate).format(
                  "DD-MM-YYYY h:mm A"
                )}</td>
                <td>${element.name}</td>
                <td>${element.scheduleType}</td>
                <td>${element.location}</td>
              </tr>
        `;
        });
        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        document.getElementById("mainContent").innerHTML = `<div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">Today's appointment list</h1>
    </div>`;
        if (appointmentTodayList.length == 0) {
          document.getElementById("mainContent").innerHTML +=
            "<div>You have no appointment today</div>";
        } else {
          document.getElementById("mainContent").appendChild(tableWrapper);
          appointmentThisWeekList.forEach((element) => {
            document
              .getElementById(element.id)
              .addEventListener("click", (e) => {
                e.preventDefault();
                view.showDetailAppointment(element);
              });
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else if (role == "hospital-admin" || role == "patient-admin") {
    firebase
      .firestore()
      .collection("appointment")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let patient = { ...doc.data(), id: doc.id };
          appointmentList.push(patient);
        });
      })
      .then(() => {
        console.log(appointmentList);
        appointmentList.forEach((element) => {
          if (
            new Date(element.startDate).getDate() == new Date().getDate() &&
            new Date(element.startDate).getMonth() == new Date().getMonth() &&
            new Date(element.startDate).getFullYear() ==
              new Date().getFullYear()
          ) {
            appointmentTodayList.push(element);
          }
        });
        console.log(appointmentTodayList);
      })
      .then(() => {
        let tableWrapper = document.createElement("div");
        tableWrapper.classList.add("table-responsive");
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-sm");
        let tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
              </tr>
      `;
        table.appendChild(tableHeader);
        let tableBody = document.createElement("tbody");
        appointmentTodayList.forEach((element) => {
          tableBody.innerHTML += `
              <tr class="cursor-pointer" id="${element.id}">
                <td>${moment(element.startDate).format(
                  "DD-MM-YYYY h:mm A"
                )}</td>
                <td>${element.name}</td>
                <td>${element.scheduleType}</td>
                <td>${element.location}</td>
              </tr>
        `;
        });
        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        document.getElementById("mainContent").innerHTML = `<div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1 class="h2">Today's appointment list</h1>
    </div>`;
        if (appointmentTodayList.length == 0) {
          document.getElementById("mainContent").innerHTML +=
            "<div>You have no appointment today</div>";
        } else {
          document.getElementById("mainContent").appendChild(tableWrapper);
          appointmentTodayList.forEach((element) => {
            document
              .getElementById(element.id)
              .addEventListener("click", (e) => {
                e.preventDefault();
                view.showDetailAppointment(element);
              });
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
};
