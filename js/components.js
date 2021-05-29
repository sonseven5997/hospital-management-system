const components = {};

components.registerScreen = `
<div class="register-container">
      <div class="register-form">
          <div class="title">HospitalCare</div>
          <form action="" id="form-register">
              <div class="name-wrapper">
                  <div class="input-wrapper">
                      <input type="text" name="firstName" placeholder="First Name ...">
                      <div class="error" id="error-first-name"></div>
                  </div>
                  <div class="input-wrapper">
                      <input type="text" name="lastName" placeholder="Last Name ...">
                      <div class="error" id="error-last-name"></div>
              </div>
              </div>
              <div class="input-wrapper">
                  <input type="text" name="email" placeholder="Email ...">
                  <div class="error" id="error-email"></div>
              </div>
              <div class="input-wrapper">
                  <input type="password" name="password" placeholder="Password ...">
                  <div class="error" id="error-password"></div>
              </div>
              <div class="input-wrapper">
                  <input type="password" name="confirmPassword" placeholder="Confirm password ...">
                  <div class="error" id="error-confirm-password"></div>
              </div>
              <div class="input-wrapper">
                  <input type="date" name="dob">
                  <div class="error" id="error-dob"></div>
              </div>
              <div class="gender-role-wrapper">
                <div>
                    <div class="gender-wrapper">
                        <label for="gender">Gender: </label>
                        <select name="gender">
                        <option value="">--Choose a gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="error" id="error-gender"></div>
                </div>
                <div>
                    <div class="role-wrapper">
                        <label for="role">You are: </label>
                        <select name="role">
                        <option value="">--Select one--</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="hospital-admin">Hospital administrator</option>
                        <option value="patient-admin">Patient administrator</option>
                        <option value="lab-technician">Lab technician</option>
                        </select>
                    </div>
                    <div class="error" id="error-role"></div>
                </div>
              </div>
              <div class="submit-wrapper">
                  <div>Already have an account? <span class="cursor-pointer" id="redirect-to-login">Login</span></div>
                  <button type="submit" class="button">Register</button>
              </div>
          </form>
      </div>
`;

components.loginScreen = `
<div class="login-container">
            <div class="login-form">
                <div class="title">HospitalCare</div>
                <form action="" id="login-form">
                    <div class="input-wrapper">
                        <input type="text" name="email" placeholder="Email ...">
                        <div class="error" id="error-email"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" name="password" placeholder="Password ...">
                        <div class="error" id="error-password"></div>
                    </div>
                    <div class="submit-wrapper">
                        <div>Don't have an account? <span class="cursor-pointer" id="redirect-to-register">Register</span></div>
                        <button type="submit" class="button">Login</button>
                    </div>
                </form>
            </div>
        </div>
`;

components.clinicalMainScreen = `
<div  style="height:100vh">
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style="height:6vh">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 h-100 d-flex justify-content-center" style="
    font-size: 24px;
    line-height: 42px;">HospitalCare</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link cursor-pointer" id="signOutBtn">Sign out</a>
      </li>
    </ul>
  </header>

  <div class="container-fluid" style="height:94vh">
    <div class="row" style="height:94vh">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-flex bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="list-unstyled mb-0 py-3 pt-md-1">
            <li class="mb-1">
              <button type="button" class="btn btn-light" id="notification">
              Notifications <span class="badge bg-primary" id="notification-count"></span>
              </button>
            </li>
            <li class="mb-1" id="patient-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#patients-collapse" aria-expanded="true" aria-current="true">
                <span>Patients</span>
              </button>
      
              <div class="collapse" id="patients-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="patientList">Patient listing</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="addNewPatient" data-toggle="modal" data-target="#modal-add-patient">New patient</div></li>
                </ul>
              </div>
            </li>
            <li class="mb-1" id="schedule-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#schedule-collapse" aria-expanded="false" aria-current="true">
                <span>Scheduling</span>
              </button>
      
              <div class="collapse" id="schedule-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="appointment-list">Appointments this week</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="today-appointment">Today's appointment</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="addNewAppointment" data-toggle="modal" data-target="#modal-add-appointment">Add an appointment</div></li>
                </ul>
              </div>
            </li>
            <li class="mb-1" id="labs-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#labs-collapse" aria-expanded="false" aria-current="true">
                <span>Labs</span>
              </button>
      
              <div class="collapse" id="labs-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-list">Requests</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-completed">Completed</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="addNewLabRequest" data-toggle="modal" data-target="#modal-lab-request">New request</div></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="flex:1" id="mainContent">
      </main>
    </div>
  </div>
</div>
    <div class="modal p-3 border border-dark border-2" style="background-color: #ffffff; width:50%; margin-left:25%" id="modal-add-patient" aria-hidden="true">
      <div class=" modal-title display-4 fw-normal d-flex justify-content-center">New Patient</div>
      <form id="addNewPatientForm">
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
          <button type="submit" class="btn btn-primary mr-1" id="addNewPatientBtn">Add new patient</button>
          <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Cancel</button>
        </div>
      </form>
    </div>
    <div class="modal p-3 border border-dark border-2" style="background-color: #ffffff; width:50%; margin-left:25%" id="modal-add-appointment" aria-hidden="true">
  <div class=" modal-title display-4 fw-normal d-flex justify-content-center">New appointment</div>
  <form id="addNewAppointmentForm">
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
      <button type="submit" class="btn btn-primary mr-1" id="addNewAppointmentBtn">Create</button>
      <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Cancel</button>
    </div>
  </form>
  </div>
  <div class="modal p-3 border border-dark border-2" style="background-color: #ffffff; width:50%; margin-left:25%"
    id="modal-lab-request" aria-hidden="true">
    <div class=" modal-title display-4 fw-normal d-flex justify-content-center">New lab request</div>
    <form id="addLabRequestForm">
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
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mr-1" id="addNewLabRequestBtn">Create</button>
        <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Cancel</button>
      </div>
    </form>
  </div>
`

components.adminMainScreen= `
<div  style="height:100vh">
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style="height:6vh">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 h-100 d-flex justify-content-center" style="
    font-size: 24px;
    line-height: 42px;">HospitalCare</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link cursor-pointer" id="signOutBtn">Sign out</a>
      </li>
    </ul>
  </header>

  <div class="container-fluid" style="height:94vh">
    <div class="row" style="height:94vh">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-flex bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="list-unstyled mb-0 py-3 pt-md-1">
            <li class="mb-1">
              <button type="button" class="btn btn-light" id="notification">
              Notifications <span class="badge bg-primary" id="notification-count"></span>
              </button>
            </li>
            <li class="mb-1" id="patient-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#patients-collapse" aria-expanded="true" aria-current="true">
                <span>Patients</span>
              </button>
      
              <div class="collapse" id="patients-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="patientList">Patient listing</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="addNewPatient" data-toggle="modal" data-target="#modal-add-patient">New patient</div></li>
                </ul>
              </div>
            </li>
            <li class="mb-1" id="schedule-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#schedule-collapse" aria-expanded="false" aria-current="true">
                <span>Scheduling</span>
              </button>
      
              <div class="collapse" id="schedule-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="appointment-list">Appointments this week</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="today-appointment">Today's appointment</div></li>
                </ul>
              </div>
            </li>
            <li class="mb-1" id="labs-li">
              <button class="btn d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#labs-collapse" aria-expanded="false" aria-current="true">
                <span>Labs</span>
              </button>
      
              <div class="collapse" id="labs-collapse" style="">
                <ul class="list-unstyled fw-normal pb-1 small">
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-list">Requests</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-completed">Completed</div></li>
                    <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="addNewLabRequest" data-toggle="modal" data-target="#modal-lab-request">New request</div></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="flex:1" id="mainContent">
      </main>
    </div>
  </div>
</div>
    <div class="modal p-3 border border-dark border-2" style="background-color: #ffffff; width:50%; margin-left:25%" id="modal-add-patient" aria-hidden="true">
      <div class=" modal-title display-4 fw-normal d-flex justify-content-center">New Patient</div>
      <form id="addNewPatientForm">
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
          <button type="submit" class="btn btn-primary mr-1" id="addNewPatientBtn">Add new patient</button>
          <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Cancel</button>
        </div>
      </form>
    </div>
`

components.detailLabRequestMainScreen = `
<div class=" modal-title display-4 fw-normal d-flex justify-content-center">Lab request</div>
<form id="editLabRequestForm">
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
      <select class="form-control form-select-lg mb-3" aria-label="Floating label select example" id="status">
        <option value="created">Created</option>
        <option value="completed">Completed</option>
      </select>
      <div id="schedule-type-error" class="form-text error"></div>
    </div>
    <div class="mb-3">
      <label for="lab-date-requested" class="form-label">Date requested</label>
      <input type="text" class="form-control" id="lab-date-requested" disabled>
    </div>
    <div class="mb-3">
      <label for="lab-requested-by" class="form-label">Requested by</label>
      <input type="text" class="form-control" id="lab-requested-by" disabled>
    </div>
    <div class="mb-3" id="lab-upload-data-wrapper">
      <label for="lab-upload-data" class="form-label">Upload data</label>
      <div class="input-group">
        <input type="file" class="form-control pb-5" id="lab-upload-data" aria-describedby="inputGroupFileAddon04"
          aria-label="Upload">
        <button class="btn btn-outline-secondary" type="button"
          id="lab-add-data-btn">Add</button>
        <button class="btn btn-outline-secondary" type="button"
          id="lab-upload-data-btn">Upload</button> 
      </div>
      <div id="lab-note-error" class="form-text error"></div>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <button type="submit" class="btn btn-primary mr-1" id="editLabRequestBtn">Edit request</button>
    <button type="button" class="btn btn-danger mr-1" id="deleteRequestBtn">Delete</button>
    <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal"
      id="cancel-lab-request">Cancel</button>
  </div>
  </div>
</form>
`;

components.detailLabCompletedMainScreen = `
<div class=" modal-title display-4 fw-normal d-flex justify-content-center">Lab request detail</div>
  <form id="editLabRequestForm" style="flex:1">
    <div class="d-flex">
      <div class="flex-fill mr-3">
        <div class="mb-3">
          <label for="patient-name-lab-request" class="form-label">Patient</label>
          <input type="text" class="form-control" id="patient-name-lab-request" aria-describedby="name-error" disabled>
          <div id="patient-name-lab-request-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="lab-type-request" class="form-label">Lab type</label>
          <input type="text" class="form-control" id="lab-type-request" aria-describedby="name-error" disabled>
          <div id="lab-type-request-error" class="form-text error"></div>
        </div>
        <div class="mb-3">
          <label for="lab-note" class="form-label">Note</label>
          <input type="text" class="form-control" id="note-lab" aria-describedby="note-error" disabled>
          <div id="lab-note-error" class="form-text error"></div>
        </div>
        <div class="form-floating">
        <label for="status">Status</label>
        <select class="form-control form-select-lg mb-3" aria-label="Floating label select example"
          id="status" disabled>
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
        <div class="mb-3">
          <label class="form-label">Raw data graph</label>
          <div id="raw-data-graph"></div>
        </div>
        <div class="mb-3">
          <label class="form-label">FFT data graph</label>
          <div id="fft-data-graph"></div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-3">
      <button type="submit" class="btn btn-primary mr-1" id="editLabRequestBtn" style="display:none">Edit request</button>
      <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal" id="cancel-lab-request">Cancel</button>
    </div>
  </form>
  <div class="graph-wrapper" style="flex:1"></div>
`; 

components.detailAppointmentMainScreen = `
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

components.detailPatientMainScreen = ` 
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
      <div class="form-check mb-3 mt-5">
        <input class="form-check-input" type="checkbox" value="" id="checkOutOption">
        <label class="form-check-label" for="checkOutOption">
          Check out
        </label>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <button type="submit" class="btn btn-primary mr-1" id="editPatientBtn">Edit patient profile</button>
    <button type="button" class="btn btn-danger mr-1" id="deletePatientBtn">Delete</button>
    <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal" id="cancelEditPatientBtn">Cancel</button>
  </div>
</form>`;


components.supportMainScreen = `<div  style="height:100vh">
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style="height:6vh">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 h-100 d-flex justify-content-center" style="
    font-size: 24px;
    line-height: 42px;">HospitalCare</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link cursor-pointer" id="signOutBtn">Sign out</a>
      </li>
    </ul>
  </header>

  <div class="container-fluid" style="height:94vh">
    <div class="row" style="height:94vh">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-flex bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="list-unstyled mb-0 py-3 pt-md-1">
          <li class="mb-1">
              <button type="button" class="btn btn-light" id="notification">
              Notifications <span class="badge bg-primary" id="notification-count"></span>
              </button>
          </li>
          <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-list">Requests</div></li>
          <li><div class="d-inline-flex align-items-center rounded ml-4 mb-1 cursor-pointer" id="lab-request-completed">Completed</div></li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="flex:1" id="mainContent">
      </main>
    </div>
  </div>
</div>
`