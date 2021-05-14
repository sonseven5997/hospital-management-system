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
      switch (model.currentUser.role) {
        case "doctor" || "nurse":
          document.getElementById("app").innerHTML =
            components.clinicalMainScreen;
          view.showPatientList();
          document
            .getElementById("patientList")
            .addEventListener("click", (e) => {
              e.preventDefault();
              view.showPatientList();
            });
          const addNewPatientForm =
            document.getElementById("addNewPatientForm");
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
              doctorInCharge: model.currentUser.id,
            };
            controller.addNewAppointment(newAppointment);
          });
          document
            .getElementById("appointment-list")
            .addEventListener("click", (e) => {
              e.preventDefault();
              view.showAppointmentListThisWeek();
            });
          document
            .getElementById("today-appointment")
            .addEventListener("click", (e) => {
              e.preventDefault();
              view.showTodayAppointment();
            });
          const addNewLabRequest = document.getElementById("addLabRequestForm");
          addNewLabRequest.addEventListener("submit", (e) => {
            e.preventDefault();
            const newLabRequest = {
              patient: document.getElementById("patient-name-lab-request")
                .value,
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
          break;
        case "patient-admin" || "hospital-admin":
          break;
        case "lab-technician":
          break;
        default:
          break;
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
        console.log(element.id);
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

view.showAppointmentListThisWeek = () => {
  let appointmentList = [];
  let appointmentThisWeekList = [];
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
      document.getElementById("mainContent").appendChild(tableWrapper);
      appointmentThisWeekList.forEach((element) => {
        document.getElementById(element.id).addEventListener("click", (e) => {
          e.preventDefault();
          view.showDetailAppointment(element);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

view.showDetailPatient = (element) => {
  document.getElementById("mainContent").innerHTML = ` 
  <div class=" modal-title display-4 fw-normal d-flex justify-content-center">Patient profile</div>
  <form id="editPatientForm">
    <div class="d-flex">
      <div class="flex-fill mr-3">
        <div class="mb-3">
          <label for="patient-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="patient-name" aria-describedby="name-error">
          <div id="name-error" class="form-text error"></div>
        </div>
        <div class="form-floating">
          <label for="patient-gender">Patient gender</label>
          <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
            id="patient-gender">
            <option value="" selected></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div id="gender-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-dob" class="form-label">Date of birth</label>
          <input type="date" class="form-control" id="patient-dob" aria-describedby="dob-error">
          <div id="dob-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-pob" class="form-label">Place of birth</label>
          <input type="text" class="form-control" id="patient-pob" aria-describedby="pob-error">
          <div id="pob-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-occupation" class="form-label">Occupation</label>
          <input type="text" class="form-control" id="patient-occupation" aria-describedby="occupation-error">
          <div id="occupation-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-email" class="form-label">Email</label>
          <input type="text" class="form-control" id="patient-email" aria-describedby="email-error">
          <div id="email-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-phone" class="form-label">Phone</label>
          <input type="text" class="form-control" id="patient-phone" aria-describedby="phone-error">
          <div id="phone-error" class="form-text error"></div>
        </div>
      </div>
      <div class="flex-fill">
        <div class="form-floating">
          <label for="patientType">Patient type</label>
          <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
            id="patientType">
            <option value="" selected></option>
            <option value="charity">Charity</option>
            <option value="private">Private</option>
          </select>
          <div id="patientType-error" class="form-text error"></div>
        </div>
        <div class="form-floating">
          <label for="bloodType">Blood type</label>
          <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
            id="bloodType">
            <option value="" selected></option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <div id="bloodType-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-referred-by" class="form-label">Referred by</label>
          <input type="text" class="form-control" id="patient-referred-by" aria-describedby="referred-by-error">
          <div id="referred-by-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-referred-date" class="form-label">Referred date</label>
          <input type="date" class="form-control" id="patient-referred-date" aria-describedby="referred-date-error">
          <div id="referred-date-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-religion" class="form-label">Religion</label>
          <input type="text" class="form-control" id="patient-religion" aria-describedby="religion-error">
          <div id="religion-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="patient-parent-guardian" class="form-label">Parent/Guardian</label>
          <input type="text" class="form-control" id="patient-parent-guardian"
            aria-describedby="parent-guardian-error">
          <div id="parent-guardian-error" class="form-text error"></div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary mr-1" id="editPatientBtn">Edit patient profile</button>
      <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal" id="cancelEditPatientBtn">Cancel</button>
    </div>
  </form>`;
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
  document.getElementById("mainContent").innerHTML = `
  <div class=" modal-title display-4 fw-normal d-flex justify-content-center">Appointment detail</div>
  <form id="editAppointmentForm">
    <div class="d-flex">
      <div class="flex-fill mr-3">
        <div class="mb-3">
          <label for="patient-name-schedule" class="form-label">Name</label>
          <input type="text" class="form-control" id="patient-name-schedule" aria-describedby="name-error">
          <div id="name-schedule-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="start-time" class="form-label">Start time</label>
          <input type="datetime-local" class="form-control" id="start-date" aria-describedby="start-time-error">
          <div id="start-time-error" class="form-text error"></div>
        </div>
        <div class="form-floating">
          <label for="schedule-type">Type</label>
          <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
            id="schedule-type">
            <option value="" selected></option>
            <option value="admission">Admission</option>
            <option value="consultation">Consultation</option>
            <option value="imaging">Imaging</option>
            <option value="lab">Lab</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
          <div id="schedule-type-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="disease" class="form-label">Disease</label>
          <input type="text" class="form-control" id="disease" aria-describedby="disease-error">
          <div id="disease-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" id="location" aria-describedby="location-error">
          <div id="location-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="note" class="form-label">Note</label>
          <input type="text" class="form-control" id="note-appointment" aria-describedby="note-error">
          <div id="note-error" class="form-text error"></div>
        </div>    
        <div class="mb-3">
          <label for="doctor-in-charge" class="form-label">Doctor in charge</label>
          <input type="text" class="form-control" id="doctor-in-charge" aria-describedby="note-error" disabled>
          <div id="doctor-in-charge-error" class="form-text error"></div>
        </div>   
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary mr-1" id="editAppointmentBtn">Edit appointment</button>
      <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal" id="cancelEditAppointmentBtn">Cancel</button>
    </div>
  </form>
  `;
  document.getElementById("doctor-in-charge").value = model.currentUser.name;
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
      view.showAppointmentListThisWeek();
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
      document.getElementById("mainContent").appendChild(tableWrapper);
      labRequestList.forEach((element) => {
        document.getElementById(element.id).addEventListener("click", (e) => {
          e.preventDefault();
          view.showDetailLabRequest(element);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

view.showDetailLabRequest = (req) => {
  document.getElementById("mainContent").innerHTML = `
  <div class=" modal-title display-4 fw-normal d-flex justify-content-center">Lab request</div>
    <form id="editLabRequestForm">
      <div class="d-flex">
        <div class="flex-fill mr-3">
          <div class="mb-3">
            <label for="patient-name-lab-request" class="form-label">Patient</label>
            <input type="text" class="form-control" id="patient-name-lab-request" aria-describedby="name-error">
            <div id="patient-name-lab-request-error" class="form-text error"></div>
          </div>
          <div class="mb-3">
            <label for="lab-type-request" class="form-label">Lab type</label>
            <input type="text" class="form-control" id="lab-type-request" aria-describedby="name-error">
            <div id="lab-type-request-error" class="form-text error"></div>
          </div>
          <div class="mb-3">
            <label for="lab-note" class="form-label">Note</label>
            <input type="text" class="form-control" id="note-lab" aria-describedby="note-error">
            <div id="lab-note-error" class="form-text error"></div>
          </div>
          <div class="form-floating">
          <label for="status">Status</label>
          <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
            id="status">
            <option value="created">Created</option>
            <option value="completed">Completed</option>
          </select>
          <div id="schedule-type-error" class="form-text error"></div>
        </div>
          <div class="mb-3">
            <label for="lab-date-requested" class="form-label">Date requested</label>
            <input type="text" class="form-control" id="lab-date-requested"disabled>
          </div>
          <div class="mb-3">
            <label for="lab-requested-by" class="form-label">Requested by</label>
            <input type="text" class="form-control" id="lab-requested-by"disabled>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mr-1" id="editLabRequestBtn">Edit request</button>
        <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal" id="cancel-lab-request">Cancel</button>
      </div>
    </form>
  `;
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
  document
    .getElementById("cancel-lab-request")
    .addEventListener("click", (e) => {
      e.preventDefault();
      view.showLabRequestList();
    });
};

view.showTodayAppointment = () => {
  let appointmentList = [];
  let appointmentTodayList = [];
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
          new Date(element.startDate).getFullYear() == new Date().getFullYear()
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
          document.getElementById(element.id).addEventListener("click", (e) => {
            e.preventDefault();
            view.showDetailAppointment(element);
          });
        });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
