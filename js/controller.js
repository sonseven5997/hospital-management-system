const controller = {};

controller.register = (registerInfo) => {
  if (registerInfo.firstName === "") {
    view.setErrorMessage("error-first-name", "Please input first name");
  } else {
    view.setErrorMessage("error-first-name", "");
  }
  if (registerInfo.lastName === "") {
    view.setErrorMessage("error-last-name", "Please input last name");
  } else {
    view.setErrorMessage("error-last-name", "");
  }
  if (registerInfo.email === "") {
    view.setErrorMessage(
      "error-email",
      "Your email is not validated. Please try again."
    );
  } else {
    view.setErrorMessage("error-email", "");
  }
  if (registerInfo.gender === "") {
    view.setErrorMessage("error-gender", "Please choose a gender");
  } else {
    view.setErrorMessage("error-email", "");
  }
  if (registerInfo.dob === "") {
    view.setErrorMessage("error-dob", "Please input your date of birth");
  } else {
    view.setErrorMessage("error-dob", "");
  }
  if (registerInfo.role === "") {
    view.setErrorMessage("error-role", "Please choose one");
  } else {
    view.setErrorMessage("error-role", "");
  }
  if (registerInfo.password === "") {
    view.setErrorMessage(
      "error-password",
      "Your password is not validated. Please try again."
    );
    view.setErrorMessage(
      "error-confirm-password",
      "Your password is not validated. Please try again."
    );
    return;
  } else {
    view.setErrorMessage("error-password", "");
    view.setErrorMessage("error-confirm-password", "");
  }
  if (registerInfo.confirmPassword !== registerInfo.password) {
    view.setErrorMessage("error-confirm-password", "Confirm password wrong.");
    return;
  } else {
    view.setErrorMessage("error-confirm-password", "");
  }
  if (
    registerInfo.firstName !== "" &&
    registerInfo.lastName !== "" &&
    registerInfo.email !== "" &&
    registerInfo.password !== "" &&
    registerInfo.dob !== "" &&
    registerInfo.gender !== "" &&
    registerInfo.role !== ""
  ) {
    model.register(
      registerInfo.firstName,
      registerInfo.lastName,
      registerInfo.email,
      registerInfo.password,
      registerInfo.dob,
      registerInfo.gender,
      registerInfo.role
    );
  }
};

controller.login = ({ email, password }) => {
  if (email === "") {
    view.setErrorMessage("error-email", "Please input email");
  } else {
    view.setErrorMessage("error-email", "");
  }
  if (password === "") {
    view.setErrorMessage("error-password", "Please input password");
  } else {
    view.setErrorMessage("error-password", "");
  }
  if (email !== "" && password !== "") {
    model.login(email, password);
  }
};

controller.addNewPatient = (patient) => {
  patient.name == ""
    ? view.setErrorMessage("name-error", "Please input name")
    : view.setErrorMessage("name-error", "");
  patient.gender == ""
    ? view.setErrorMessage("gender-error", "Please choose gender")
    : view.setErrorMessage("gender-error", "");
  patient.dob == ""
    ? view.setErrorMessage("dob-error", "Please choose date of birth")
    : view.setErrorMessage("dob-error", "");
  patient.email == ""
    ? view.setErrorMessage("email-error", "Please input email")
    : view.setErrorMessage("email-error", "");
  patient.phone == ""
    ? view.setErrorMessage("phone-error", "Please input phone")
    : view.setErrorMessage("phone-error", "");
  if (
    patient.name !== "" &&
    patient.gender !== "" &&
    patient.dob !== "" &&
    patient.email !== "" &&
    patient.phone !== ""
  ) {
    model.addNewPatient(patient);
  }
};

controller.addNewAppointment = (appointment) => {
  appointment.name == ""
    ? view.setErrorMessage("name-schedule-error", "Please input name")
    : view.setErrorMessage("name-schedule-error", "");
  appointment.startDate == ""
    ? view.setErrorMessage("start-time-error", "Please input start date")
    : view.setErrorMessage("start-time-error", "");
  appointment.scheduleType == ""
    ? view.setErrorMessage("schedule-type-error", "Please input schedule type")
    : view.setErrorMessage("schedule-type-error", "");
  new Date(appointment.startDate).toISOString() < new Date().toISOString()
    ? view.setErrorMessage("start-time-error", "Date is invalid")
    : view.setErrorMessage("start-time-error", "");
  if (
    appointment.name !== "" &&
    appointment.startDate !== "" &&
    appointment.scheduleType !== "" &&
    new Date(appointment.startDate).toISOString() >= new Date().toISOString()
  ) {
    model.addNewAppointment(appointment);
  }
};

controller.editPatient = (patient) => {
  patient.name == ""
    ? view.setErrorMessage("name-error", "Please input name")
    : view.setErrorMessage("name-error", "");
  patient.gender == ""
    ? view.setErrorMessage("gender-error", "Please choose gender")
    : view.setErrorMessage("gender-error", "");
  patient.dob == ""
    ? view.setErrorMessage("dob-error", "Please choose date of birth")
    : view.setErrorMessage("dob-error", "");
  patient.email == ""
    ? view.setErrorMessage("email-error", "Please input email")
    : view.setErrorMessage("email-error", "");
  patient.phone == ""
    ? view.setErrorMessage("phone-error", "Please input phone")
    : view.setErrorMessage("phone-error", "");
  if (
    patient.name !== "" &&
    patient.gender !== "" &&
    patient.dob !== "" &&
    patient.email !== "" &&
    patient.phone !== ""
  ) {
    model.editPatient(patient);
  }
};

controller.editAppointment = (appointment) => {
  appointment.name == ""
    ? view.setErrorMessage("name-schedule-error", "Please input name")
    : view.setErrorMessage("name-schedule-error", "");
  appointment.startDate == ""
    ? view.setErrorMessage("start-time-error", "Please input start date")
    : view.setErrorMessage("start-time-error", "");
  appointment.scheduleType == ""
    ? view.setErrorMessage("schedule-type-error", "Please input schedule type")
    : view.setErrorMessage("schedule-type-error", "");
  if (
    appointment.name !== "" &&
    appointment.startDate !== "" &&
    appointment.scheduleType !== ""
  ) {
    model.editAppointment(appointment);
  }
};

controller.addNewLabRequest = (req) => {
  req.patient == ""
    ? view.setErrorMessage(
        "patient-name-lab-request-error",
        "Please input patient name"
      )
    : view.setErrorMessage("patient-name-lab-request-error", "");
  req.type == ""
    ? view.setErrorMessage("lab-type-request-error", "Please input lab type")
    : view.setErrorMessage("lab-type-request-error", "");
  if (req.patient !== "" && req.type !== "") {
    model.addNewLabRequest(req);
  }
};

controller.editLabRequest = (req) => {
  req.patient == ""
    ? view.setErrorMessage(
        "patient-name-lab-request-error",
        "Please input patient name"
      )
    : view.setErrorMessage("patient-name-lab-request-error", "");
  req.type == ""
    ? view.setErrorMessage("lab-type-request-error", "Please input lab type")
    : view.setErrorMessage("lab-type-request-error", "");
  if (req.patient !== "" && req.type !== "") {
    model.editLabRequest(req);
  }
};
