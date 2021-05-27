const model = {};
model.currentUser = undefined;
model.notification = { patient: [], appointment: [], lab: [] };
model.countNotification = 0;
model.register = (firstName, lastName, email, password, dob, gender, role) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      firebase.auth().signOut();
      firebase.auth().currentUser.sendEmailVerification();
      firebase.auth().currentUser.updateProfile({
        displayName: firstName + " " + lastName,
      });
      const user = {
        id: firebase.auth().currentUser.uid,
        email: email,
        role: role,
        dob: dob,
        name: firstName + " " + lastName,
        gender: gender,
      };
      firebase
        .firestore()
        .collection("users")
        .add(user)
        .then(() => alert("Register success, please verify your email!"));

      view.setActiveScreen("loginScreen");
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

model.login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      if (res.user.emailVerified) {
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", res.user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data());
              model.currentUser = doc.data();
            });
          })
          .then(() => {
            view.setActiveScreen("mainScreen");
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
};

model.addNewPatient = (patient) => {
  firebase
    .firestore()
    .collection("patients")
    .doc()
    .set(patient)
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Add new patient success!");
      view.hideModal();
      view.showPatientList();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.addNewAppointment = (appointment) => {
  firebase
    .firestore()
    .collection("appointment")
    .doc()
    .set(appointment)
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Add new appointment success!");
      view.hideModal();
      view.showAppointmentListThisWeek();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.editPatient = (patient) => {
  firebase
    .firestore()
    .collection("patients")
    .doc(patient.id)
    .set(patient, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Edit patient success!");
      view.showPatientList();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.editAppointment = (appointment) => {
  firebase
    .firestore()
    .collection("appointment")
    .doc(appointment.id)
    .set(appointment, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Edit appointment success!");
      view.showAppointmentListThisWeek();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.addNewLabRequest = (req) => {
  firebase
    .firestore()
    .collection("labs")
    .doc()
    .set({
      ...req,
      requestedBy: model.currentUser.role,
      dateRequested: new Date().toISOString(),
      status: "created",
      creator: model.currentUser.id,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Add new appointment success!");
      view.hideModal();
      view.showLabRequestList();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.editLabRequest = (req) => {
  firebase
    .firestore()
    .collection("labs")
    .doc(req.id)
    .set(req, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      alert("Edit appointment success!");
      view.showLabRequestList();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

model.listenPatientChange = () => {
  let isFirstRun = false;
  firebase
    .firestore()
    .collection("patients")
    .onSnapshot((res) => {
      if (!isFirstRun) {
        isFirstRun = true;
        return;
      }
      res.docChanges().forEach((element) => {
        model.notification.patient.push(element);
        model.countNotification++;
        view.notification();
      });
    });
};

model.listentAppointmentChange = () => {
  let isFirstRun = false;
  firebase
    .firestore()
    .collection("appointment")
    .where("doctorInCharge.id", "==", model.currentUser.id)
    .onSnapshot((res) => {
      if (!isFirstRun) {
        isFirstRun = true;
        return;
      }
      res.docChanges().forEach((element) => {
        model.notification.appointment.push(element);
        model.countNotification++;
        view.notification();
      });
    });
};

model.listentLabRequestChange = () => {
  let isFirstRun = false;
  firebase
    .firestore()
    .collection("labs")
    .onSnapshot((res) => {
      if (!isFirstRun) {
        isFirstRun = true;
        return;
      }
      res.docChanges().forEach((element) => {
        model.notification.lab.push(element);
        model.countNotification++;
        view.notification();
      });
    });
};
